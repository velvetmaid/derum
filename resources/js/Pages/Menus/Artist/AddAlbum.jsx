import { Head, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts/Layout";
import "@/../css/main.css";

export default function AddAlbum(props) {
    const { data, setData, post, progress, errors } = useForm({
        album_title: "",
        album_release_date: "",
        album_art: null,
        album_artist_name: "",
        album_price: "",
        album_user_id: props.auth.user.id,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setData({ ...data, album_art: file });
    };

    function submit(e) {
        e.preventDefault();
        post("store");
    }
    // console.log(data);

    return (
        <>
            <Layout>
                <Head title={props.auth.user.name + " Dashboard"} />
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-blueNavy-dark rounded-3xl p-8 mb-5 flex flex-col md:flex-row overflow-hidden">
                            <div className="sm:max-w-lg w-full p-2 md:p-8 bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
                                <div className="flex w-full md:w-max h-[4rem] border-2 rounded-md mx-auto">
                                    <div className="relative w-[4rem] h-full p-1">
                                        <img
                                            className="object-cover w-[4rem] h-full z-50 rounded-md"
                                            src={
                                                data.album_art
                                                    ? URL.createObjectURL(
                                                          data.album_art
                                                      )
                                                    : null
                                            }
                                            alt={
                                                data.album_art
                                                    ? "Cover Art " +
                                                      data.album_title
                                                    : null
                                            }
                                        />
                                    </div>
                                    <div className="relative md:w-56 w-full over overflow-hidden">
                                        <p className="pl-1 text-xl">
                                            {data.album_title}
                                        </p>
                                        <span className="pl-1 absolute bottom-5 text-xs">
                                            by:
                                            {data.album_artist_name}
                                        </span>
                                        <span className="pl-1 text-xs absolute md:block bottom-1">
                                            Relase date:
                                            {data.album_release_date}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-center">
                                    Price: Rp.
                                    {data.album_price}
                                </p>
                            </div>
                            <div className="sm:max-w-lg w-full bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
                                <div className="text-center">
                                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
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
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row space-x-1 space-y-2">
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
                                                className="relative text-base block flex-auto cursor-pointer rounded-lg border border-solid border-gray-100 dark:border-none bg-clip-padding px-3 font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:cursor-pointer file:overflow-hidden file:rounded-md file:border-0 file:border-solid file:border-inherit file:bg-turquoise dark:file:bg-white file:px-3 file:py-2 file:text-blueNavy file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-green-300 focus:shadow-primary focus:outline-none"
                                                type="file"
                                                name="album_art"
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
                                            type=""
                                            name="album_artist_name"
                                            value={data.album_artist_name}
                                            placeholder="Your Artits Name"
                                            onChange={handleInputChange}
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

                                    <div>
                                        {progress && (
                                            <progress
                                                value={progress.percentage}
                                                max="100"
                                            >
                                                {progress.percentage}%
                                            </progress>
                                        )}
                                        {(errors.album_title && (
                                            <span className="text-rose-500 text-xs">
                                                Looks like you missed entering
                                                album title
                                            </span>
                                        )) ||
                                            (errors.album_release_date && (
                                                <span className="text-rose-500 text-xs">
                                                    Looks like you missed
                                                    entering release date
                                                </span>
                                            )) ||
                                            (errors.album_art && (
                                                <span className="text-rose-500 text-xs">
                                                    Looks like you missed
                                                    entering album art or enter
                                                    an image not up to 1 Mb
                                                </span>
                                            )) ||
                                            (errors.album_artist_name && (
                                                <span className="text-rose-500 text-xs">
                                                    Looks like you missed
                                                    entering artist name
                                                </span>
                                            )) ||
                                            (errors.album_price && (
                                                <span className="text-rose-500 text-xs">
                                                    Looks like you missed
                                                    entering price, make sure to
                                                    input with number
                                                </span>
                                            ))}
                                        <button
                                            type="submit"
                                            className="my-5 w-full flex justify-center bg-turquoise hover:bg-green-300 dark:bg-white dark:hover:bg-gray-300 text-blueNavy p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition duration-200"
                                        >
                                            Next To Add Songs
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
