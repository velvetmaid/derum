import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import PopularSlide from "@/Pages/Contents/PopularSlide";

export default function Welcome(posts) {
    return (
        <>
            <Head title="Home" />
            <div className="relative sm:fle sm:justify-center sm:items-center bg-dots-darker text-blueNavy bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 dark:text-gray-100 min-h-screen">
                <Navbar />
                <Hero />
                <PopularSlide {...posts} />
            </div>
        </>
    );
}
