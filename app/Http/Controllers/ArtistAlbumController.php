<?php

namespace App\Http\Controllers;

use App\Models\ArtistAlbum;
use App\Models\ArtistSong;
use App\Models\Merch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use ZipArchive;

class ArtistAlbumController extends Controller
{
    /**
     * Display albums on the welcome page.
     */
    public function index()
    {
        $merches = Merch::all();
        $albums = ArtistAlbum::with('artist_song')->get();
        return Inertia::render('Welcome', ['merches' => $merches, 'albums' => $albums]);
    }

    /**
     * Retrieve and display albums created by the currently authenticated artist user.
     */
    public function artistDashbord()
    {
        $merches = Merch::where('merch_user_id', Auth::id())->with('user')->get();
        $total_songs = 0;
        $albums = ArtistAlbum::where('album_user_id', Auth::id())->with('artist_song')->get();

        foreach ($albums as $album) {
            $total_songs += count($album->artist_song);
        }

        return Inertia::render('Menus/Artist/Dashboard', ['merches' => $merches, 'albums' => $albums, 'songsCount' => $total_songs]);
    }

    /**
     * Retrieve and display information about a specific album.
     */
    public function albumInfoIndex($id)
    {
        $posts  = ArtistAlbum::with('artist_song')->find($id);
        return Inertia::render('Contents/AlbumInfo', [
            'posts' => $posts,
        ]);
    }

    /**
     * Search for albums and songs that match the given keyword.
     */
    public function search($key)
    {
        return ArtistAlbum::with('artist_song')
            ->where('album_title', 'like', "%$key%")
            ->orWhereHas('artist_song', function ($query) use ($key) {
                $query->where('song_title', 'like', "%$key%");
            })
            ->get();
    }

    /**
     * Display the page for adding a new artist album.
     */
    public function create()
    {
        return Inertia::render('Menus/Artist/AddAlbum');
    }

    /**
     * Store a newly created artist album.
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'album_title' => 'required:unique',
            'album_release_date' => 'required',
            'album_art' => 'required|image|mimes:jpg,jpeg,png,svg|max:2048',
            'album_artist_name' => 'required',
            'album_price' => 'nullable',
            'songs' => 'required|array|min:1',
            'songs.*.song_title' => 'required',
            'songs.*.song_lyric' => 'nullable',
            'songs.*.song_file' => 'nullable|mimes:mp3,wav,aac,flac,ogg,wma|max:1048576',
        ])->validate();

        $album = new ArtistAlbum([
            'album_title' => $request->album_title,
            'album_release_date' => $request->album_release_date,
            'album_artist_name' => $request->album_artist_name,
            'album_price' => $request->album_price,
            'album_user_id' => $request->user()->id,
        ]);

        if ($image = $request->file('album_art')) {
            $destinationPath = public_path('images/albums/thumbnails');
            $albumArtName =  $album->album_title . $album->id . "." . $image->getClientOriginalExtension();
            $img = Image::make($image->path());
            $img->fit(280, 280, function ($const) {
                $const->aspectRatio();
            })->save($destinationPath . '/thumb_' . $albumArtName, 90);

            $destinationPath = 'images/albums/main';
            $image->move($destinationPath, $albumArtName);
            $album->album_art = "$albumArtName";
            $album->save();
        }

        foreach ($request->input('songs') as $index => $songData) {
            $song = new ArtistSong([
                'song_title' => $songData['song_title'],
                'song_lyric' => $songData['song_lyric'],
                'album_id' => $album->id,
            ]);

            $song->save();

            if ($request->hasFile("songs.{$index}.song_file") && $request->file("songs.{$index}.song_file")->isValid()) {
                $songFile = $request->file("songs.{$index}.song_file");
                $destinationPath = 'musics/';
                $songName = $album->id . $song->id . '_' . $song->song_title . "." . $songFile->getClientOriginalExtension();
                $songFile->move($destinationPath, $songName);
                $song->song_file = $songName;
                $song->save();
            }
        }
        return redirect()->route('artist.dashboard');
    }

    /**
     * Display the edit form for a specific post.
     */
    public function edit($id)
    {
        $posts  = ArtistAlbum::with('artist_song')->find($id);

        if ($posts && $posts->album_user_id == Auth::id()) {
            return Inertia::render('Menus/Artist/EditAlbum', [
                'posts' => $posts,
            ]);
        } else {
            return redirect("https://http.cat/403");
        }
    }

