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
        Schema::create('artist_album', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('album_user_id');
            $table->string('album_title');
            $table->string('album_release_date')->nullable();
            $table->string('album_art');
            $table->string('album_artist_name');
            $table->bigInteger('album_price')->nullable();

            $table->foreignId('album_user_id')->constrained('users')->onDelete('cascade');
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
