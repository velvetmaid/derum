import { Head } from "@inertiajs/react";
import Test from "./Test";
import Navbar from "@/Components/Navbar";

export default function Welcome() {
    return (
        <>
            <Head title="Home" />

            <div className="relative sm:fle sm:justify-center sm:items-center bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white min-h-screen">
                <Navbar />

                <Test />
            </div>
        </>
    );
}
