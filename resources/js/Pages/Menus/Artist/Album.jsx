export default function Album({ posts }) {
    return (
        <>
            <section className="rounded-3xl p-2 md:p-12 mb-5">
                {posts.length > 0 ? (
                    <>
                        <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold md:mb-8">
                            Your Album
                        </h1>
                        <div className="mx-auto">
                            <div className="-m-1 flex flex-wrap md:-m-2 justify-center">
                                {posts.map((post) => {
                                    return (
                                        <div
                                            key={post.id}
                                            className="flex md:w-1/3 flex-wrap"
                                        >
                                            <div className="relative w-full p-5">
                                                <h1>{post.id}</h1>

                                                <img
                                                    className="block h-full w-full rounded-lg object-cover object-center"
                                                    src={
                                                        "/images/albums/thumbnails/thumb_" +
                                                        post.album_art
                                                    }
                                                    alt={post.album_title}
                                                />
                                                <span className="absolute bg-black text-white font-robotocondensed opacity-80 hover:opacity-95 hover:scale-105 transition-all cursor-pointer rounded-lg px-3 left-2 bottom-8 text-md md:text-3xl mx-5">
                                                    {post.album_title}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-center">
                            You haven't uploaded an album yet
                        </p>
                    </>
                )}
            </section>
        </>
    );
}
