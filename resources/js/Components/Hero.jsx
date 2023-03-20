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
                        className="block px-6 py-2 text-center bg-blueNavy hover:scale-110 transition-all text-gray-100 dark:bg-yellow-500 dark:text-blueNavy rounded-md cursor-pointer"
                    >
                        Start
                    </a>
                    <a
                        className="block px-4 py-2 text-center rounded-md cursor-pointer relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                        before:bottom-2 before:left-0 before:bg-blueNavy dark:before:bg-gray-100
                        before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                        before:transition before:ease-in-out before:duration-300"
                    >
                        See More
                    </a>
                </div>
            </div>
            <div bg-hero className="flex-1 sm:text-center md:text-left">
            <img className="w-full mx-auto sm:w-10/12 md:w-full block dark:hidden" src="./images/main/hero-light.svg" />
            <img className="w-full mx-auto sm:w-10/12 md:w-full hidden dark:block" src="./images/main/hero-dark.svg" />
            </div>
        </section>
    );
}