    public function update(Request $request, $id)
    {
        Validator::make($request->all(), [
            'data.album_title' => 'required',
            'data.album_release_date' => 'required',
            'data.album_art' => 'nullable|max:2048',
            'data.album_artist_name' => 'required',
            'data.album_price' => 'nullable',
            'data.songs' => 'required|array|min:1',
            'data.songs.*.song_title' => 'required',
            'data.songs.*.song_lyric' => 'nullable',
            'data.songs.*.song_file' => 'nullable|max:1048576',
        ])->validate();

        $album = ArtistAlbum::findOrFail($id);
        $album->album_title = $request->input('data')['album_title'];
        $album->album_release_date = $request->input('data')['album_release_date'];
        $album->album_artist_name = $request->input('data')['album_artist_name'];
        $album->album_price = $request->input('data')['album_price'];
        $album->album_user_id = $request->input('data')['album_user_id'];

        if ($image = $request->file('data.album_art')) {
            if ($album->album_art) {
                $oldImage = public_path('images/albums/main/' . $album->album_art);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
                $oldThumb = public_path('images/albums/thumbnails/thumb_' . $album->album_art);
                if (file_exists($oldThumb)) {
                    unlink($oldThumb);
                }
            }
            $destinationPath = public_path('images/albums/thumbnails');
            $albumArtName =  $album->album_title . $album->id . "." . $image->getClientOriginalExtension();
            $img = Image::make($image->path());
            $img->fit(280, 280, function ($const) {
                $const->aspectRatio();
            })->save($destinationPath . '/thumb_' . $albumArtName, 90);

            $destinationPath = 'images/albums/main';
            $image->move($destinationPath, $albumArtName);
            $album->album_art = $albumArtName;
        }
        $album->save();

        $existingSongIds = $album->artist_song()->pluck('id')->toArray();
        foreach ($request->input('data.songs') as $index => $songData) {
            if (isset($songData['id'])) {
                $song = ArtistSong::findOrFail($songData['id']);
                $song->song_title = $songData['song_title'];
                $song->song_lyric = $songData['song_lyric'];
                $existingSongIds = array_diff($existingSongIds, [$songData['id']]);
            } else {
                $song = new ArtistSong([
                    'song_title' => $songData['song_title'],
                    'song_lyric' => $songData['song_lyric'],
                    'album_id' => $album->id,
                ]);
            }

            if ($request->hasFile("data.songs.{$index}.song_file") && $request->file("data.songs.{$index}.song_file")->isValid()) {
                if ($song->song_file) {
                    $oldSongFile = public_path('musics/' . '/' . $song->song_file);
                    if (file_exists($oldSongFile)) {
                        unlink($oldSongFile);
                    }
                }
                $songFile = $request->file("data.songs.{$index}.song_file");
                $destinationPath = 'musics/';
                $songName = $album->id . $song->id . '_' . $song->song_title . "." . $songFile->getClientOriginalExtension();
                $songFile->move($destinationPath, $songName);
                $song->song_file = $songName;
            }
            $song->save();
        }

        $deletedSongs = ArtistSong::whereIn('id', $existingSongIds)->get();
        foreach ($deletedSongs as $song) {
            $song->delete();
            $songFile = public_path('musics/' . $song->song_file);
            if (file_exists($songFile)) {
                unlink($songFile);
            }
        }
        return redirect()->route('artist.dashboard');
    }

    public function downloadAlbum($id)
    {
        $album = ArtistAlbum::findOrFail($id);
        $songs = $album->artist_song;

        $zip = new ZipArchive();
        $zipFileName = $album->album_title . '.zip';
        $zipFilePath = public_path('downloads/') . $zipFileName;

        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE === TRUE)) {
            $albumArtPath = public_path('images/albums/main/') . $album->album_art;
            $zip->addFile($albumArtPath, $album->album_art);

            foreach ($songs as $song) {
                $songPath = public_path('musics/') . $song->song_file;
                $zip->addFile($songPath, $song->song_title . '.mp3');
            }
            $zip->close();
        }
        return response()->download($zipFilePath)->deleteFileAfterSend(true);
    }
}
