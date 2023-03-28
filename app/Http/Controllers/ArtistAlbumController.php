<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use App\Models\ArtistSong;
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
            'album_art' => 'required|image|mimes:jpg,jpeg,png,svg|max:2048',
            'album_artist_name' => 'required',
            'album_price' => 'required',
            'songs' => 'required|array|min:2',
            'songs.*.song_title' => 'nullable',
            'songs.*.song_lyric' => 'nullable',
            'songs.*.song_file' => 'nullable|mimes:mp3,wav,aac,flac,ogg,wma',
        ])->validate();

        $album = new ArtistAlbum([
            'album_title' => $request->album_title,
            'album_release_date' => $request->album_release_date,
            'album_artist_name' => $request->album_artist_name,
            'album_price' => $request->album_price,
            'album_user_id' => $request->user()->id,
        ]);

        if ($image = $request->file('album_art')) {
            $destinationPath = 'images/content/albums';
            $albumArtName = $album->album_title . "_COVER_" . $album->id . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $albumArtName);
            $album->album_art = "$albumArtName";
            $album->save();
        }

        foreach ($request->input('songs') as $index => $songData) {
            if (!empty($songData['song_title']) && !empty($songData['song_lyric'])) {
                $song = new ArtistSong([
                    'song_title' => $songData['song_title'],
                    'song_lyric' => $songData['song_lyric'],
                    'album_id' => $album->id,
                ]);

                $song->save();

                if ($request->hasFile("songs.{$index}.song_file") && $request->file("songs.{$index}.song_file")->isValid()) {
                    $songFile = $request->file("songs.{$index}.song_file");
                    $destinationPath = 'musics/' . $album->album_title;
                    $songName = $album->id . $song->id . '_' . $song->song_title . "." . $songFile->getClientOriginalExtension();
                    $songFile->move($destinationPath, $songName);
                    $song->song_file = $songName;
                    $song->save();
                }
            }
        }

        return redirect()->route('artistDashboard');
    }
}
