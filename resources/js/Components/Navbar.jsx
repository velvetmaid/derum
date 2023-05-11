import { Menu, Transition } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import DarkModeToggle from "@/Components/DarkModeToggle";
import Modal from "./Modal";
import Login from "@/Pages/Auth/Login";
import { useState } from "react";
import Register from "@/Pages/Auth/Register";

export default function Navbar() {
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
            <div className="relative max-w-7xl mx-auto p-6 z-50">
                <Menu>
                    {({ open }) => (
                        <>
                            {/* Navbar section desktop */}
                            <nav className="text-right">
                                <div className="flex w-full place-content-end sm:w-auto items-center justify-betwen ">
                                    {user ? (
                                        <>
                                            <div className="flex items-center sm:hidden">
                                                <Menu.Button className="inline-flex items-center justify-center rounded-md p-2 hover:text-gray-500 focus:outline-none">
                                                    <span className="sr-only">
                                                        Open main menu
                                                    </span>
                                                    <MenuIcon
                                                        className="h-8 w-8"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <div className="hidden w-full sm:flex sm:flex-row sm:items-center sm:justify-between ">
                                                <div className="flex flex-row items-center space-x-8">
                                                    <Link
                                                        href="/"
                                                        className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                    >
                                                        Home
                                                    </Link>
                                                    {user.role == "artist" ? (
                                                        <Link
                                                            href={route(
                                                                "artist.dashboard"
                                                            )}
                                                            className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={route(
                                                                "fanDashboard"
                                                            )}
                                                            className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="flex flex-row items-center space-x-8">
                                                    <DarkModeToggle />
                                                    <Link
                                                        href=""
                                                        className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                    >
                                                        Help
                                                    </Link>
                                                    <Link
                                                        href={route("logout")}
                                                        method="post"
                                                        as="button"
                                                        className="rounded-xl border-2 border-[#696969] px-4 py-3 font-medium text-gray-500 hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100"
                                                    >
                                                        Log Out
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center sm:hidden">
                                                <Menu.Button className="inline-flex items-center justify-center rounded-md p-2 hover:text-gray-500 focus:outline-none">
                                                    <span className="sr-only">
                                                        Open main menu
                                                    </span>
                                                    <MenuIcon
                                                        className="h-8 w-8"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <div className="hidden w-full sm:flex sm:flex-row sm:items-center sm:justify-between ">
                                                <div className="flex flex-row items-center space-x-8">
                                                    <Link
                                                        href="/"
                                                        className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                    >
                                                        Home
                                                    </Link>
                                                </div>
                                                <div className="flex flex-row items-center space-x-8">
                                                    <DarkModeToggle />{" "}
                                                    <span
                                                        type="button"
                                                        onClick={() =>
                                                            setShowModalLogin(
                                                                true
                                                            )
                                                        }
                                                        className="cursor-pointer font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                    >
                                                        Login
                                                    </span>
                                                    <span
                                                        type="button"
                                                        onClick={() =>
                                                            setShowModalRegister(
                                                                true
                                                            )
                                                        }
                                                        className="cursor-pointer rounded-xl border-2 border-[#696969] px-4 py-3 font-medium text-gray-500 hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100"
                                                    >
                                                        Sign Up
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </nav>
                            {/* End navbar section desktop */}
                            <Transition
                                show={open}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="-translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="-translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Menu.Items className="absolute -top-14 -right-1 w-[60%] md:hidden">
                                    <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 shadow-2xl ring-1 ring-black ring-opacity-5">
                                        <div className="flex items-center justify-between px-5 pt-4">
                                            <div className="-mr-2">
                                                <Menu.Button className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none !hover:bg-none dark:fill-gray-300">
                                                    <span className="sr-only">
                                                        Close main menu
                                                    </span>
                                                    <XIcon
                                                        className="h-8 w-8 dark:text-gray-300"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col px-2 pt-2 pb-3">
                                            {user ? (
                                                <>
                                                    <div className="flex flex-col px-2 pt-2 pb-2 space-y-5">
                                                        <Link
                                                            href="/"
                                                            className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Home
                                                        </Link>
                                                        {user.role ==
                                                        "artist" ? (
                                                            <Link
                                                                href={route(
                                                                    "artist.dashboard"
                                                                )}
                                                                className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                            >
                                                                Dahboard
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={route(
                                                                    "fanDashboard"
                                                                )}
                                                                className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                            >
                                                                Dahboard
                                                            </Link>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col items-center pt-10 space-y-5">
                                                        <Link
                                                            href=""
                                                            className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Help
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "logout"
                                                            )}
                                                            method="post"
                                                            as="button"
                                                            className="rounded-xl border-2 border-[#696969] px-4 py-3 w-full text-center font-medium text-gray-500 hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Log Out
                                                        </Link>
                                                        <DarkModeToggle />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col px-2 pt-2 pb-2 space-y-5">
                                                        <Link
                                                            href="/"
                                                            className="font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Home
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col items-center pt-10 space-y-5">
                                                        <span
                                                            type="button"
                                                            onClick={() =>
                                                                setShowModalLogin(
                                                                    true
                                                                )
                                                            }
                                                            className="cursor-pointer font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Login
                                                        </span>
                                                        <span
                                                            type="button"
                                                            onClick={() =>
                                                                setShowModalRegister(
                                                                    true
                                                                )
                                                            }
                                                            className="cursor-pointer rounded-xl border-2 border-[#696969] px-4 py-3 w-full text-center font-medium text-gray-500 hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100"
                                                        >
                                                            Sign Up
                                                        </span>
                                                        <DarkModeToggle />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
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
