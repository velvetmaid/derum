import { useEffect, useRef, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { CloudDownloadIcon } from "@heroicons/react/outline";
import { CreditCardIcon, ViewGridIcon } from "@heroicons/react/solid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Layout from "@/Layouts/Layout";
import Modal from "@/Components/Modal";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import "@splidejs/react-splide/css";
import "@/../css/main.css";

export default function AlbumInfo({ merches }) {
    console.log(merches);
    const user = usePage().props.auth.user;

    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);

    const handleCloseModalLogin = () => {
        setShowModalLogin(false);
    };

    const handleCloseModalRegister = () => {
        setShowModalRegister(false);
    };

    const mainSliderRef = useRef(null);
    const thumbnailSliderRef = useRef(null);

    useEffect(() => {
        if (mainSliderRef.current && thumbnailSliderRef.current) {
            const mainSlider = mainSliderRef.current.splide;
            const thumbnailSlider = thumbnailSliderRef.current.splide;

            mainSlider.sync(thumbnailSlider);
        }
    }, []);

    return (
        <>
            <Layout>
                <Head title={merches.merch_title} />
                <div className="flex md:mx-auto md:p-12 p-6 mx-4 bg-white dark:bg-blueNavy-dark rounded-xl">
                    <div className="w-full space-y-6">
                        <div className="max-w-full flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6 tracking-widest font-robotocondensed">
                            <div className="w-full aspect-square">
                                <Splide
                                    options={{
                                        type: "fade",
                                        pagination: false,
                                        arrows: false,
                                        cover: true,
                                        fixedHeight: 500,
                                        breakpoints: {
                                            640: {
                                                fixedHeight: 250,
                                            },
                                        },
                                    }}
                                    ref={mainSliderRef}
                                    className="py-2"
                                >
                                    {merches.merch_image &&
                                        JSON.parse(merches.merch_image).map(
                                            (post, index) => (
                                                <SplideSlide key={index}>
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={
                                                            "/images/merches/main/" +
                                                            post
                                                        }
                                                        alt={
                                                            "Image " +
                                                            merches.merch_title +
                                                            " " +
                                                            ++index
                                                        }
                                                    />
                                                </SplideSlide>
                                            )
                                        )}
                                </Splide>

                                <Splide
                                    options={{
                                        rewind: true,
                                        fixedWidth: 104,
                                        fixedHeight: 58,
                                        isNavigation: true,
                                        gap: 10,
                                        focus: "center",
                                        pagination: false,
                                        cover: true,
                                        arrows: false,
                                        dragMinThreshold: {
                                            mouse: 4,
                                            touch: 10,
                                        },
                                        breakpoints: {
                                            640: {
                                                fixedWidth: 66,
                                                fixedHeight: 38,
                                            },
                                        },
                                    }}
                                    ref={thumbnailSliderRef}
                                >
                                    {merches.merch_image &&
                                        JSON.parse(merches.merch_image).map(
                                            (post, index) => (
                                                <SplideSlide key={index}>
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={
                                                            "/images/merches/thumbnails/thumb_" +
                                                            post
                                                        }
                                                        alt={
                                                            "Thumbnail " +
                                                            merches.merch_title +
                                                            " " +
                                                            ++index
                                                        }
                                                    />
                                                </SplideSlide>
                                            )
                                        )}
                                </Splide>
                            </div>
                            <div className="w-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-md">
                                <div className="p-2 h-full flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-4xl">
                                            {merches.merch_title}
                                        </h1>
                                        <span className="text-xl font-black">
                                            {merches.merch_category}
                                        </span>
                                        <p>
                                            Price:{" "}
                                            {merches.merch_price == null ||
                                            merches.merch_price == "0"
                                                ? "Free"
                                                : merches.merch_price.toLocaleString(
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
                                                {merches.merch_user_id !=
                                                user.id ? (
                                                    <>
                                                        <button className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center">
                                                            <CreditCardIcon className="h-6 w-6" />
                                                            <span>Buy</span>
                                                        </button>
                                                        {merches.merch_price ==
                                                            null ||
                                                        merches.merch_price ==
                                                            "0" ? (
                                                            <>
                                                                <span>
                                                                    or download
                                                                    for free
                                                                </span>
                                                                <a
                                                                    href={`/download-album/${merches.id}`}
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
                                                            "edit-merch",
                                                            {
                                                                id: merches.id,
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
