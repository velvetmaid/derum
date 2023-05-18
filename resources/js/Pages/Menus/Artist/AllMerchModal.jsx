import { Link } from "@inertiajs/react";

export default function AllMerchModal(props) {
    return (
        <div className="h-96 md:h-[44rem] overflow-y-scroll">
            <div className="flex flex-wrap gap-4 p-8">
                {props.merches.map((post) => (
                    <div
                        key={post.id}
                        className="flex-[1_0_21%] overflow-hidden rounded-lg"
                    >
                        <Link
                            href={route("edit-merch", {
                                id: post.id,
                            })}
                        >
                            <img
                                className="hover:scale-105 ease-in duration-200 w-full"
                                src={
                                    "/images/merches/thumbnails/thumb_" +
                                    JSON.parse(post.merch_image)[0]
                                }
                                alt={post.merch_title}
                                title={post.merch_title}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
