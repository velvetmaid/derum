import { Link } from "@inertiajs/react";

export default function Desk(props) {
    return (
        <div className="rounded-3xl p-8 mb-5">
            <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold mb-8">
                Welcome{" "}
                <span className="bg-[#04ddb4] dark:bg-[#3e607b] text-[#0d2758] dark:text-gray-100 italic px-2">
                    {props.auth.user.name}
                </span>
                ! This is your dashboard.
            </h1>
            <div className="flex items-center justify-between">
                <div className="flex items-stretch"></div>
                <div className="flex items-center gap-x-2 mb-8 md:mb-0">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400  hover:text-gray-900 transition"
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
                    <button
                        type="button"
                        className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 dark:border-white border hover:text-white text-sm font-semibold transition"
                    >
                        Open
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-20">
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Add an album or track
                    </h2>

                    <div className="grid grid-cols-2 gap-4 pb-12 md:p-0">
                        <div className="col-span-2">
                            <div className="p-4 bg-green-100 dark:bg-[#16113f] rounded-xl flex justify-around">
                                <div>
                                    <Link
                                        href={route("artistAddAlbum.create")}
                                        type="button"
                                        className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white dark:bg-[#110128] hover:text-green-500 dark:hover:text-blue-200 text-sm font-semibold transition"
                                    >
                                        Add an album
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white dark:bg-[#110128] hover:text-green-500 dark:hover:text-blue-200 text-sm font-semibold transition"
                                    >
                                        Add an song
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-yellow-100 dark:bg-[#443C68] rounded-xl">
                            <div className="font-bold text-2xl leading-none">
                                20
                            </div>
                            <div className="mt-2">Your album</div>
                        </div>
                        <div className="p-4 bg-yellow-100 dark:bg-[#443C68] rounded-xl">
                            <div className="font-bold text-2xl leading-none">
                                100
                            </div>
                            <div className="mt-2">Your song</div>
                        </div>
                        <div className="col-span-2">
                            <div className="p-4 bg-purple-100 dark:bg-[#022C43] rounded-xl ">
                                <div className="font-bold text-xl leading-none">
                                    idk idk
                                </div>
                                <div className="mt-2">Your current album</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">IDK IDK</h2>

                    <div className="space-y-4">
                        <div className="p-4 bg-white dark:bg-[#1D2D50] border rounded-xl space-y-2">
                            <div className="flex justify-between">
                                <div className="text-gray-400 text-xs">
                                    Number 10
                                </div>
                                <div className="text-gray-400 text-xs">4h</div>
                            </div>
                            <a
                                href=""
                                className="font-bold hover:text-yellow-800 hover:underline"
                            >
                                Blog and social posts
                            </a>
                            <div className="text-sm text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    className=" inline align-middle mr-1"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                                Deadline is today
                            </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-[#1D2D50] border rounded-xl space-y-2">
                            <div className="flex justify-between">
                                <div className="text-gray-400 text-xs">
                                    Grace Aroma
                                </div>
                                <div className="text-gray-400 text-xs">7d</div>
                            </div>
                            <a
                                href=""
                                className="font-bold hover:text-yellow-800 hover:underline"
                            >
                                New campaign review
                            </a>
                            <div className="text-sm text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    className=" inline align-middle mr-1"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                                New feedback
                            </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-[#1D2D50] border rounded-xl space-y-2">
                            <div className="flex justify-between">
                                <div className="text-gray-400 text-xs">
                                    Petz App
                                </div>
                                <div className="text-gray-400 text-xs">2h</div>
                            </div>
                            <a
                                href=""
                                className="font-bold hover:text-yellow-800 hover:underline"
                            >
                                Cross-platform and browser QA
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
