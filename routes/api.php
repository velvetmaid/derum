<?php

use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// php -S localhost:7000 -t derum/public
// ngrok http localhost:7000
// set your configuration midtrans on Payment Notification URL * add url ngrok * - https://NGROKURL/api/midtrans-callback
// credit card demo * 4811 1111 1111 1114 *
Route::post('midtrans-callback', [OrderController::class, 'callback']);
