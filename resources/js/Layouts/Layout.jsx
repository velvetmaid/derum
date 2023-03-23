import Navbar from "@/Components/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <div className="relative sm:fle sm:justify-center sm:items-center bg-dots-darker text-blueNavy bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 dark:text-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <Navbar />
                    {children}
                </div>
            </div>
        </>
    );
}
