import Modal from "@/Components/Modal";
import { useEffect, useRef, useState } from "react";
import {
    PencilIcon,
    TrashIcon,
    PlayIcon,
    PauseIcon,
} from "@heroicons/react/solid";
import "@/../css/main.css";

export default function PreviewMusic({ data, setData, setLastIndex }) {
    console.log("this", data);
    const [editingSongIndex, setEditingSongIndex] = useState(-1);
    const [editedSong, setEditedSong] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [audio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongId, setCurrentSongId] = useState(null);

    const handleEdit = (index, song) => {
        setEditingSongIndex(index);
        setEditedSong(song);
        setShowModal(true);
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

    const handlePlay = (song, index) => {
        const blob = new Blob([song.song_file], { type: song.song_file.type });
        const soundUrl = URL.createObjectURL(blob);
        audio.pause();
        audio.src = soundUrl;
        audio.play();
        setIsPlaying(true);
        setCurrentSongId(index);
    };

    const handlePause = () => {
        audio.pause();
        setIsPlaying(false);
        setCurrentSongId(null);
    };

    const getPlayButtonClass = (index) => {
        if (currentSongId === index) {
            return isPlaying
                ? "opacity-0 pointer-events-none"
                : "opacity-100 pointer-events-auto";
        } else {
            return "opacity-100 pointer-events-auto";
        }
    };

    const getPauseButtonClass = (index) => {
        if (currentSongId === index) {
            return isPlaying
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none";
        } else {
            return "opacity-0 pointer-events-none";
        }
    };

    let handleBeforeUnload;

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            audio.pause();
        };
    }, []);

    return (
        <>
            {filteredSongs.map((song, index) => {
                return (
                    <div key={index} className="border p-2">
                        {editingSongIndex === index ? (
                            <Modal show={showModal}>
                                <div className="text-blueNavy dark:text-gray-100 sm:max-w-lg w-full px-9 md:px-0 py-20 bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
                                    <div className="grid grid-cols-1 space-y-4">
                                        <label className="text-sm font-bold tracking-wide">
                                            Song Title
                                        </label>
                                        <input
                                            type="text"
                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                            value={editedSong.song_title}
                                            onChange={(e) =>
                                                setEditedSong({
                                                    ...editedSong,
                                                    song_title: e.target.value,
                                                })
                                            }
                                        />
                                        <label className="text-sm font-bold tracking-wide">
                                            Lyric
                                        </label>
                                        <textarea
                                            rows={2}
                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                            type="text"
                                            value={editedSong.song_lyric}
                                            onChange={(e) =>
                                                setEditedSong({
                                                    ...editedSong,
                                                    song_lyric: e.target.value,
                                                })
                                            }
                                        />
                                        <label className="text-sm font-bold tracking-wide">
                                            Attach the song file
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col rounded-lg border-4 border-dashed border-gray-400 dark:border-gray-600 w-full h-20 p-10 group text-center cursor-pointer">
                                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    <p className="pointer-none">
                                                        <span className="text-sm">
                                                            Drag and drop
                                                        </span>
                                                        files here
                                                        <br />
                                                        or
                                                        <span className="text-blue-600 hover:underline">
                                                            {" select a file "}
                                                        </span>
                                                        from your computer
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    onChange={(e) =>
                                                        setEditedSong({
                                                            ...editedSong,
                                                            song_file:
                                                                e.target
                                                                    .files[0],
                                                        })
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <p className="text-sm">
                                        Your uploaded file :
                                        {editedSong.song_file.name}
                                    </p>
                                    <button
                                        className="my-5 w-full flex justify-center bg-[#04ddb4] text-[#0d2758] p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-green-300 shadow-lg cursor-pointer transition ease-in duration-200"
                                        onClick={() => handleSave(index)}
                                    >
                                        Done
                                    </button>
                                </div>
                            </Modal>
                        ) : (
                            <>
                                <p className="text-xs mx-5 -mb-4">
                                    {song.song_title}
                                </p>
                                <div className="flex items-center justify-between rounded-lg shadow-xl">
                                    {song.song_file && (
                                        <div className="relative">
                                            <PlayIcon
                                                className={`z-50 w-16 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPlayButtonClass(
                                                    index
                                                )}`}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    handlePlay(song, index);
                                                }}
                                            />
                                            <PauseIcon
                                                className={`z-50 w-16 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPauseButtonClass(
                                                    index
                                                )}`}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    handlePause();
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleEdit(index, song)
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleRemove(index)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}
