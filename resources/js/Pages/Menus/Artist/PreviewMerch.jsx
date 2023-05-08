export default function PreviewMerch({ data }) {
    return (
        <div className="sm:max-w-lg w-full p-2 md:p-8 bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
            <div className="flex w-full h-[5rem] rounded-md">
                <div className="relative aspect-square p-1">
                    <img
                        className="object-cover w-full h-full z-50"
                        src={
                            data.merch_image && Array.isArray(data.merch_image)
                                ? data.merch_image.length > 0 &&
                                  data.merch_image[0] instanceof File
                                    ? URL.createObjectURL(data.merch_image[0])
                                    : null
                                : data.merch_image
                                ? "/images/merches/thumbnails/thumb_" +
                                  data.merch_image
                                : null
                        }
                        alt={
                            data.merch_image
                                ? "Cover Art " + data.merch_title
                                : null
                        }
                    />
                </div>
                <div className="pl-1 relative md:w-56 w-full over overflow-hidden">
                    <p className="text-xl">{data.merch_title}</p>
                    <span className="absolute bottom-8 text-xs">
                        by:
                        {data.merch_title}
                    </span>
                    <span className="text-xs absolute md:block bottom-[1rem]">
                        Relase date:
                        {data.merch_title}
                    </span>
                    <span className="text-xs absolute bottom-[2px]">
                        {(data.merch_price === 0 || !data.merch_price) &&
                            "Free"}
                        {data.merch_price > 0 && `Rp. ${data.merch_price}`}
                    </span>
                </div>
            </div>
            <h1>Description</h1>
        </div>
    );
}
