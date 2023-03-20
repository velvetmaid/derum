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
                                <SplideSlide key={post.id} className="">
                                    <img
                                        className="px-2 md:px-4 object-cover w-full h-full"
                                        src={
                                            "images/content/albums/" +
                                            post.album_art
                                        }
                                        alt={post.album_title}
                                    />
                                </SplideSlide>
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
                                <SplideSlide key={post.id} className="">
                                    <img
                                        className="px-2 md:px-4 object-cover w-full h-full"
                                        src={
                                            "images/content/albums/" +
                                            post.album_art
                                        }
                                        alt={post.album_title}
                                    />
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                )}
            </div>
        </div>
    );
}
