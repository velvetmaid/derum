import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import Layout from "@/Layouts/Layout";
import Modal from "@/Components/Modal";
import FormFeedback from "./Resources/FormFeedback";
import PreviewAll from "./PreviewAll";
import "@/../css/main.css";

export default function EditAlbum(props) {
    const [showModal, setShowModal] = useState(false);
    const [lastIndex, setLastIndex] = useState(0);

    const {
        data,
        setData,
        errors,
        progress,
        delete: destroy,
    } = useForm({
        album_title: props.posts.album_title || "",
        album_release_date: props.posts.album_release_date || "",
        album_art: props.posts.album_art || null,
        album_artist_name: props.auth.user.name,
        album_price: props.posts.album_price || "",
        album_user_id: props.auth.user.id,

        songs: props.posts.artist_song.map((song) => {
            return {
                id: song.id,
                album_id: song.album_id,
                song_title: song.song_title || "",
                song_lyric: song.song_lyric || "",
                song_file: song.song_file || null,
            };
        }),
    });
    console.log("input", data);

    const handleAddSong = () => {
        setData((prevData) => {
            const newSong = {
                song_title: "",
                song_lyric: "",
                song_file: null,
            };
            const songs = [...prevData.songs, newSong];
            return { ...prevData, songs };
        });
        setLastIndex((prevIndex) => prevIndex + data.songs.length) + 1;
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setData({ ...data, album_art: file });
    };

    const handleSubmitSong = () => {
        const lastSong = data.songs[data.songs.length - 1];
        if (!lastSong.song_title || !lastSong.song_file) {
            toast.error(
                "Make sure the title and file are inputted according to the format",
                {
                    position: toast.POSITION.TOP_LEFT,
                    className: "w-5/6 md:w-full dark:bg-gray-800",
                }
            );
            return;
        }
        const newLastIndex = lastIndex + 1;
        setData((prevState) => ({
            ...prevState,
            songs: [...prevState.songs.slice(0, newLastIndex)],
        }));
        setLastIndex(newLastIndex);
        setShowModal(false);
    };

    const handleCancelAddSong = () => {
        const newData = { ...data };
        newData.songs.pop();
        setData(newData);
        setShowModal(false);
    };

    function submit(e) {
        e.preventDefault();

        router.post(
            `update/${props.posts.id}`,

            {
                forceFormData: true,
                data,
                _method: "put",
            }
        );

        const hasErrors =
            !data.album_title ||
            !data.album_release_date ||
            !data.album_art ||
            data.songs.length < 1 ||
            data.songs.some(
                (song) =>
                    (!song.song_file && song.song_file !== null) ||
                    (song.song_file &&
                        song.song_file.name &&
                        !song.song_file.name.match(
                            /\.(mp3|wav|flac|acc|ogg|wma)$/i
                        )) ||
                    !song.song_title
            );

        if (hasErrors) {
            toast.error(
                "There must be something wrong, please recheck that pal!",
                {
                    position: toast.POSITION.TOP_LEFT,
                    className: "w-5/6 md:w-full dark:bg-gray-800",
                }
            );
            return;
        } else {
            toast.success("Form submitted successfully", {
                position: toast.POSITION.TOP_LEFT,
                className: "w-5/6 md:w-full dark:bg-gray-800",
            });
        }
    }

    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    };

    const handleConfirmDelete = async () => {
        await destroy(
            route("delete-album", {
                id: props.posts.id,
            })
        );
        handleCloseModalDelete();
        toast.success("You have successfully deleted the merch", {
            position: toast.POSITION.TOP_LEFT,
            className: "w-5/6 md:w-full dark:bg-gray-800",
        });
    };

    return (
        <>
            <Layout>
                <Head title={props.posts.album_title} />
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-blueNavy-dark rounded-3xl p-8 mb-5 flex flex-col md:flex-row overflow-hidden">
                            <PreviewAll
                                posts={props.posts}
                                data={data}
                                setData={setData}
                                setLastIndex={setLastIndex}
                            />
                            <div className="sm:max-w-lg w-full bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
                                <div className="text-center">
                                    <h2 className="mt-5 text-3xl font-bold">
                                        Upload Album
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-400">
                                        Lorem ipsum is placeholder text.
                                    </p>
                                </div>
                                <form
                                    className="mt-8 space-y-3"
                                    name="createForm"
                                    onSubmit={submit}
                                    encType="multipart/form-data"
                                >
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold tracking-wide">
                                            Album Title
                                        </label>
                                        <input
                                            id="album_title"
                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                            type="text"
                                            name="album_title"
                                            value={data.album_title}
                                            placeholder="Your Album Title"
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-1">
                                        <div className="grid grid-cols-1 space-y-2 md:w-1/2">
                                            <label className="text-sm font-bold tracking-wide">
                                                Release Date
                                            </label>
                                            <input
                                                id="album_release_date"
                                                className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                                type="date"
                                                name="album_release_date"
                                                value={data.album_release_date}
                                                placeholder="Your Album Title"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 space-y-2 md:w-2/3">
                                            <label className="text-sm font-bold tracking-wide">
                                                Album Art
                                            </label>
                                            <input
                                                id="album_art"
                                                className="relative text-base block flex-auto cursor-pointer rounded-lg border border-solid border-gray-100 dark:border-none bg-clip-padding px-3 font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:cursor-pointer file:overflow-hidden file:rounded-md file:border-0 file:border-solid file:border-inherit file:bg-turquoise dark:file:bg-white file:px-3 file:p-2 file:text-blueNavy file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-green-300 focus:shadow-primary focus:outline-none"
                                                type="file"
                                                name="album_art"
                                                accept=".jpg, .jpeg, .png, .svg"
                                                value={undefined}
                                                onChange={handleFileInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold tracking-wide">
                                            Artist Name
                                        </label>
                                        <input
                                            id="album_artist_name"
                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                            type="text"
                                            name="album_artist_name"
                                            value={data.album_artist_name}
                                            placeholder="Your Artits Name"
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            disabled
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold tracking-wide">
                                            Price
                                        </label>
                                        <div className="flex border-gray-500 border rounded-lg">
                                            <p className="self-center pl-2">
                                                Rp.
                                            </p>
                                            <input
                                                id="album_price"
                                                className="text-base w-full p-2 border-0 border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:shadow-none"
                                                type="number"
                                                name="album_price"
                                                value={data.album_price}
                                                placeholder="enter zero or more (e.g., 0, 10000"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowModalDelete(true)
                                            }
                                            className="relative inline-block px-4 font-medium group"
                                        >
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-[5px] translate-y-[5px] bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                            <span className="relative text-blueNavy group-hover:text-white">
                                                Delete Album
                                            </span>
                                        </button>
                                    </div>

                                    <Modal
                                        show={showModal}
                                        // onClose={}
                                    >
                                        {data.songs &&
                                            data.songs.map((song, index) => (
                                                <div
                                                    className="text-blueNavy dark:text-gray-100 sm:max-w-lg w-full px-9 md:px-0 py-20 bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto space-y-4"
                                                    key={index}
                                                    style={{
                                                        display:
                                                            index === lastIndex
                                                                ? "block"
                                                                : "none",
                                                    }}
                                                >
                                                    <div className="grid grid-cols-1 space-y-2">
                                                        <label className="text-sm font-bold tracking-wide">
                                                            Song Title
                                                        </label>
                                                        <input
                                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                                            type="text"
                                                            placeholder="Song Title"
                                                            name="song_title"
                                                            value={
                                                                song.song_title
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    (
                                                                        prevData
                                                                    ) => {
                                                                        const newSongs =
                                                                            [
                                                                                ...prevData.songs,
                                                                            ];
                                                                        newSongs[
                                                                            lastIndex
                                                                        ].song_title =
                                                                            e.target.value;
                                                                        return {
                                                                            ...prevData,
                                                                            songs: newSongs,
                                                                        };
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 space-y-2">
                                                        <label className="text-sm font-bold tracking-wide">
                                                            Song Lyric
                                                        </label>
                                                        <textarea
                                                            rows={2}
                                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                                            type="text"
                                                            placeholder="Write a lyric here..."
                                                            name="song_lyric"
                                                            value={
                                                                song.song_lyric
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    (
                                                                        prevState
                                                                    ) => ({
                                                                        ...prevState,
                                                                        songs: [
                                                                            ...prevState.songs.slice(
                                                                                0,
                                                                                index
                                                                            ),
                                                                            {
                                                                                ...prevState
                                                                                    .songs[
                                                                                    index
                                                                                ],
                                                                                song_lyric:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            },
                                                                            ...prevState.songs.slice(
                                                                                index +
                                                                                    1
                                                                            ),
                                                                        ],
                                                                    })
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 space-y-2">
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
                                                                            Drag
                                                                            and
                                                                            drop
                                                                        </span>
                                                                        files
                                                                        here
                                                                        <br />
                                                                        or
                                                                        <span className="text-blue-600 hover:underline">
                                                                            {
                                                                                " select a file "
                                                                            }
                                                                        </span>
                                                                        from
                                                                        your
                                                                        computer
                                                                    </p>
                                                                </div>
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    name="song_file"
                                                                    accept=".mp3, .wav, .aac, .flac, .ogg, .wma"
                                                                    value={
                                                                        undefined
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            (
                                                                                prevState
                                                                            ) => ({
                                                                                ...prevState,
                                                                                songs: [
                                                                                    ...prevState.songs.slice(
                                                                                        0,
                                                                                        index
                                                                                    ),
                                                                                    {
                                                                                        ...prevState
                                                                                            .songs[
                                                                                            index
                                                                                        ],
                                                                                        song_file:
                                                                                            e
                                                                                                .target
                                                                                                .files[0],
                                                                                    },
                                                                                    ...prevState.songs.slice(
                                                                                        index +
                                                                                            1
                                                                                    ),
                                                                                ],
                                                                            })
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm">
                                                        File type: mp3
                                                    </p>
                                                    <div className="flex space-x-4">
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleCancelAddSong
                                                            }
                                                            className="my-5 w-full flex justify-center bg-[#04ddb4] text-[#0d2758] p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-green-300 shadow-lg cursor-pointer transition ease-in duration-200"
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button
                                                            onClick={
                                                                handleSubmitSong
                                                            }
                                                            type="buttin"
                                                            className="my-5 w-full flex justify-center bg-[#04ddb4] text-[#0d2758] p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-green-300 shadow-lg cursor-pointer transition ease-in duration-200"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </Modal>

                                    <div>
                                        <FormFeedback
                                            errors={errors}
                                            progress={progress}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSong}
                                            className="my-5 w-full flex justify-center bg-turquoise hover:bg-green-300 dark:bg-white dark:hover:bg-gray-300 text-blueNavy p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition duration-200"
                                        >
                                            Add Songs
                                        </button>
                                        {data.songs.length > 0 && (
                                            <button
                                                type="submit"
                                                className="my-5 w-full flex justify-center bg-turquoise hover:bg-green-300 dark:bg-white dark:hover:bg-gray-300 text-blueNavy p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition duration-200"
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
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
                            Are you sure you want to delete this {data.album_title} album?
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
