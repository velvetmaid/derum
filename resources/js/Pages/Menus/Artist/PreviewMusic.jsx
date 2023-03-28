import { useState } from "react";

export default function PreviewMusic ({data, setData, setLastIndex}) {

    const [editingSongIndex, setEditingSongIndex] = useState(-1);
    const [editedSong, setEditedSong] = useState({});
    
        const handleEdit = (index, song) => {
            setEditingSongIndex(index);
            setEditedSong(song);
        };

        const handleSave = (index) => {
            const newData = { ...data };
            newData.songs[index] = editedSong;
            setData(newData);
            setEditingSongIndex(-1);
            setEditedSong({});
        };

        const handleRemove = (index) => {
            const newData = { ...data };
            newData.songs.splice(index, 1);
            setData(newData);
            setLastIndex((prev) => prev - 1);
        };
        
        const filteredSongs = data.songs.filter(
            (song) =>
            song.song_title.trim() !== "" ||
            song.song_lyric.trim() !== "" ||
            song.song_file !== null
            );
            
            return (
                <>
                {filteredSongs.map((song, index) => {
                    return (
                        <div key={index} className="border p-2">
                            <h3>Song {index + 1}</h3>
                            {editingSongIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Song Title"
                                        value={editedSong.song_title}
                                        onChange={(e) =>
                                            setEditedSong({
                                                ...editedSong,
                                                song_title: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <textarea
                                        placeholder="Song Lyric"
                                        value={editedSong.song_lyric}
                                        onChange={(e) =>
                                            setEditedSong({
                                                ...editedSong,
                                                song_lyric: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setEditedSong({
                                                ...editedSong,
                                                song_file: e.target.files[0],
                                            })
                                        }
                                    />
                                    <br />
                                    <button onClick={() => handleSave(index)}>
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p>Song Title: {song.song_title}</p>
                                    <p>Song Lyric: {song.song_lyric}</p>
                                    {song.song_file && (
                                        <audio
                                            src={URL.createObjectURL(
                                                song.song_file
                                                )}
                                            controls
                                        />
                                    )}
                                    <button
                                        onClick={() => handleEdit(index, song)}
                                        >
                                        Edit
                                    </button>
                                    <button onClick={() => handleRemove(index)}>
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </>
        );
    }