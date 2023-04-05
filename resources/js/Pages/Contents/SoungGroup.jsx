import { useState } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/solid";

export default function SongGroup({ props }) {
    const [audio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongId, setCurrentSongId] = useState(null);

    const handlePlay = (song) => {
        const soundUrl =
            "musics/" + song.album_title + "/" + song.artist_song[0].song_file;
        audio.pause();
        audio.src = soundUrl;
        audio.play();
        setIsPlaying(true);
        setCurrentSongId(song.id);
    };

    const handlePause = () => {
        audio.pause();
        setIsPlaying(false);
        setCurrentSongId(null);
    };

    const getPlayButtonClass = (song) => {
        if (currentSongId === song.id) {
            return isPlaying
                ? "opacity-0 pointer-events-none"
                : "opacity-100 pointer-events-auto";
        } else {
            return "opacity-100 pointer-events-auto";
        }
    };

    const getPauseButtonClass = (song) => {
        if (currentSongId === song.id) {
            return isPlaying
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none";
        } else {
            return "opacity-0 pointer-events-none";
        }
    };

    return (
        <div className="flex flex-wrap mx-auto">
            {props.map((album) => (
                <div
                    className="flex-2 w-2/5 md:w-[25%] mx-auto px-0 md:px-2 my-6 flex flex-col"
                    key={album.id}
                >
                    <div className="relative inline-block group:">
                        <img
                            src={
                                "images/albums/thumbnails/thumb_" +
                                album.album_art
                            }
                            alt={album.album_title}
                        />
                        {album.artist_song.length > 0 && (
                            <div className="cursor-pointer absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-gray-100">
                                <PlayIcon
                                    className={`w-12 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPlayButtonClass(
                                        album
                                    )}`}
                                    onClick={() => handlePlay(album)}
                                />
                                <PauseIcon
                                    className={`w-12 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPauseButtonClass(
                                        album
                                    )}`}
                                    onClick={handlePause}
                                />
                            </div>
                        )}
                    </div>
                    <a className="truncate" href="/">{album.album_title}</a>
                    <a className="truncate text-gray-600" href="/">{album.album_artist_name}</a>
                </div>
            ))}
        </div>
    );
}
