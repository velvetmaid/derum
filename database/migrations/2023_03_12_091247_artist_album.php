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
            $table->string('album_title');
            $table->timestamp('album_release_date')->nullable();
            $table->binary('album_art');
            $table->string('album_artist_name');
            $table->bigInteger('album_price');
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
