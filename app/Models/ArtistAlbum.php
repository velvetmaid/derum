<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtistAlbum extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_title',
        'album_release_date',
        'album_art',
        'album_artist_name',
        'album_price'
    ];
}
