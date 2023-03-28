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
                    Looks like you missed entering album title
                </span>
            )) ||
                (errors.album_release_date && (
                    <span className="text-rose-500 text-xs">
                        Looks like you missed entering release date
                    </span>
                )) ||
                (errors.album_art && (
                    <span className="text-rose-500 text-xs">
                        Looks like you missed entering album art or enter an
                        imag$validator = e not up to 1 Mb
                    </span>
                )) ||
                (errors.album_artist_name && (
                    <span className="text-rose-500 text-xs">
                        Looks like you missed entering artist name
                    </span>
                )) ||
                (errors.album_price && (
                    <span className="text-rose-500 text-xs">
                        "Oops! It looks like you forgot to enter the price.
                        Don't worry, it happens to the best of us. Just make
                        sure to enter a number so we can get this album rockin'
                        and rollin'!"
                    </span>
                ))}
            {errors.songs && errors.songs.length === 1 && (
                <span className="text-red-500 text-sm">
                    Please add at least one song.
                </span>
            )}
        </>
    );
}
