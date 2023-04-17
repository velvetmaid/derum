import { useEffect, useState } from "react";
import AudioPlayer from "react-modern-audio-player";

export default function AudioPlayr({ songs }) {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const playList = songs.artist_song.map((song, index) => ({
        name: song.song_title,
        writer: songs.album_artist_name,
        img: "/images/albums/thumbnails/thumb_" + songs.album_art,
        src: "/musics/" + songs.album_title + "/" + song.song_file,
        id: index + 1,
    }));

    return (
        <>
            {width <= 1028 ? (
                <AudioPlayer
                    playList={playList}
                    audioInitialState={{
                        volume: 0.1,
                        curPlayId: 1,
                    }}
                    activeUI={{
                        all: true,
                        progress: "bar",
                        artwork: false,
                        repeatType: false,
                        trackInfo: false,
                    }}
                    placement={{
                        volumeSlider: "right",
                        interface: {
                            templateArea: {
                                trackInfo: "row2-1",
                                trackTimeCurrent: "row1-1",
                                trackTimeDuration: "row1-3",
                                progress: "row1-2",
                                volume: "row2-1",
                                playButton: "row2-2",
                                playList: "row2-3",
                            },
                        },
                    }}
                />
            ) : (
                <AudioPlayer
                    playList={playList}
                    audioInitialState={{
                        volume: 0.1,
                        curPlayId: 1,
                    }}
                    activeUI={{
                        all: true,
                        progress: "bar",
                        artwork: true,
                        repeatType: false,
                        trackTime: false,
                    }}
                    placement={{
                        volumeSlider: "right",
                        interface: {
                            templateArea: {
                                trackInfo: "row2-3",
                                artwork: "row2-2",
                                trackTimeCurrent: "row3-5",
                                trackTimeDuration: "row3-5",
                                progress: "row1-1",
                                volume: "row2-4",
                                playButton: "row2-5",
                                playList: "row2-6",
                            },
                        },
                    }}
                />
            )}
        </>
    );
}
