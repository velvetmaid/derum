import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/../css/main.css";
import { useEffect } from "react";
import { useState } from "react";

export default function PopularSlide({ posts }) {
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="py-2">
                <h1 className="text-2xl font-bold mb-2 text-blueNavy dark:text-yellow-400">
                    New
                </h1>
                {width <= 768 ? (
                    <Splide
                        options={{
                            type: "loop",
                            drag: "free",
                            focus: "center",
                            arrows: false,
                            pagination: false,
                            perPage: 2,
                        }}
                    >
                        {posts.map((post) => {
                            return (
                                <>
                                    <SplideSlide key={post.id}>
                                    <div className="flex flex-col w-full h-full">
                                        <a href="" className="w-full h-full">
                                            <img
                                                className="px-2 md:px-4 object-cover w-full h-full relative"
                                                src={
                                                    "images/content/albums/" +
                                                    post.album_art
                                                }
                                                alt={post.album_title}
                                            />
                                        </a>
                                        <div className="px-4 flex flex-col -space-y-1">
                                            <span className="font-robotocondensed">
                                                {post.album_title}
                                            </span>
                                            <span className="font-sofiacondensed text-xs">
                                                by: {post.album_artist_name}
                                            </span>
                                        </div>
                                    </div>
                                </SplideSlide>
                                </>
                            );
                        })}
                    </Splide>
                ) : (
                    <Splide
                        options={{
                            type: "loop",
                            drag: "free",
                            focus: "center",
                            arrows: false,
                            pagination: false,
                            perPage: 4,
                        }}
                    >
                        {posts.map((post) => {
                            return (
                                <SplideSlide key={post.id}>
                                    <div className="flex flex-col w-full h-full">
                                        <a href="" className="w-full h-full">
                                            <img
                                                className="px-2 md:px-4 object-cover w-full h-full relative"
                                                src={
                                                    "images/content/albums/" +
                                                    post.album_art
                                                }
                                                alt={post.album_title}
                                            />
                                        </a>
                                        <div className="px-4 flex flex-col -space-y-1">
                                            <span className="font-robotocondensed">
                                                {post.album_title}
                                            </span>
                                            <span className="font-sofiacondensed text-xs">
                                                by: {post.album_artist_name}
                                            </span>
                                        </div>
                                    </div>
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                )}
            </div>
        </div>
    );
}
