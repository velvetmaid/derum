import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function AlbumInfo({ posts }) {
    return (
        <Layout>
            <Head title={posts.album_title} />
            <div>
                <h1>{posts.album_title}</h1>
                <p>Artist: {posts.album_artist_name}</p>
                <p>Release Date: {posts.album_release_date}</p>
                <p>Price: {posts.album_price}</p>

                <ul>
                    {posts.artist_song.map((song) => (
                        <li key={song.id}>
                            <p>Song Title: {song.song_title}</p>
                            <p>Lyrics: {song.song_lyric}</p>
                            <p>File: {song.song_file}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}
