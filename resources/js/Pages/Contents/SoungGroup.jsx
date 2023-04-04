export default function SongGroup({ props }) {
    return (
        <div className="flex mx-auto">
            {props.map((album) => (
                <div className="album" key={album.id}>
                    <h2>{album.album_title}</h2>
                    <p>{album.album_artist_name}</p>
                    <img
                        src={
                            "images/albums/thumbnails/thumb_" + album.album_art
                        }
                        alt={album.album_title}
                    />
                    <div className="song-list">
                        {album.artist_song.length > 0 && (
                            <div className="song" key={album.artist_song[0].id}>
                                <h3>{album.artist_song[0].song_title}</h3>
                                <p>{album.artist_song[0].song_lyric}</p>
                                <audio
                                    src={
                                        "musics/" +
                                        album.album_title +
                                        "/" +
                                        album.artist_song[0].song_file
                                    }
                                    controls
                                ></audio>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
