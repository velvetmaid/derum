import { useState } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/solid";

export default function SongGroup({ props }) {
    const [audio] = useState(new Audio());

    const handlePlay = (song) => {
        const soundUrl =
            "musics/" + song.album_title + "/" + song.artist_song[0].song_file;
        audio.pause();
        audio.src = soundUrl;
        audio.play();
    };

    return (
        <div className="flex flex-wrap mx-auto">
            {props.map((album) => (
                <div className="flex-2 w-1/5 mx-auto" key={album.id}>
                    <div className="relative inline-block">
                        <img
                            src={
                                "images/albums/thumbnails/thumb_" +
                                album.album_art
                            }
                            alt={album.album_title}
                        />
                        {album.artist_song.length > 0 && (
                            <div className="absolute w-5 top-[50%] left-[50%]" key={album.artist_song[0].id}>
                                <PlayIcon onClick={() => handlePlay(album)} />
                                <PauseIcon onClick={() => audio.pause()} />
                            </div>
                        )}
                    </div>

                    <a>{album.album_title}</a>
                    <a>{album.album_artist_name}</a>
                </div>
            ))}
        </div>
    );
}
