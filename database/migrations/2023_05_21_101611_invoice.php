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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_user_name');
            $table->string('invoice_product_name');
            $table->string('invoice_type_product');
            $table->string('invoice_qty');
            $table->string('invoice_price');
            $table->string('invoice_total_price');
            $table->foreignId('invoice_user_id')->constrained('users');
            $table->foreignId('invoice_product_id');
            $table->foreignId('invoice_order_id')->constrained('orders');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
