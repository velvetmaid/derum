<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistAlbumController extends Controller
{
    public function create()
    {
        return Inertia::render('Menus/Artist/AddAlbum');
    }
}
