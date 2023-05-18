import Navbar from "@/Components/Navbar";

export default function Layout({ children }) {
    return (
        <div className="relative min-h-screen sm:fle sm:justify-center sm:items-center bg-dots-darker text-blueNavy bg-center bg-blue-50 dark:bg-dots-lighter dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
