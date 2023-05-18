import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@inertiajs/react";
import "@splidejs/react-splide/css";
import "@/../css/main.css";

export default function NewAlbumSlider({ props }) {
    return (
        <div className="p-6 space-y-6 rounded-xl bg-white dark:bg-blueNavy-dark">
            <h1 className="text-2xl font-bold mb-2 text-blueNavy dark:text-yellow-400">
                Newly Released Album
            </h1>
            <Splide
                options={{
                    autoplay: true,
                    interval: 2500,
                    speed: 2500,
                    type: "loop",
                    drag: "free",
                    focus: "center",
                    arrows: false,
                    pagination: false,
                    perPage: 2,
                    gap: "1rem",
                    mediaQuery: "min",
                    breakpoints: {
                        768: {
                            perPage: 2,
                        },
                        1024: {
                            perPage: 4,
                        },
                    },
                }}
            >
                {props.slice(props.length - 5, props.length).map((post) => (
                    <SplideSlide className="hover:opacity-75" key={post.id}>
                        <Link
                            href={route("album-info", {
                                id: post.id,
                            })}
                        >
                            <div className="flex flex-col">
                                <img
                                    className="object-cover object-center rounded-md w-full h-full"
                                    src={
                                        "/images/albums/thumbnails/thumb_" +
                                        post.album_art
                                    }
                                    alt={post.album_title}
                                />
                                <div className="flex flex-col -space-y-1">
                                    <span className="font-robotocondensed truncate">
                                        {post.album_title}
                                    </span>
                                    <span className="font-sofiacondensed text-xs truncate">
                                        by: {post.album_artist_name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}
