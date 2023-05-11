import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { CloudDownloadIcon } from "@heroicons/react/outline";
import { CreditCardIcon, ViewGridIcon } from "@heroicons/react/solid";
import Layout from "@/Layouts/Layout";
import AudioPlayr from "./AudioInfoPlayer";
import Modal from "@/Components/Modal";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

export default function AlbumInfo({ posts }) {
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);

    const handleCloseModalLogin = () => {
        setShowModalLogin(false);
    };

    const handleCloseModalRegister = () => {
        setShowModalRegister(false);
    };

    const user = usePage().props.auth.user;
    return (
        <>
            <Layout>
                <Head title={posts.album_title} />
                <div className="flex mx-auto md:p-12 p-6 bg-white dark:bg-blueNavy-dark rounded-xl ">
                    <div className="w-full space-y-6">
                        <div className="max-w-full flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6 tracking-widest font-robotocondensed">
                            <div className="w-full aspect-square">
                                <img
                                    className="w-full h-full object-cover"
                                    src={
                                        "/images/albums/main/" + posts.album_art
                                    }
                                    alt={posts.album_title}
                                />
                            </div>
                            <div className="w-full hidden md:flex flex-col bg-gray-100 dark:bg-gray-900 rounded-md">
                                <div className="p-2 h-full flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-4xl">
                                            {posts.album_title}
                                        </h1>
                                        <span className="text-xl font-black">
                                            {posts.album_artist_name}
                                        </span>
                                        <p>
                                            Release Date:{" "}
                                            {posts.album_release_date}
                                        </p>
                                        <p>
                                            Price:{" "}
                                            {posts.album_price == null ||
                                            posts.album_price == "0"
                                                ? "Free"
                                                : posts.album_price}
                                        </p>
                                    </div>
                                    <div className="w-full text-center my-1">
                                        {user ? (
                                            <>
                                                {posts.album_user_id !=
                                                user.id ? (
                                                    <>
                                                        <button className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center">
                                                            <CreditCardIcon className="h-6 w-6" />
                                                            <span>Buy</span>
                                                        </button>
                                                        {posts.album_price ==
                                                            null ||
                                                        posts.album_price ==
                                                            "0" ? (
                                                            <>
                                                                <span>
                                                                    or download
                                                                    for free
                                                                </span>
                                                                <a
                                                                    href={`/download-album/${posts.id}`}
                                                                    className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                                >
                                                                    <CloudDownloadIcon className="h-6 w-6" />
                                                                    <span>
                                                                        Download
                                                                    </span>
                                                                </a>
                                                            </>
                                                        ) : null}
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={route(
                                                            "edit-album",
                                                            {
                                                                id: posts.id,
                                                            }
                                                        )}
                                                        className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                    >
                                                        <ViewGridIcon className="h-6 w-6" />
                                                        <span>Manage</span>
                                                    </Link>
                                                )}
                                            </>
                                        ) : (
                                            <div className="w-full text-center my-1">
                                                <span>
                                                    Please{" "}
                                                    <span
                                                        className="underline cursor-pointer"
                                                        onClick={() =>
                                                            setShowModalLogin(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        login
                                                    </span>{" "}
                                                    or{" "}
                                                    <span
                                                        className="underline cursor-pointer"
                                                        onClick={() =>
                                                            setShowModalRegister(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        sign up
                                                    </span>{" "}
                                                    to access this feature.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6">
                            <div className="w-full bg-blue-500">
                                <AudioPlayr songs={posts} />
                            </div>
                            <div className="w-full md:hidden flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-md">
                                <div className="p-2 h-full flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-4xl font-robotocondensed">
                                            {posts.album_title}
                                        </h1>
                                        <span className="text-md font-black tracking-widest font-sofiacondensed">
                                            By {posts.album_artist_name}
                                        </span>
                                        <p>
                                            Release Date:{" "}
                                            {posts.album_release_date}
                                        </p>
                                        <p>Price: {posts.album_price}</p>
                                    </div>
                                    <div className="w-full text-center my-1">
                                        {user ? (
                                            <>
                                                {posts.album_user_id !=
                                                user.id ? (
                                                    <>
                                                        <button className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center">
                                                            <CreditCardIcon className="h-6 w-6" />
                                                            <span>Buy</span>
                                                        </button>
                                                        {posts.album_price ==
                                                            null ||
                                                        posts.album_price ==
                                                            "0" ? (
                                                            <>
                                                                <span>
                                                                    or download
                                                                    for free
                                                                </span>
                                                                <a
                                                                    href={`/download-album/${posts.id}`}
                                                                    className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                                >
                                                                    <CloudDownloadIcon className="h-6 w-6" />
                                                                    <span>
                                                                        Download
                                                                    </span>
                                                                </a>
                                                            </>
                                                        ) : null}
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={route(
                                                            "edit-album",
                                                            {
                                                                id: posts.id,
                                                            }
                                                        )}
                                                        className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                    >
                                                        <ViewGridIcon className="h-6 w-6" />
                                                        <span>Manage</span>
                                                    </Link>
                                                )}
                                            </>
                                        ) : (
                                            <div className="w-full text-center my-1">
                                                <span>
                                                    Please{" "}
                                                    <span
                                                        className="underline cursor-pointer"
                                                        onClick={() =>
                                                            setShowModalLogin(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        login
                                                    </span>{" "}
                                                    or{" "}
                                                    <span
                                                        className="underline cursor-pointer"
                                                        onClick={() =>
                                                            setShowModalRegister(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        sign up
                                                    </span>{" "}
                                                    to access this feature.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-red-500">Merch</div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Modal show={showModalLogin} onClose={handleCloseModalLogin}>
                <Login
                    showModalLogin={showModalLogin}
                    setShowModalLogin={setShowModalLogin}
                />
            </Modal>

            <Modal show={showModalRegister} onClose={handleCloseModalRegister}>
                <Register
                    showModalRegister={showModalRegister}
                    setShowModalRegister={setShowModalRegister}
                    showModalLogin={showModalLogin}
                    setShowModalLogin={setShowModalLogin}
                />
            </Modal>
        </>
    );
}
