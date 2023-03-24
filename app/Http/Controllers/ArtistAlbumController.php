<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ArtistAlbumController extends Controller
{
    public function index()
    {
        $posts = ArtistAlbum::all();
        // dd($posts);
        return Inertia::render('Welcome', ['posts' => $posts]);
    }

    public function artistIndex()
    {
        $posts = ArtistAlbum::where('album_user_id', Auth::id())->get();

        return Inertia::render('Menus/Artist/Dashboard', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('Menus/Artist/AddAlbum');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'album_title' => 'required',
            'album_release_date' => 'required',
            'album_art' => 'required|mimes:jpeg,jpg,png',
            'album_artist_name' => 'required',
            'album_price' => 'required',
        ])->validate();

        $albumArt = '';
        if ($image = $request->file('album_art')) {
            $destinationPath = 'images/content/albums';
            $albumArtName = date('YmdHis') . "." . $image->getClientOriginalName();
            $image->move($destinationPath, $albumArtName);
            $albumArt = "$albumArtName";
        }

        ArtistAlbum::create([
            'album_title' => $request->album_title,
            'album_release_date' => $request->album_release_date,
            'album_art' => $albumArt,
            'album_artist_name' => $request->album_artist_name,
            'album_price' => $request->album_price,
            'album_user_id' => $request->user()->id,
        ]);

        return redirect()->route('artistDashboard');
    }
}
