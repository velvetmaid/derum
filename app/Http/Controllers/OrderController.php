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
        $order = Order::create([
            'order_user_id' => $request->order_user_id,
            'order_product_id' => $request->order_product_id,
            'order_user_name' => $request->order_user_name,
            'order_product_name' => $request->order_product_name,
            'order_product_image' => $request->order_product_image,
            'order_type' => $request->order_type,
            'order_city' => $request->order_city,
            'order_address' => $request->order_address,
            'order_courier' => $request->courier,
            'order_courier_name' => $request->name,
            'order_courier_description' => $request->description,
            'order_courier_cost' => $request->cost,
            'order_etd' => $request->etd,
            'order_qty' => $request->order_qty,
            'order_price' => $request->order_price,
            'order_total_price' => $request->order_total_price,
        ]);

        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => $order->id,
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
        $reqInv = $request->all();

        $invoice = new Invoice();
        $invoiceId = Carbon::parse($reqInv['created_at'])->addHours(7)->format('dmY') . $reqInv['order_product_id'] . $reqInv['id'];
        $invoice->id = $invoiceId;
        $invoice->invoice_user_id = $reqInv['order_user_id'];
        $invoice->invoice_order_id = $reqInv['id'];
        $invoice->invoice_product_id = $reqInv['order_product_id'];
        $invoice->invoice_product_name = $reqInv['order_product_name'];
        $invoice->invoice_type_product = $reqInv['order_type'];
        $invoice->invoice_order_city = $reqInv['order_city'];
        $invoice->invoice_order_address = $reqInv['order_address'];
        $invoice->invoice_user_name = $reqInv['order_user_name'];
        $invoice->invoice_order_courier = $reqInv['order_courier'];
        $invoice->invoice_courier_name = $reqInv['order_courier_name'];
        $invoice->invoice_courier_cost = $reqInv['order_courier_cost'];
        $invoice->invoice_courier_description = $reqInv['order_courier_description'];
        $invoice->invoice_etd = $reqInv['order_etd'];
        $invoice->invoice_qty = $reqInv['order_qty'];
        $invoice->invoice_price = $reqInv['order_price'];
        $invoice->invoice_total_price = $reqInv['order_total_price'];
        $invoice->save();

        return redirect()->route('checkout-page');
    }

    public function invoiceIndex()
    {
        $merches = Merch::where('merch_user_id', Auth::id())->get();
        $albums = ArtistAlbum::where('album_user_id', Auth::id())->with('artist_song')->get();
        $productIds = $albums->pluck('id')->concat($merches->pluck('id'));

        $invoices = Invoice::whereIn('invoice_product_id', $productIds)->get();

        $totalPrice = $invoices->sum('invoice_total_price');

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

    public function destroyOrder($id)
    {
        $order = Order::findOrFail($id);

        $order->delete();
        return redirect()->back();
    }
}
