<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ArtistAlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['id' => 1, 'name' => 'John', 'role' => 'artist',  'email' => 'john@example.com', 'password' => bcrypt('password')],
            ['id' => 2, 'name' => 'Sarah', 'role' => 'artist', 'email' => 'sarah@example.com', 'password' => bcrypt('password')],
            ['id' => 3, 'name' => 'Mike', 'role' => 'artist', 'email' => 'mike@example.com', 'password' => bcrypt('password')],
        ]);

        DB::table('artist_album')->insert([
            ['album_user_id' => 1, 'album_title' => 'Album 1', 'album_release_date' => '2021-01-01', 'album_art' => 'album1.jpg', 'album_artist_name' => 'John', 'album_price' => 10000],
            ['album_user_id' => 2, 'album_title' => 'Album 2', 'album_release_date' => '2021-02-01', 'album_art' => 'album2.jpg', 'album_artist_name' => 'Sarah', 'album_price' => 15000],
            ['album_user_id' => 3, 'album_title' => 'Album 3', 'album_release_date' => '2021-03-01', 'album_art' => 'album3.jpg', 'album_artist_name' => 'Mike', 'album_price' => 12000],
        ]);
    }
}
