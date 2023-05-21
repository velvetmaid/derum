import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";

export default function CheckoutPage(props) {
    const [expirationTimes, setExpirationTimes] = useState([]);

    useEffect(() => {
        const calculateExpirationTime = (createdAt) => {
            const createdDate = new Date(createdAt);
            createdDate.setDate(createdDate.getDate() + 1);
            const expirationDate = createdDate.getTime() - Date.now();
            return expirationDate;
        };
        const formatExpirationTime = (expirationTime) => {
            if (expirationTime <= 0) {
                return "Expired";
            }
            const seconds = Math.floor(expirationTime / 1000) % 60;
            const minutes = Math.floor(expirationTime / 1000 / 60) % 60;
            const hours = Math.floor(expirationTime / 1000 / 60 / 60);
            return `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        };

        const updateExpirationTimes = () => {
            const updatedExpirationTimes = props.order.map((orderItem) => {
                const expirationTime = calculateExpirationTime(
                    orderItem.created_at
                );
                return formatExpirationTime(expirationTime);
            });

            setExpirationTimes(updatedExpirationTimes);
        };

        const intervalId = setInterval(updateExpirationTimes, 1000);
        return () => clearInterval(intervalId);
    }, [props.order]);

    console.log("ccpage", props);

    useEffect(() => {
        const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const midtransClientKey = props.order.snap_token;

        const script = document.createElement("script");
        script.src = snapSrcUrl;
        script.setAttribute("data-client-key", midtransClientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayButtonClick = (orderId) => {
        const orderToPay = props.order.find((order) => order.id === orderId);
        const snapToken = orderToPay.snap_token;

        if (snapToken) {
            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    alert("Payment success!");
                    console.log(result);
                    window.location.href = "/checkout-page";
                },
                onPending: function (result) {
                    alert("Waiting for your payment!");
                    console.log(result);
                },
                onError: function (result) {
                    alert("Payment failed!");
                    console.log(result);
                },
                onClose: function () {
                    alert("You closed the popup without finishing the payment");
                },
            });
        } else {
            alert("Snap Token is required!");
        }
    };

    return (
        <>
            <Layout>
                <Head title={props.auth.user.name + " Checkout Page"} />
                <div className="rounded-3xl mb-5 px-6">
                    <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold mb-8">
                        This is{" "}
                        <span className="bg-[#04ddb4] dark:bg-[#3e607b] text-[#0d2758] dark:text-gray-100 italic px-2">
                            your checkout
                        </span>
                    </h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-stretch"></div>
                        <div className="flex items-center gap-x-2 mb-8 md:mb-0">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 hover:text-gray-900 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    className="bi bi-chat-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                </svg>
                            </button>
                            <Link
                                href={
                                    props.auth.user.role === "artist"
                                        ? route("artist.dashboard")
                                        : route("fanDashboard")
                                }
                                className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 dark:border-white border hover:text-white text-sm font-semibold transition"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-8 justify-center py-8">
                        {props.order.map((orderItem, index) => (
                            <div
                                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                key={orderItem.id}
                            >
                                <a href="#">
                                    <img
                                        className="rounded-lg aspect-square w-full object-cover"
                                        src={
                                            "/images/albums/main/" +
                                            orderItem.order_product_image
                                        }
                                        alt={orderItem.order_product_name}
                                    />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {orderItem.order_product_name}
                                        </h5>
                                    </a>
                                    <div className="flex items-center">
                                        {orderItem.order_status === "Unpaid" ? (
                                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-3 py-1 rounded-lg dark:bg-indigo-900 dark:text-indigo-300">
                                                {orderItem.order_status}
                                            </span>
                                        ) : orderItem.order_status ===
                                          "Expired" ? (
                                            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-3 py-1 rounded-lg dark:bg-red-900 dark:text-red-300">
                                                {orderItem.order_status}
                                            </span>
                                        ) : (
                                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-lg dark:bg-green-900 dark:text-green-300">
                                                {orderItem.order_status}
                                            </span>
                                        )}
                                        {orderItem.order_status !== "Paid" &&
                                            expirationTimes[index] !==
                                                undefined && (
                                                <p className="text-sm text-gray-500">
                                                    {expirationTimes[index] !==
                                                    "Expired"
                                                        ? "Outta Time: " +
                                                          expirationTimes[index]
                                                        : "Ain't No More"}
                                                </p>
                                            )}
                                        {orderItem.order_status === "Paid" && (
                                            <p className="text-sm text-gray-500">
                                                Order will be deleted in{" "}
                                                {expirationTimes[index]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {orderItem.order_price.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                    minimumFractionDigits: 0,
                                                }
                                            )}
                                        </span>
                                        {orderItem.order_status === "Unpaid" ? (
                                            <button
                                                onClick={() =>
                                                    handlePayButtonClick(
                                                        orderItem.id
                                                    )
                                                }
                                                className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-300 hover:dark:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-200"
                                            >
                                                Pay
                                            </button>
                                        ) : orderItem.order_status ===
                                          "Expired" ? (
                                            <button className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-300 hover:dark:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-200">
                                                Back
                                            </button>
                                        ) : (
                                            <button className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-300 hover:dark:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-200">
                                                Paid
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}
