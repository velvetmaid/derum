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
    protected $fillable = [
        'album_id',
        'song_title',
        'song_lyric',
        'song_file',
    ];
    public function artist_album(): BelongsTo
    {
        return $this->belongsTo(ArtistAlbum::class);
    }
}
