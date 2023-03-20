export default function Hero() {
    return (
        <section className="max-w-7xl items-center px-4 pb-12 mx-auto md:flex md:px-40">
            <div className="flex-1 space-y-4 sm:text-center md:text-left">
                <h1 className="text-4xl font-bold dark:text-yellow-400">Derum</h1>
                <p className="max-w-xl leading-relaxed sm:mx-auto md:ml-0">
                    Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsum
                </p>
                <div className="items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex md:justify-start">
                    <a
                        className="block px-6 py-2 text-center bg-blueNavy hover:scale-105 transition-all duration-300 text-gray-100 dark:bg-yellow-500 dark:text-blueNavy rounded-md cursor-pointer"
                    >
                        Start
                    </a>
                    <a
                        className="block px-4 py-2 text-center rounded-md cursor-pointer md:relative md:before:content-[''] md:before:absolute md:before:block md:before:w-full md:before:h-[2px] 
                        md:before:bottom-2 md:before:left-0 md:before:bg-blueNavy dark:md:before:bg-gray-100
                        md:before:hover:scale-x-100 md:before:scale-x-0 md:before:origin-top-left
                        md:before:transition md:before:ease-in-out md:before:duration-300"
                    >
                        See More
                    </a>
                </div>
            </div>
            <div className="flex-1 sm:text-center md:text-left">
            <img className="w-full mx-auto sm:w-10/12 md:w-full block dark:hidden" src="./images/main/hero-light.svg" />
            <img className="w-full mx-auto sm:w-10/12 md:w-full hidden dark:block" src="./images/main/hero-dark.svg" />
            </div>
        </section>
    );
}
