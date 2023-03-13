import { useForm } from "@inertiajs/react";

const FormAddAlbum = () => {
    const { data, setData, post } = useForm({
        album_title: null,
        album_release_date: null,
        album_art: null,
        album_artist_name: null,
        album_price: null,
    });

    function submit(e) {
        e.preventDefault();
        post("store");
    }
    return (
        <form
            className="mt-8 space-y-3"
            name="createForm"
            onSubmit={submit}
            encType="multipart/form-data"
        >
            <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Album Title
                </label>
                <input
                    id="album_title"
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    name="album_title"
                    value={data.album_title}
                    placeholder="Your Album Title"
                    onChange={(e) => setData("album_title", e.target.value)}
                />
            </div>
            <div className="flex flex-col md:flex-row space-x-1 space-y-2">
                <div className="grid grid-cols-1 space-y-2 md:w-1/2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Release Date
                    </label>
                    <input
                        id="album_release_date"
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        type="date"
                        name="album_release_date"
                        value={data.album_release_date}
                        placeholder="Your Album Title"
                        onChange={(e) =>
                            setData("album_release_date", e.target.value)
                        }
                    />
                </div>
                <div className="grid grid-cols-1 space-y-2 md:w-2/3">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Album Art
                    </label>
                    <input
                        id="album_art"
                        className="relative text-base block flex-auto cursor-pointer rounded-lg border border-solid border-gray-200 bg-clip-padding px-3 font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:cursor-pointer file:overflow-hidden file:rounded-md file:border-0 file:border-solid file:border-inherit file:bg-turquoise file:px-3 file:py-2 file:text-blueNavy file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-green-300 focus:shadow-primary focus:outline-none"
                        type="file"
                        name="album_art"
                        value={undefined}
                        onChange={(e) =>
                            setData("album_art", e.target.files[0])
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Artist Name
                </label>
                <input
                    id="album_artist_name"
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type=""
                    name="album_artist_name"
                    value={data.album_artist_name}
                    placeholder="Your Artits Name"
                    onChange={(e) =>
                        setData("album_artist_name", e.target.value)
                    }
                />
            </div>

            <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Price
                </label>
                <div className="flex border rounded-lg">
                    <p className="self-center pl-2 text-gray-500">Rp.</p>
                    <input
                        id="album_price"
                        className="text-base w-full p-2 border-0 border-gray-300 rounded-lg focus:outline-none focus:shadow-none"
                        type="number"
                        name="album_price"
                        value={data.album_price}
                        placeholder="enter zero or more (e.g., 0, 10000"
                        onChange={(e) => setData("album_price", e.target.value)}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="my-5 w-full flex justify-center bg-turquoise text-blueNavy p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-[#00b896] shadow-lg cursor-pointer transition ease-in duration-200"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default FormAddAlbum;
