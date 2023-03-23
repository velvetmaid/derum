import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import Album from "./Album";
import Desk from "./Desk";

export default function Dashboard(props) {
    const posts = props.posts;

    return (
        <>
            <Head title={props.auth.user.name + " Dashboard"} />
            <div className="relative sm:fle sm:justify-center sm:items-center bg-dots-darker text-blueNavy bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 dark:text-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <Navbar />
                    <Desk {...props} />
                    <div className="rounded-3xl p-8 mb-5">
                        <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold mb-8">
                            Your Album
                        </h1>
                        <Album posts={posts} />
                    </div>
                </div>
            </div>
        </>
    );
}
