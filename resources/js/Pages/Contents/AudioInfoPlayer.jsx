import AudioPlayer from "react-modern-audio-player";

export default function AudioPlayr({ songs }) {
    const playList = songs.artist_song.map((song, index) => ({
        name: song.song_title,
        writer: song.song_title,
        img: "/images/albums/thumbnails/thumb_" + songs.album_art,
        src: "/musics/" + songs.album_title + "/" + song.song_file,
        id: index + 1,
    }));
    console.log(playList);

    return (
        <>
            <AudioPlayer
                className="max-w-full bg-white"
                playList={playList}
                activeUI={{
                    all: true,
                    progress: "bar",
                    artwork: false,
                    volume: "row1-7",
                    playList: true,
                }}
                placement={{
                    volumeSlider: "top",
                    interface: {
                        templateArea: {
                            trackTimeDuration: "row1-5",
                            progress: "row1-4",
                            playButton: "row1-6",
                            repeatType: "row1-7",
                            volume: "row1-8",
                        },
                    },
                }}
            ></AudioPlayer>
        </>
    );
}
