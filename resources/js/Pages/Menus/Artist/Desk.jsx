import { Link } from "@inertiajs/react";
import Merch from "./Merch";

export default function Desk(props) {
    return (
        <div className="rounded-3xl mb-5 px-6">
            <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold mb-8">
                Welcome
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
                    <button
                        type="button"
                        className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 dark:border-white border hover:text-white text-sm font-semibold transition"
                    >
                        Open
                    </button>
                </div>
            </div>

            <div className="block md:flex gap-x-8">
                <div className="h-full md:flex-1 md:items-stretch">
                    <h2 className="text-2xl font-bold mb-4">
                        Add an album or track
                    </h2>

                    <div className="grid grid-cols-3 gap-4 pb-12 md:p-0 h-full">
                        <div className="col-span-3">
                            <div className="p-4 bg-green-100 space-x-4 dark:bg-[#16113f] rounded-xl flex justify-around">
                                <Link
                                    href={route("add-album")}
                                    type="button"
                                    className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-white dark:bg-[#110128] hover:text-green-500 dark:hover:text-blue-200 text-sm font-semibold transition"
                                >
                                    Add an album
                                </Link>
                                <Link
                                    href={route("add-merch")}
                                    type="button"
                                    className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-white dark:bg-[#110128] hover:text-green-500 dark:hover:text-blue-200 text-sm font-semibold transition"
                                >
                                    Add merchandise
                                </Link>
                            </div>
                        </div>
                        {props.albums.length > 0 ? (
                            <>
                                <div className="p-4 bg-yellow-100 dark:bg-[#443C68] rounded-xl">
                                    <div className="font-bold text-2xl leading-none">
                                        {props.albums.length || null}
                                    </div>
                                    <span className="mt-2">Your album</span>
                                </div>
                                <div className="p-4 bg-yellow-100 dark:bg-[#443C68] rounded-xl">
                                    <div className="font-bold text-2xl leading-none">
                                        {props.songsCount}
                                    </div>
                                    <span className="mt-2">Your song</span>
                                </div>
                                <div className="p-4 bg-yellow-100 dark:bg-[#443C68] rounded-xl">
                                    <div className="font-bold text-2xl leading-none">
                                        {props.merches.length}
                                    </div>
                                    <span className="mt-2">Your merch</span>
                                </div>
                                <div className="col-span-3 space-y-4">
                                    <div className="p-4 bg-purple-100 dark:bg-[#022C43] rounded-xl ">
                                        <div className="font-bold text-xl leading-none">
                                            Your current album
                                        </div>
                                        <div className="mt-2">
                                            {props.albums.slice(-1)[0] && (
                                                <Link
                                                    href={route("albumInfo", {
                                                        id: props.albums.slice(
                                                            -1
                                                        )[0].id,
                                                    })}
                                                >
                                                    {
                                                        props.albums.slice(
                                                            -1
                                                        )[0].album_title
                                                    }
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                    {props.albums.length === 0 && (
                        <div className="my-4 w-full h-1/2 flex items-center justify-center bg-purple-100 dark:bg-[#022C43] rounded-xl">
                            <span className="font-bold text-xl leading-none p-6">
                                You haven't uploaded an album yet
                            </span>
                        </div>
                    )}
                </div>
                <div className="h-full md:flex-1 md:items-stretch">
                    <Merch {...props} />
                </div>
            </div>
        </div>
    );
}
