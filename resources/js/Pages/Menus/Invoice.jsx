import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import moment from "moment-timezone";

export default function Invoice(props) {
    moment.tz.add("Asia/Jakarta|WIB +07|-7u -70|0101|1nIl0 1zu0");
    console.log(props);
    return (
        <>
            <Layout>
                <Head title={props.auth.user.name + " Checkout Page"} />
                <div className="rounded-3xl mb-10 px-6">
                    <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold mb-8">
                        Customer invoice
                    </h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-stretch"></div>
                        <div className="flex items-center gap-x-2 mb-8 md:mb-0">
                            <Link
                                href={route("checkout-page")}
                                className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 dark:border-white border hover:text-white text-sm font-semibold transition"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg max-w-5xl py-10 mx-auto md:px-10 bg-gray-100 dark:bg-blueNavy-dark space-y-6">
                    <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
                        <div className="flex-1 flex justify-between items-center leading-4 text-gray-900">
                            <div className="p-2 text-center text-xl bg-gray-300 rounded flex flex-col">
                                {props.totalVolumePrice.toLocaleString(
                                    "id-ID",
                                    {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                    }
                                )}
                                <span className="text-xs text-gray-600 font-bold mt-2 uppercase">
                                    Total Volume Transaction
                                </span>
                            </div>
                            <div className="p-2 text-center text-xl rounded-lg bg-purple-300 flex flex-col">
                                {props.invoices.length + "X"}
                                <span className="text-xs text-gray-600 font-bold mt-2 uppercase">
                                    Total Transaction
                                </span>
                            </div>
                        </div>
                    </div>
                    {props.invoices.map((post, index) => {
                        const utcDateTime = moment.utc(post.created_at);

                        const wibDateTime = utcDateTime.tz("Asia/Jakarta");

                        const wibFormattedDate = wibDateTime.format(
                            "DD MMM, YYYY hh:mmA"
                        );

                        return (
                            <div
                                key={index}
                                className="shadow-lg dark:shadow-gray-700 bg-blue-100 md:mx-auto mx-4 border rounded-md overflow-hidden text-gray-700 mb-0.5 h-30"
                            >
                                <div className="flex flex-wrap p-3 border-l-8 border-cyan-700 dark:border-cyan-900">
                                    <div className="space-y-1 border-r-2 pr-3">
                                        <div className="text-sm leading-5 font-semibold">
                                            <span className="text-xs leading-4 font-normal text-gray-500">
                                                {" "}
                                                Release #
                                            </span>{" "}
                                            {post.id}
                                        </div>
                                        <div className="text-sm leading-5 font-semibold">
                                            <span className="text-xs leading-4 font-normal text-gray-500 pr">
                                                {" "}
                                                Product #
                                            </span>{" "}
                                            {post.invoice_product_name}
                                        </div>
                                        <div className="text-sm leading-5 font-semibold">
                                            {post.invoice_type_product ==
                                            "Digital" ? null : (
                                                <span className="text-xs leading-4 font-normal text-gray-500 pr">
                                                    Qty # {post.invoice_qty}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm leading-5 font-semibold">
                                            {wibFormattedDate}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="ml-3 space-y-1 border-r-2 pr-3">
                                            <div className="text-base leading-6 font-normal">
                                                {post.invoice_user_name}
                                            </div>
                                            <div className="text-sm leading-4 font-normal">
                                                <span className="text-xs leading-4 font-normal text-gray-500">
                                                    Courier{" "}
                                                </span>
                                                <span className="uppercase">
                                                    {post.invoice_order_courier}{" "}
                                                    -{" "}
                                                    {
                                                        post.invoice_courier_description
                                                    }
                                                </span>
                                            </div>
                                            <div className="text-sm leading-4 font-normal">
                                                <span className="text-xs leading-4 font-normal text-gray-500">
                                                    Destination
                                                </span>{" "}
                                                <span>
                                                    {post.invoice_order_city},{" "}
                                                    {post.invoice_order_address}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-r-2 pr-3">
                                        <div>
                                            <div className="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                                                {post.invoice_type_product ==
                                                "Digital" ? (
                                                    <div className="uppercase text-xs leading-4 font-medium py-1 px-7">
                                                        {
                                                            post.invoice_type_product
                                                        }
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="uppercase text-xs leading-4 font-medium">
                                                            Estimated Time
                                                        </div>
                                                        <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                                                            {post.invoice_etd}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="ml-3 my-5 dark:bg-gray-800 bg-cyan-800 p-1">
                                            <div className="text-xs leading-4 font-semibold text-center text-blue-100">
                                                {post.invoice_total_price.toLocaleString(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Layout>
        </>
    );
}
