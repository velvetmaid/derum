export default function FormFeedback({ progress, errors }) {
    return (
        <>
            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}
            {(errors.album_title && (
                <span className="text-rose-500 text-xs">
                    Please enter album title.
                </span>
            )) ||
                (errors.album_release_date && (
                    <span className="text-rose-500 text-xs">
                        Please enter release date.
                    </span>
                )) ||
                (errors.album_art && (
                    <span className="text-rose-500 text-xs">
                        Please enter album art. Make sure that the file size is
                        not greater than 2048 kB and file must be an image
                        format (jpg, jpeg, png, svg).
                    </span>
                )) ||
                (errors.album_artist_name && (
                    <span className="text-rose-500 text-xs">
                        Please enter artist name.
                    </span>
                )) ||
                (errors.album_price && (
                    <span className="text-rose-500 text-xs">
                        Please enter price.
                    </span>
                ))}
        </>
    );
}
