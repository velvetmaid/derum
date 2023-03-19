export default function Hero() {
    return (
        <section className="container items-center px-4 pb-12 mx-auto mt-20 md:flex md:px-40">
            <div className="flex-1 space-y-4 sm:text-center md:text-left">
                <h1 className="text-4xl font-bold text-yellow-500">Derum</h1>
                <p className="max-w-xl leading-relaxed text-gray-300 sm:mx-auto md:ml-0">
                    Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem
                    ipsumLorem ipsum
                </p>
                <div className="items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex md:justify-start">
                    <a
                        className="block px-6 py-2 text-center text-white bg-yellow-600 rounded-md"
                    >
                        idk what
                    </a>
                    <a
                        className="block px-6 py-2 text-center text-gray-500 bg-white rounded-md"
                    >
                        idk more
                    </a>
                </div>
            </div>
            <div className="flex-1 space-y-4 sm:text-center md:text-left">
                <img className="bg-[url('./images/main/hero-light.svg')] w-full mx-auto mt-6 sm:w-10/12 md:w-full" />
            </div>
        </section>
    );
}
