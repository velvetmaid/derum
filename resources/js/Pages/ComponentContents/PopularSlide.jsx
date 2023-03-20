import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/../css/main.css";

export default function PopularSlide() {
    return (
        <div className="max-w-7xl mx-auto  h-auto px-6">
            <div className="py-2">
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
                    <SplideSlide>
                        <img
                            className="px-2 md:px-4"
                            src="https://www.revolvermag.com/sites/default/files/styles/original_image__844px_x_473px_/public/media/section-media/np_scum.jpg?itok=kPKsGiSd&timestamp=1502731429"
                            alt="Image 1"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            className="px-2 md:px-4"
                            src="https://www.revolvermag.com/sites/default/files/styles/original_image__844px_x_473px_/public/media/section-media/np_scum.jpg?itok=kPKsGiSd&timestamp=1502731429"
                            alt="Image 2"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            className="px-2 md:px-4"
                            src="https://www.revolvermag.com/sites/default/files/styles/original_image__844px_x_473px_/public/media/section-media/np_scum.jpg?itok=kPKsGiSd&timestamp=1502731429"
                            alt="Image 2"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            className="px-2 md:px-4"
                            src="https://www.revolvermag.com/sites/default/files/styles/original_image__844px_x_473px_/public/media/section-media/np_scum.jpg?itok=kPKsGiSd&timestamp=1502731429"
                            alt="Image 2"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            className="px-2 md:px-4"
                            src="https://www.revolvermag.com/sites/default/files/styles/original_image__844px_x_473px_/public/media/section-media/np_scum.jpg?itok=kPKsGiSd&timestamp=1502731429"
                            alt="Image 2"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            className="px-2 md:px-4"
                            src="https://www.revolvermag.com/sites/default/files/styles/original_image__844px_x_473px_/public/media/section-media/np_scum.jpg?itok=kPKsGiSd&timestamp=1502731429"
                            alt="Image 2"
                        />
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
}
