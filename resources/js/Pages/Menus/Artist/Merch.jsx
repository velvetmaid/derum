export default function Merch(props) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Your Merch</h2>
            {props.merches.length > 0 ? (
                <div className="flex flex-wrap gap-4 pb-12 md:p-0">
                    {props.merches.slice(0, 11).map((post) => (
                        <div
                            key={post.id}
                            className="flex-[1_0_21%] overflow-hidden rounded-lg"
                        >
                            <img
                                className="hover:scale-105 ease-in duration-200"
                                src={
                                    "/images/merches/thumbnails/thumb_" +
                                    JSON.parse(post.merch_image)[0]
                                }
                                alt={post.merch_title}
                            />
                        </div>
                    ))}
                    {props.merches.length >= 11 && (
                        <div className="flex-[1_0_21%] flex items-center justify-center bg-gray-800 rounded-lg  ">
                            Read More
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-4">
                    {props.merches.map((post) => (
                        <div key={post.id} className="h-full">
                            <img
                                className="rounded-lg"
                                src={
                                    "/images/merches/thumbnails/thumb_" +
                                    JSON.parse(post.merch_image)[0]
                                }
                                alt={post.merch_title}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
