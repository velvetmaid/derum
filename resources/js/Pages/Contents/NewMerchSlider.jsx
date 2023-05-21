import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@inertiajs/react";
import "@splidejs/react-splide/css";
import "@/../css/main.css";

export default function NewMerchSlider({ props }) {
    return (
        <div className="p-6 my-6 space-y-6 rounded-xl bg-white dark:bg-blueNavy-dark">
            <h1 className="text-2xl font-bold mb-2 text-blueNavy dark:text-yellow-400">
                New Arrival Merchandise Collection
            </h1>
            <Splide
                options={{
                    autoplay: true,
                    rewind: true,
                    interval: 3500,
                    speed: 3500,
                    type: "slide",
                    focus: "center",
                    arrows: false,
                    pagination: false,
                    perMove: 1,
                    perPage: 2,
                    gap: "1rem",
                    mediaQuery: "min",
                    breakpoints: {
                        1024: {
                            perPage: 4,
                            perMove: 2,
                            interval: 5500,
                            speed: 5500,
                        },
                    },
                }}
            >
                {props
                    .reverse()
                    .filter((item) => item.merch_exists === 1)
                    .slice(0, 10)
                    .map((post) => (
                        <SplideSlide className="hover:opacity-75" key={post.id}>
                            <Link
                                href={route("merch-info", {
                                    id: post.id,
                                })}
                            >
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        className="object-cover object-center h-full w-full"
                                        src={
                                            "/images/merches/thumbnails/thumb_" +
                                            JSON.parse(post.merch_image)[0]
                                        }
                                        alt={post.merch_title}
                                    />
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            {post.merch_title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {post.merch_category}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium">
                                        {post.merch_price >= 1000
                                            ? (
                                                  post.merch_price / 1000
                                              ).toLocaleString("id-ID", {
                                                  minimumFractionDigits: 0,
                                              }) + "K"
                                            : post.merch_price.toLocaleString(
                                                  "id-ID",
                                                  {
                                                      style: "currency",
                                                      currency: "IDR",
                                                      minimumFractionDigits: 0,
                                                  }
                                              )}
                                    </p>
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
            </Splide>
        </div>
    );
}
