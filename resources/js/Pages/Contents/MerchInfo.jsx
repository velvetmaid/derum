import { useEffect, useRef, useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { CloudDownloadIcon } from "@heroicons/react/outline";
import { CreditCardIcon, ViewGridIcon } from "@heroicons/react/solid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Layout from "@/Layouts/Layout";
import Modal from "@/Components/Modal";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import "@splidejs/react-splide/css";
import "@/../css/main.css";
import Checkout from "./Checkout";

export default function MerchInfo(props) {
    console.log(props);

    const user = usePage().props.auth.user;
    const [ongkir, setOngkir] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [loading, setLoading] = useState(false);

    const { data, setData, post, errors, progress } = useForm({
        order_user_name: (user && user.name) || "",
        order_product_name:
            (props.album
                ? props.album.album_title
                : props.merches.merch_title) || "",
        order_type: props.album ? "Digital" : props.merches.merch_category,
        order_weight: props.merches.merch_weight,
        order_qty: 1,
        order_price:
            (props.album
                ? props.album.album_price
                : props.merches.merch_price) || "",
        temp_order_price: null,
        order_total_price: 0,
        order_product_id:
            (props.album ? props.album.id : props.merches.id) || null,
        order_product_image:
            (props.album ? props.album.album_art : props.merches.merch_image) ||
            null,
        order_user_id: (user && user.id) || null,
        origin: props.merches.merch_origin,
        order_city: "",
        destination: props.auth.user && props.auth.user.city,
        order_address: (props.auth.user && props.auth.user.address) || "",
        weight: "",
        courier: "",
    });

    useEffect(() => {
        const selectedCity = props.cities.find(
            (city) => city.city_id === data.destination
        );
        const selectedCityName = selectedCity ? selectedCity.city_name : "";

        setData((prevData) => ({
            ...prevData,
            order_city: selectedCityName,
        }));
    }, [data.destination, props.cities]);

    useEffect(() => {
        if (data.order_qty && data.order_weight) {
            const weight = data.order_qty * data.order_weight;

            setData((prevData) => ({
                ...prevData,
                weight: weight,
            }));
        }

        if (data.order_qty && data.order_price) {
            const price = (data.order_qty * data.order_price).toFixed(2);

            setData((prevData) => ({
                ...prevData,
                temp_order_price: price,
            }));
        }

        if (data.cost && data.temp_order_price) {
            const cost = parseInt(data.cost, 10);
            const orderPrice = parseInt(data.temp_order_price, 10);
            const orderTotalPrice = cost + orderPrice;

            setData((prevData) => ({
                ...prevData,
                order_total_price: orderTotalPrice,
            }));
        }
    }, [data.cost, data.order_price, data.order_qty, data.order_weight]);

    useEffect(() => {
        if (data.origin && data.destination && data.weight && data.courier) {
            fetchData();
        }
    }, [data.origin, data.destination, data.weight, data.courier]);

    const fetchData = () => {
        setLoading(true); //
        axios
            .get("/ongkir", { params: data })
            .then((response) => {
                const ongkirData = response.data.ongkir;
                setOngkir(ongkirData);
                console.log(ongkirData);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

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
                <Head title={props.merches.merch_title} />
                <div className="flex md:mx-auto md:p-12 p-6 mx-4 bg-white dark:bg-blueNavy-dark rounded-xl">
                    <div className="w-full space-y-6">
                        <div className="max-w-full flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-2 tracking-widest font-robotocondensed">
                            <div className="md:w-full aspect-square">
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
                                    {props.merches.merch_image &&
                                        JSON.parse(
                                            props.merches.merch_image
                                        ).map((post, index) => (
                                            <SplideSlide key={index}>
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={
                                                        "/images/merches/main/" +
                                                        post
                                                    }
                                                    alt={
                                                        "Image " +
                                                        props.merches
                                                            .merch_title +
                                                        " " +
                                                        ++index
                                                    }
                                                />
                                            </SplideSlide>
                                        ))}
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
                                    {props.merches.merch_image &&
                                        JSON.parse(
                                            props.merches.merch_image
                                        ).map((post, index) => (
                                            <SplideSlide key={index}>
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={
                                                        "/images/merches/thumbnails/thumb_" +
                                                        post
                                                    }
                                                    alt={
                                                        "Thumbnail " +
                                                        props.merches
                                                            .merch_title +
                                                        " " +
                                                        ++index
                                                    }
                                                />
                                            </SplideSlide>
                                        ))}
                                </Splide>
                            </div>

                            <div className="w-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-md">
                                <div className="p-2 h-full flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-4xl">
                                            {props.merches.merch_title}
                                        </h1>
                                        <span className="text-xl font-black">
                                            {props.merches.merch_category}
                                        </span>
                                        <p>
                                            Price:{" "}
                                            {props.merches.merch_price ==
                                                null ||
                                            props.merches.merch_price == "0"
                                                ? "Free"
                                                : props.merches.merch_price.toLocaleString(
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
                                                {!user.city || !user.address ? (
                                                    <>
                                                        <a
                                                            href={route(
                                                                "profile.edit"
                                                            )}
                                                            className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                        >
                                                            Profile
                                                        </a>
                                                    </>
                                                ) : (
                                                    <>
                                                        {props.merches
                                                            .merch_user_id !=
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
                                                                    <span>
                                                                        Buy
                                                                    </span>
                                                                </button>
                                                                {props.merches
                                                                    .merch_price ==
                                                                    null ||
                                                                props.merches
                                                                    .merch_price ==
                                                                    "0" ? (
                                                                    <>
                                                                        <span>
                                                                            or
                                                                            download
                                                                            for
                                                                            free
                                                                        </span>
                                                                        <a
                                                                            href={`/download-album/${props.merches.id}`}
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
                                                                        id: props
                                                                            .merches
                                                                            .id,
                                                                    }
                                                                )}
                                                                className="my-2 w-full justify-center bg-gray-900 dark:bg-gray-300 transition-all duration-300 ease-in-out border-2 border-gray-100 dark:border-gray-900 border-solid cursor-pointer select-none hover:border-gray-900 dark:hover:border-gray-100 focus:shadow-xs focus:no-underline text-gray-100 dark:text-gray-900 font-bold py-2 px-4 inline-flex items-center"
                                                            >
                                                                <ViewGridIcon className="h-6 w-6" />
                                                                <span>
                                                                    Manage
                                                                </span>
                                                            </Link>
                                                        )}
                                                    </>
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

            <Modal show={showModalPay} onClose={handleCloseModalPay}>
                <Checkout
                    cities={props.cities}
                    ongkir={ongkir}
                    selectedService={selectedService}
                    loading={loading}
                    setLoading={setLoading}
                    setSelectedService={setSelectedService}
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
