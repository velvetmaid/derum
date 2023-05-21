<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
                'gross_amount' => $order->order_price,
            ),
            'customer_details' => array(
                'order_name' => $order->order_name,
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
}
