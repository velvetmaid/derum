import PreviewMusic from "./PreviewMusic";

export default function PreviewAll({ data, setData, setLastIndex }) {
    return (
        <div className="sm:max-w-lg w-full p-2 md:p-8 bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
            <div className="flex w-full h-[5rem] rounded-md">
                <div className="relative aspect-square p-1">
                    <img
                        className="object-cover w-full h-full z-50"
                        src={
                            data.album_art
                                ? URL.createObjectURL(data.album_art)
                                : null
                        }
                        alt={
                            data.album_art
                                ? "Cover Art " + data.album_title
                                : null
                        }
                    />
                </div>
                <div className="pl-1 relative md:w-56 w-full over overflow-hidden">
                    <p className="text-xl">{data.album_title}</p>
                    <span className="absolute bottom-8 text-xs">
                        by:
                        {data.album_artist_name}
                    </span>
                    <span className="text-xs absolute md:block bottom-[1rem]">
                        Relase date:
                        {data.album_release_date}
                    </span>
                    <span className="text-xs absolute bottom-[2px]">
                        {data.album_price == 0
                            ? "Free"
                            : `Rp. ${data.album_price}`}
                    </span>
                </div>
            </div>

            <PreviewMusic
                data={data}
                setData={setData}
                setLastIndex={setLastIndex}
            />
        </div>
    );
}
