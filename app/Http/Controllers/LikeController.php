<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use App\Models\Merch;

class LikeController extends Controller
{
    public function likeAlbum($id)
    {
        $album = ArtistAlbum::findOrFail($id);
        $album->like();
        $album->save();
    }

    public function unlikeAlbum($id)
    {
        $album = ArtistAlbum::findOrFail($id);
        $album->unlike();
        $album->save();
    }

    public function likeMerch($id)
    {
        $merch = Merch::findOrFail($id);
        $merch->like();
        $merch->save();
    }

    public function unlikeMerch($id)
    {
        $merch = Merch::findOrFail($id);
        $merch->unlike();
        $merch->save();
    }
}
