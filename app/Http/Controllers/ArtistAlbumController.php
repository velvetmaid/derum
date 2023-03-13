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


        $eFile = request()->file('album_art');
        $fileName = $eFile->getClientOriginalName();
        $request->$eFile->move(public_path('uploads'), $fileName);

        ArtistAlbum::create([
            'album_title' => $request->album_title,
            'album_release_date' => $request->album_release_date,
            'album_art' => $fileName,
            'album_artist_name' => $request->album_artist_name,
            'album_price' => $request->album_price,
        ]);
        return redirect()->route('artistDashboard');
    }
}
