export default function AuthLayout({ children }) {
    return (
        <div className="bg-dots-darker text-blueNavy bg-center bg-blue-50 dark:bg-dots-lighter dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out">
            <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
                <div className="w-full px-6 py-14 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
