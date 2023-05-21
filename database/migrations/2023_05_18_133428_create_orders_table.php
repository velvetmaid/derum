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
            $table->string('order_name');
            $table->string('order_product_name')->nullable();
            $table->text('order_product_image')->nullable();
            $table->string('order_type');
            $table->text('order_address')->nullable();
            $table->string('order_phone')->nullable();
            $table->string('order_qty')->nullable();
            $table->bigInteger('order_price');
            $table->bigInteger('order_total_price')->nullable();
            $table->enum('order_status', ['Unpaid', 'Paid', 'Expired'])->default('Unpaid');
            $table->string('snap_token')->nullable();
            $table->timestamps();

            $table->foreignId('order_user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('order_product_id')->constrained('artist_album')->onDelete('cascade');
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
