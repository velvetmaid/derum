import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import AudioPlayr from "./AudioInfoPlayer";

export default function AlbumInfo({ posts }) {
    return (
        <Layout>
            <Head title={posts.album_title} />
            <div className="flex mx-auto md:p-12 p-6 bg-white dark:bg-blueNavy-dark rounded-xl">
                <div className="w-full space-y-6">
                    <div className="max-w-full flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6">
                        <div className="w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={"/images/albums/main/" + posts.album_art}
                                alt={posts.album_title}
                            />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center bg-rose-400">
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
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6">
                        <div className="w-full bg-blue-500">
                            <AudioPlayr songs={posts} />
                        </div>
                        <div className="w-full bg-red-500">blue</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
