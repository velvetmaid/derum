<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use App\Models\Invoice;
use App\Models\Merch;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function expireUnpaidOrders()
    {
        Order::where('created_at', '<=', Carbon::now()->subDays(1))
            ->where('order_status', 'Unpaid')
            ->whereNotIn('order_status', ['Paid', 'Expired'])
            ->update(['order_status' => 'Expired']);
    }
    public function index(Request $request)
    {
        $snapToken = $request->get('snapToken');

        $posts = Order::where('order_user_id', Auth::user()->id)->get();

        $this->expireUnpaidOrders();
        return Inertia::render('Menus/CheckoutPage',  [
            'order' => $posts, 'snapToken' => $snapToken
        ]);
    }
    public function checkout(Request $request)
    {
        $order = Order::create($request->all());

        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => $order->id . Str::uuid()->toString(),
                'gross_amount' => $order->order_total_price,
            ),
            'customer_details' => array(
                'order_name' => $order->order_user_name,
            ),
        );
        $snapToken = \Midtrans\Snap::getSnapToken($params);

        $order->snap_token = $snapToken;
        $order->save();

        $this->expireUnpaidOrders();
        return redirect()->route('checkout-page', [
            'order' => $order,
        ]);
    }

    public function callback(Request $request)
    {
        $serverKey = config('midtrans.server_key');
        $hashed = hash("sha512", $request->order_id . $request->status_code . $request->gross_amount . $serverKey);
        if ($hashed == $request->signature_key) {
            if ($request->transaction_status == 'capture') {
                $order = Order::find($request->order_id);
                $order->update(['order_status' => 'Paid']);
                $this->createInvoice($order);
            }
        }
    }

    public function createInvoice(Request $request)
    {
        $order = $request->all();

        $invoice = new Invoice();
        $invoiceId = Carbon::parse($order['created_at'])->addHours(7)->format('dmY') . $order['order_product_id'] . $order['id'];
        $invoice->id = $invoiceId;
        $invoice->invoice_user_id = $order['order_user_id'];
        $invoice->invoice_order_id = $order['id'];
        $invoice->invoice_product_id = $order['order_product_id'];
        $invoice->invoice_product_name = $order['order_product_name'];
        $invoice->invoice_type_product = $order['order_type'];
        $invoice->invoice_user_name = $order['order_user_name'];
        $invoice->invoice_qty = $order['order_qty'];
        $invoice->invoice_price = $order['order_price'];
        $invoice->invoice_total_price = $order['order_total_price'];
        $invoice->save();

        return redirect()->route('checkout-page');
    }

    public function invoiceIndex()
    {
        $merches = Merch::where('merch_user_id', Auth::id())->with('user')->get();
        $albums = ArtistAlbum::where('album_user_id', Auth::id())->with('artist_song')->get();
        $invoices = [];
        $totalPrice = 0;

        foreach ($albums as $album) {
            $invoice = Invoice::where('invoice_product_id', $album->id)->get()->toArray();
            if (!empty($invoice)) {
                foreach ($invoice as &$item) {
                    $item['created_at'] = Carbon::parse($item['created_at'])->addHours(7)->format('M j. g:i A');
                    $item['updated_at'] = Carbon::parse($item['updated_at'])->addHours(7)->format('M j. g:i A');
                }
                $invoices = array_merge($invoices, $invoice);
            }
        }
        foreach ($invoices as $invoice) {
            $totalPrice += $invoice['invoice_total_price'];
        }

        return Inertia::render('Menus/Invoice', [
            'merches' => $merches,
            'albums' => $albums,
            'invoices' => $invoices,
            'totalVolumePrice' => $totalPrice
        ]);
    }

    public function ongkir(Request $request)
    {

        $responseCost = Http::withHeaders([
            'key' => config('midtrans.rajaongkir_key')
        ])->post(
            'https://api.rajaongkir.com/starter/cost',
            [
                'origin' => $request->origin,
                'destination' => $request->destination,
                'weight' => $request->weight,
                'courier' => $request->courier,
            ]
        );

        $ongkir = $responseCost['rajaongkir']['results'];
        return response()->json(['ongkir' => $ongkir]);
    }
}
