import { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { CloudDownloadIcon } from "@heroicons/react/outline";
import { CreditCardIcon, ViewGridIcon } from "@heroicons/react/solid";
import Layout from "@/Layouts/Layout";
import AudioPlayr from "./AudioInfoPlayer";
import Modal from "@/Components/Modal";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Checkout from "./Checkout";

export default function AlbumInfo(props) {
    console.log(props);
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, progress } = useForm({
        order_user_name: (user && user.name) || "",
        order_product_name:
            (props.album
                ? props.album.album_title
                : props.merches.merch_title) || "",
        order_type: props.album ? "Digital" : "Physical",
        order_qty: 1,
        order_price:
            (props.album
                ? props.album.album_price
                : props.merches.merch_price) || "",
        order_total_price: 0,
        order_product_id:
            (props.album ? props.album.id : props.merches.id) || null,
        order_product_image:
            (props.album ? props.album.album_art : props.merches.merch_image) ||
            null,
        order_user_id: (user && user.id) || null,
    });

    if (data.order_qty && data.order_price) {
        data.order_total_price = data.order_qty * data.order_price;
    }

    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalPay, setShowModalPay] = useState(false);

    const handleCloseModalLogin = () => {
        setShowModalLogin(false);
    };

    const handleCloseModalRegister = () => {
        setShowModalRegister(false);
    };

    const handleCloseModalPay = () => {
        setShowModalPay(false);
    };

    return (
        <>
            <Layout>
                <Head title={props.album.album_title} />
                <div className="flex md:mx-auto md:p-12 p-6 mx-4 bg-white dark:bg-blueNavy-dark rounded-xl">
                    <div className="w-full space-y-6">
                        <div className="max-w-full flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6 tracking-widest font-robotocondensed">
                            <div className="w-full aspect-square">
                                <img
                                    className="w-full h-full object-cover"
                                    src={
                                        "/images/albums/main/" +
                                        props.album.album_art
                                    }
                                    alt={props.album.album_title}
                                />
                            </div>
                            <div className="w-full hidden md:flex flex-col bg-gray-100 dark:bg-gray-900 rounded-md">
                                <div className="p-2 h-full flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-4xl">
                                            {props.album.album_title}
                                        </h1>
                                        <span className="text-xl font-black">
                                            {props.album.album_artist_name}
                                        </span>
                                        <p>
                                            Release Date:{" "}
                                            {props.album.album_release_date}
                                        </p>
                                        <p>
                                            Price:{" "}
                                            {props.album.album_price == null ||
                                            props.album.album_price == "0"
                                                ? "Free"
                                                : props.album.album_price.toLocaleString(
                                                      "id-ID",
                                                      {
                                                          style: "currency",
                                                          currency: "IDR",
                                                          minimumFractionDigits: 0,
                                                      }
                                                  )}
                                        </p>
                                    </div>
                                    <div className="w-full text-center my-1">
                                        {user ? (
                                            <>
                                                {props.album.album_user_id !=
                                                user.id ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                setShowModalPay(
                                                                    true
                                                                )
                                                            }
                                                            className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                        >
                                                            <CreditCardIcon className="h-6 w-6" />
                                                            <span>Buy</span>
                                                        </button>
                                                        {props.album
                                                            .album_price ==
                                                            null ||
                                                        props.album
                                                            .album_price ==
                                                            "0" ? (
                                                            <>
                                                                <span>
                                                                    or download
                                                                    for free
                                                                </span>
                                                                <a
                                                                    href={`/download-album/${props.album.id}`}
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
                                                                id: props.album
                                                                    .id,
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
                            <div className="w-full">
                                <AudioPlayr songs={props.album} />
                            </div>
                            <div className="w-full md:hidden flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-md">
                                <div className="p-2 h-full flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-4xl font-robotocondensed">
                                            {props.album.album_title}
                                        </h1>
                                        <span className="text-md font-black tracking-widest font-sofiacondensed">
                                            By {props.album.album_artist_name}
                                        </span>
                                        <p>
                                            Release Date:{" "}
                                            {props.album.album_release_date}
                                        </p>
                                        <p>Price: {props.album.album_price}</p>
                                    </div>
                                    <div className="w-full text-center my-1">
                                        {user ? (
                                            <>
                                                {props.album.album_user_id !=
                                                user.id ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                setShowModalPay(
                                                                    true
                                                                )
                                                            }
                                                            className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                        >
                                                            <CreditCardIcon className="h-6 w-6" />
                                                            <span>Buy</span>
                                                        </button>
                                                        {props.album
                                                            .album_price ==
                                                            null ||
                                                        props.album
                                                            .album_price ==
                                                            "0" ? (
                                                            <>
                                                                <span>
                                                                    or download
                                                                    for free
                                                                </span>
                                                                <a
                                                                    href={`/download-album/${props.album.id}`}
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
                                                                id: props.album
                                                                    .id,
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
                            <div className="w-full">
                                <span className="text-center uppercase text-[26px] tracking-[1px] grid grid-cols-[1fr_auto_1fr] grid-rows-[16px_0] gap-[22px] after:content-['] after:block after:border-b-2 after:border-b-[#ccc] after:border-solid before:content-['] before:block  before:border-b-2 before:border-b-[#ccc] before:border-solid font-robotocondensed">
                                    {props.user.name} merch
                                </span>

                                <div className="flex flex-wrap gap-4">
                                    {props.merches.map((post) => (
                                        <div
                                            key={post.id}
                                            className="relative flex-[1_0_21%] overflow-hidden rounded-lg "
                                        >
                                            <span className="absolute bg-black opacity-75 z-50 w-full">
                                                {post.merch_category}
                                            </span>
                                            <Link
                                                href={route("merch-info", {
                                                    id: post.id,
                                                })}
                                            >
                                                <img
                                                    className="hover:scale-105 ease-in duration-200 w-full"
                                                    src={
                                                        "/images/merches/thumbnails/thumb_" +
                                                        JSON.parse(
                                                            post.merch_image
                                                        )[0]
                                                    }
                                                    alt={post.merch_title}
                                                    title={post.merch_title}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
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

            <Modal show={showModalPay} onClose={handleCloseModalPay}>
                <Checkout
                    showModalPay={showModalPay}
                    setShowModalPay={handleCloseModalPay}
                    data={data}
                    setData={setData}
                    post={post}
                    errors={errors}
                    progress={progress}
                />
            </Modal>
        </>
    );
}
