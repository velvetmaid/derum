import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@inertiajs/react";
import "@splidejs/react-splide/css";
import "@/../css/main.css";

export default function NewAlbumSlider({ props }) {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);
    return (
        <div className="p-6 rounded-xl bg-white dark:bg-blueNavy-dark">
            <h1 className="text-2xl font-bold mb-2 text-blueNavy dark:text-yellow-400">
                New
            </h1>
            {width <= 768 ? (
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
                    }}
                >
                    {props.slice(props.length - 5, props.length).map((post) => {
                        return (
                            <SplideSlide key={post.id}>
                                <Link
                                    href={route("albumInfo", {
                                        id: post.id,
                                    })}
                                >
                                    <div className="flex flex-col w-full h-full">
                                        <a href="" className="w-full h-full">
                                            <img
                                                className="px-2 md:px-4 object-cover w-full h-full relative"
                                                src={
                                                    "/images/albums/thumbnails/thumb_" +
                                                    post.album_art
                                                }
                                                alt={post.album_title}
                                            />
                                        </a>
                                        <div className="px-4 flex flex-col -space-y-1">
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
                        );
                    })}
                </Splide>
            ) : (
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
                        perPage: 4,
                        arrows: true,
                    }}
                >
                    {props.slice(props.length - 5, props.length).map((post) => {
                        return (
                            <SplideSlide key={post.id}>
                                <Link
                                    href={route("albumInfo", {
                                        id: post.id,
                                    })}
                                >
                                    <div className="flex flex-col w-full h-full">
                                        <a href="" className="w-full h-full">
                                            <img
                                                className="px-2 md:px-4 object-cover w-full h-full relative"
                                                src={
                                                    "/images/albums/thumbnails/thumb_" +
                                                    post.album_art
                                                }
                                                alt={post.album_title}
                                            />
                                        </a>
                                        <div className="px-4 flex flex-col -space-y-1">
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
                        );
                    })}
                </Splide>
            )}
        </div>
    );
}
