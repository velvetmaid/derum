import { Menu, Transition } from "@headlessui/react";
import { Link, Head } from "@inertiajs/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export default function Welcome(props) {
    return (
        <>
            <Head title="Home" />

            <div className="relative sm:fle sm:justify-center sm:items-center bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white min-h-screen">
                <div className="relative max-w-7xl mx-auto p-6">
                    <Menu>
                        {({ open }) => (
                            <>
                                {/* Navbar section desktop */}
                                <nav className="text-right">
                                    {/* md:hidden */}
                                    <div className="flex w-full place-content-end sm:w-auto items-center justify-betwen ">
                                        {props.auth.user ? (
                                            <>
                                                {/* <Link
                                                    href={route("dashboard")}
                                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                                                >
                                                    Dashboard
                                                </Link> */}
                                                <div className="flex items-center sm:hidden">
                                                    <Menu.Button className="inline-flex items-center justify-center rounded-md  p-2 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">
                                                            Open main menu
                                                        </span>
                                                        <MenuIcon
                                                            className="h-8 w-8"
                                                            aria-hidden="true"
                                                        />
                                                    </Menu.Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("login")}
                                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                                                >
                                                    Log in
                                                </Link>

                                                <Link
                                                    href={route("register")}
                                                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    <div className="hidden w-full sm:flex sm:flex-row sm:items-center sm:justify-between ">
                                        <div className="flex flex-row items-center space-x-8">
                                            <Link
                                                href={route("dashboard")}
                                                className="font-medium text-gray-500 hover:text-gray-900"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                href={route("dashboard")}
                                                className="font-medium text-gray-500 hover:text-gray-900"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                href={route("login")}
                                                className="mr-4 font-medium text-gray-500 hover:text-gray-900"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-xl border-2 border-[#696969] px-4 py-3 font-medium text-gray-500 hover:border-[#141414] hover:text-[#141414]"
                                            >
                                                Register
                                            </Link>
                                        </div>
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
                                        <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                                            <div className="flex items-center justify-between px-5 pt-4">
                                                <div className="-mr-2">
                                                    <Menu.Button className="inline-flex items-center justify-center rounded-md p-2hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">
                                                            Close main menu
                                                        </span>
                                                        <XIcon
                                                            className="h-8 w-8"
                                                            aria-hidden="true"
                                                        />
                                                    </Menu.Button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col px-2 pt-2 pb-3">
                                                <div className="flex flex-col px-2 pt-2 pb-2 space-y-5">
                                                    <Link
                                                        href={route(
                                                            "dashboard"
                                                        )}
                                                        className="font-medium text-gray-500 hover:text-gray-900"
                                                    >
                                                        Career
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "dashboard"
                                                        )}
                                                        className="font-medium text-gray-500 hover:text-gray-900"
                                                    >
                                                        About us
                                                    </Link>
                                                </div>
                                                <div className="flex flex-col items-center pt-10 space-y-5">
                                                    <Link
                                                        href={route("login")}
                                                        className="mr-4 font-medium text-gray-500 hover:text-gray-900"
                                                    >
                                                        Login
                                                    </Link>
                                                    <Link
                                                        href={route("register")}
                                                        className="rounded-xl border-2 border-[#696969] px-4 py-3 w-full text-center font-medium text-gray-500 hover:border-[#141414] hover:text-[#141414]"
                                                    >
                                                        Register
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        </>
    );
}
