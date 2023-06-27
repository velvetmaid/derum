import Modal from "@/Components/Modal";
import { useEffect, useState } from "react";
import {
    PencilIcon,
    TrashIcon,
    PlayIcon,
    PauseIcon,
} from "@heroicons/react/solid";
import "@/../css/main.css";
import { toast } from "react-toastify";

export default function PreviewMusic({ data, setData, setLastIndex }) {
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
        audio.pause();
        setIsPlaying(false);
        setCurrentSongId(null);
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
        audio.pause();
        setIsPlaying(false);
        setCurrentSongId(null);
    };

    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    };

    const handleConfirmDelete = async () => {
        handleRemove();
        handleCloseModalDelete();
        toast.success("You have successfully deleted the song", {
            position: toast.POSITION.TOP_LEFT,
            className: "w-5/6 md:w-full dark:bg-gray-800",
        });
    };

    const filteredSongs = data.songs.filter(
        (song) => song.song_title.trim() !== "" || song.song_file !== null
    );

    const handlePlay = (song, index) => {
        if (typeof song.song_file === "string") {
            const soundUrl = "/musics/" + "/" + song.song_file;
            audio.pause();
            audio.src = soundUrl;
            audio.play();
        } else {
            const blob = new Blob([song.song_file], {
                type: song.song_file.type,
            });
            const soundUrl = URL.createObjectURL(blob);
            audio.pause();
            audio.src = soundUrl;
            audio.play();
        }
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
                    <div
                        key={index}
                        className="p-1 hover:translate-x-1 duration-200"
                    >
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
                                        {/* <label className="text-sm font-bold tracking-wide">
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
                                        /> */}
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
                                                    accept=".mp3, .wav, .aac, .flac, .ogg, .wma"
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
                                <div className="flex items-center justify-between rounded-lg shadow-md">
                                    {song.song_file && (
                                        <>
                                            <div className="relative m-4">
                                                <PlayIcon
                                                    className={`w-8 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPlayButtonClass(
                                                        index
                                                    )}`}
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        handlePlay(song, index);
                                                    }}
                                                />
                                                <PauseIcon
                                                    className={`w-8 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPauseButtonClass(
                                                        index
                                                    )}`}
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        handlePause();
                                                    }}
                                                />
                                            </div>
                                            <p className="text-xs mx-5">
                                                {song.song_title}
                                            </p>
                                        </>
                                    )}
                                    <div className="flex">
                                        <button
                                            onClick={() =>
                                                handleEdit(index, song)
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setShowModalDelete(true)
                                            }
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
            <Modal show={showModalDelete} onClose={handleCloseModalDelete}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        onClick={handleCloseModalDelete}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete ?
                        </h3>
                        <button
                            type="button"
                            onClick={handleConfirmDelete}
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseModalDelete}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
