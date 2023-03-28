import PreviewMusic from "./PreviewMusic";

export default function PreviewAll({ data, setData, setLastIndex }) {
    return (
        <div className="sm:max-w-lg w-full p-2 md:p-8 bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
            <div className="flex w-full md:w-max h-[4rem] border-2 rounded-md mx-auto">
                <div className="relative w-[4rem] h-full p-1">
                    <img
                        className="object-cover w-[4rem] h-full z-50 rounded-md"
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
                <div className="relative md:w-56 w-full over overflow-hidden">
                    <p className="pl-1 text-xl">{data.album_title}</p>
                    <span className="pl-1 absolute bottom-5 text-xs">
                        by:
                        {data.album_artist_name}
                    </span>
                    <span className="pl-1 text-xs absolute md:block bottom-1">
                        Relase date:
                        {data.album_release_date}
                    </span>
                </div>
            </div>
            <p className="text-center">
                Price: Rp.
                {data.album_price}
            </p>
            <PreviewMusic
                data={data}
                setData={setData}
                setLastIndex={setLastIndex}
            />
        </div>
    );
}
