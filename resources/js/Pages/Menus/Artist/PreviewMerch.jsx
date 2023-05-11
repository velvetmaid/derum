import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function PreviewMerch({ data }) {
    console.log(data);
    return (
        <div className="sm:max-w-lg w-full p-2 md:p-8 bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
            {data.merch_title !== "" ||
            data.merch_price !== "" ||
            data.merch_description !== "" ||
            data.merch_image !== null ? (
                <>
                    <div className="flex flex-col gap-2">
                        <Splide
                            options={{
                                gap: "1rem",
                                rewind: true,
                                autoplay: true,
                                interval: 4000,
                                speed: 2000,
                                arrows: false,
                                drag: false,
                                pagination: false,
                                autoHeight: false,
                            }}
                            aria-label={data.merch_title}
                        >
                            {data.merch_image &&
                                data.merch_image
                                    .slice(0, 3)
                                    .map((post, index) => (
                                        <SplideSlide
                                            key={index}
                                            className="aspect-square rounded-lg overflow-hidden"
                                        >
                                            <img
                                                className="w-full h-full object-cover"
                                                src={
                                                    post instanceof File
                                                        ? URL.createObjectURL(
                                                              post
                                                          )
                                                        : "/images/merches/thumbnails/thumb_" +
                                                          post
                                                }
                                                alt={
                                                    post
                                                        ? "Art " +
                                                          data.merch_title
                                                        : null
                                                }
                                            />
                                        </SplideSlide>
                                    ))}
                        </Splide>
                        {data.merch_image && data.merch_image.length >= 4 ? (
                            <Splide
                                options={{
                                    autoplay: true,
                                    interval: 2500,
                                    speed: 5000,
                                    gap: ".5rem",
                                    type: "loop",
                                    perPage: 4,
                                    arrows: false,
                                    pagination: false,
                                    fixedHeight: "4rem",
                                }}
                                aria-label={data.merch_title}
                            >
                                {data.merch_image.map((post, index) => (
                                    <SplideSlide
                                        className="rounded-md overflow-hidden"
                                        key={index}
                                    >
                                        <img
                                            className="object-cover w-full h-full"
                                            src={
                                                post instanceof File
                                                    ? URL.createObjectURL(post)
                                                    : "/images/merches/thumbnails/thumb_" +
                                                      post
                                            }
                                            alt={
                                                post
                                                    ? "Art " + data.merch_title
                                                    : null
                                            }
                                        />
                                    </SplideSlide>
                                ))}
                            </Splide>
                        ) : null}
                    </div>
                    <div className="overflow-hidden">
                        {data.merch_title !== "" ||
                        data.merch_description !== "" ||
                        data.merch_image !== null ? (
                            <div>
                                <p className="text-xl">{data.merch_title}</p>
                                <span className="text-lg bottom-[2px]">
                                    {data.merch_price > 500 &&
                                        Number(data.merch_price).toLocaleString(
                                            "id-ID",
                                            {
                                                style: "currency",
                                                currency: "IDR",
                                            }
                                        )}
                                </span>
                                <p>{data.merch_description}</p>
                            </div>
                        ) : null}
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blueNavy-dark dark:border-gray-300"></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
