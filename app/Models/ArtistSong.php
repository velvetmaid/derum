<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtistSong extends Model
{
    use HasFactory;

    public $table = "artist_song";
    public $timestamps = false;

    public function artist_albums(): BelongsTo
    {
        return $this->belongsTo(ArtistAlbum::class);
    }
}
