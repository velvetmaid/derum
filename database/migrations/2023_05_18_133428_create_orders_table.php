<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_user_id');
            $table->unsignedBigInteger('order_product_id');
            $table->string('order_user_name');
            $table->string('order_product_name')->nullable();
            $table->text('order_product_image')->nullable();
            $table->string('order_type');
            $table->string('order_city')->nullable();
            $table->text('order_address')->nullable();
            $table->string('order_courier')->nullable();
            $table->string('order_courier_name')->nullable();
            $table->string('order_courier_cost')->nullable();
            $table->string('order_courier_description')->nullable();
            $table->string('order_etd')->nullable();
            $table->string('order_phone')->nullable();
            $table->string('order_qty');
            $table->bigInteger('order_price');
            $table->bigInteger('order_total_price');
            $table->enum('order_status', ['Unpaid', 'Paid', 'Expired'])->default('Unpaid');
            $table->string('snap_token')->nullable();
            $table->timestamps();

            $table->foreign('order_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
