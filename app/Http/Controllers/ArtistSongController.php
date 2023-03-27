<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistSongController extends Controller
{
    public function create()
    {
        return Inertia::render('Menus/Artist/AddSong');
    }
}
