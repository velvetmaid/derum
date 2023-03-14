<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArtistAlbum extends Model
{
    use HasFactory;

    public $table = "artist_album";
    public $timestamps = false;

    protected $fillable = [
        'album_title',
        'album_release_date',
        'album_art',
        'album_artist_name',
        'album_price',
    ];

    public function artist_songs(): HasMany
    {
        return $this->hasMany(ArtistSong::class);
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url('uploads/' . $value),
        );
    }
}
