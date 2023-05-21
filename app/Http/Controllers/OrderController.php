<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $snapToken = $request->get('snapToken');

        $posts = Order::where('order_user_id', Auth::user()->id)->get();
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
                'order_id' => $order->id,
                'gross_amount' => $order->order_price,
            ),
            'customer_details' => array(
                'order_name' => $order->order_name,
            ),
        );
        $snapToken = \Midtrans\Snap::getSnapToken($params);

        $order->snap_token = $snapToken;
        $order->save();

        return redirect()->route('checkout-page', [
            'order' => $order,
        ]);
    }
}
