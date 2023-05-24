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
        Schema::create('merches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merch_user_id');
            $table->string('merch_title');
            $table->text('merch_image');
            $table->string('merch_category');
            $table->string('merch_weight');
            $table->string('merch_origin');
            $table->text('merch_description')->nullable();
            $table->bigInteger('merch_price');
            $table->boolean('merch_exists')->default(true);

            $table->foreign('merch_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merches');
    }
};
