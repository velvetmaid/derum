<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'album_art' => 'required|mimes:jpeg,jpg,png',
            'album_artist_name' => 'required',
            'album_price' => 'required',
        ])->validate();

        $input = $request->all();

        if ($image = $request->file('album_art')) {
            $destinationPath = 'images/';
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $input['image'] = "$profileImage";
        }

        ArtistAlbum::create($input);

        return redirect()->route('artistDashboard');
    }
}
