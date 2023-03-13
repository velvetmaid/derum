<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ArtistAlbumController extends Controller
{
    public function create()
    {
        return Inertia::render('Menus/Artist/AddAlbum');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'album_title' => 'required',
            'album_release_date' => 'required',
            'album_art' => 'required',
            'album_artist_name' => 'required',
            'album_price' => 'required',
        ])->validate();

        ArtistAlbum::create([
            'album_title' => $request->album_title,
            'album_release_date' => $request->album_release_date,
            'album_art' => $request->album_art,
            'album_artist_name' => $request->album_artist_name,
            'album_price' => $request->album_price,
        ]);
        return redirect()->route('artistDashboard');
    }
}
