export default function FormFeedback({ progress, errors }) {
    return (
        <>
            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}
            <span className="text-rose-500 text-xs">
                {errors.album_title ||
                    (errors.merch_title && "Please enter title.") ||
                    (errors.merch_category && "Please choose category.") ||
                    (errors.album_release_date &&
                        "Please enter release date.") ||
                    errors.album_art ||
                    (errors.merch_image &&
                        "Please enter image. Make sure that the file size is not greater than 2048 kB and file must be an image format (jpg, jpeg, png, svg).") ||
                    (errors.album_artist_name && "Please enter artist name.") ||
                    errors.album_price ||
                    (errors.merch_price && "Please enter price.")}
            </span>
        </>
    );
}
