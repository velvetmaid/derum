import { useEffect, useState } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PauseIcon,
    PlayIcon,
} from "@heroicons/react/solid";
import ReactPaginate from "react-paginate";
import { Link } from "@inertiajs/react";

export default function AlbumGroup({ props, searchRes }) {
    const [audio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongId, setCurrentSongId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);

    const handlePlay = (song) => {
        const soundUrl =
            "musics/" + song.album_title + "/" + song.artist_song[0].song_file;
        audio.pause();
        audio.src = soundUrl;
        audio.play();
        setIsPlaying(true);
        setCurrentSongId(song.id);
    };

    const handlePause = () => {
        audio.pause();
        setIsPlaying(false);
        setCurrentSongId(null);
    };

    const getPlayButtonClass = (song) => {
        if (currentSongId === song.id) {
            return isPlaying
                ? "opacity-0 pointer-events-none"
                : "opacity-100 pointer-events-auto";
        } else {
            return "opacity-100 pointer-events-auto";
        }
    };

    const getPauseButtonClass = (song) => {
        if (currentSongId === song.id) {
            return isPlaying
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none";
        } else {
            return "opacity-0 pointer-events-none";
        }
    };

    const pageSize = 8;
    const totalItems = searchRes.length > 0 ? searchRes.length : props.length;
    const pageCount = Math.ceil(totalItems / pageSize);
    const data =
        searchRes.length > 0
            ? searchRes.slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
              )
            : props.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const handlePageChange = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    let handleBeforeUnload;

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            audio.pause();
        };
    }, []);

    return (
        <>
            <div className="flex flex-wrap mx-auto p-6 bg-white dark:bg-blueNavy-dark rounded-xl">
                {searchRes.length === 0
                    ? data.map((album) => (
                          <div
                              className="flex-2 w-2/5 md:w-[25%] mx-auto px-0 md:px-2 my-6"
                              key={album.id}
                          >
                              <div className="mx-auto relative">
                                  <img
                                      className="w-full h-full"
                                      src={
                                          "/images/albums/thumbnails/thumb_" +
                                          album.album_art
                                      }
                                      alt={album.album_title}
                                  />
                                  {album.artist_song.length > 0 && (
                                      <Link
                                          href={route("albumInfo", {
                                              id: album.id,
                                          })}
                                      >
                                          <div className="cursor-pointer absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-gray-100">
                                              <PlayIcon
                                                  className={`z-50 w-16 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPlayButtonClass(
                                                      album
                                                  )}`}
                                                  onClick={(event) => {
                                                      event.preventDefault();
                                                      handlePlay(album);
                                                  }}
                                              />
                                              <PauseIcon
                                                  className={`z-50 w-16 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPauseButtonClass(
                                                      album
                                                  )}`}
                                                  onClick={(event) => {
                                                      event.preventDefault();
                                                      handlePause();
                                                  }}
                                              />
                                          </div>
                                      </Link>
                                  )}
                              </div>
                              <div className="flex flex-col">
                                  <Link
                                      className="truncate"
                                      href={route("albumInfo", {
                                          id: album.id,
                                      })}
                                  >
                                      {album.album_title}
                                  </Link>
                                  <Link
                                      className="truncate text-gray-600"
                                      href={route("albumInfo", {
                                          id: album.id,
                                      })}
                                  >
                                      {album.album_artist_name}
                                  </Link>
                              </div>
                          </div>
                      ))
                    : data.map((album) => (
                          <div
                              className="flex-2 w-2/5 md:w-[25%] mx-auto px-0 md:px-2 my-6"
                              key={album.id}
                          >
                              <div className="mx-auto relative">
                                  <img
                                      className="w-full h-full"
                                      src={
                                          "/images/albums/thumbnails/thumb_" +
                                          album.album_art
                                      }
                                      alt={album.album_title}
                                  />

                                  <Link
                                      href={route("albumInfo", {
                                          id: album.id,
                                      })}
                                  >
                                      <div className="cursor-pointer absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-gray-100">
                                          <PlayIcon
                                              className={`z-50 w-16 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPlayButtonClass(
                                                  album
                                              )}`}
                                              onClick={(event) => {
                                                  event.preventDefault();
                                                  handlePlay(album);
                                              }}
                                          />
                                          <PauseIcon
                                              className={`z-50 w-16 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getPauseButtonClass(
                                                  album
                                              )}`}
                                              onClick={(event) => {
                                                  event.preventDefault();
                                                  handlePause();
                                              }}
                                          />
                                      </div>
                                  </Link>
                              </div>
                              <div className="flex flex-col">
                                  <Link
                                      className="truncate"
                                      href={route("albumInfo", {
                                          id: album.id,
                                      })}
                                  >
                                      {album.album_title}
                                  </Link>
                                  <Link
                                      className="truncate text-gray-600"
                                      href={route("albumInfo", {
                                          id: album.id,
                                      })}
                                  >
                                      {album.album_artist_name}
                                  </Link>
                              </div>
                          </div>
                      ))}
            </div>
            {width <= 768 ? (
                <ReactPaginate
                    className="flex items-center justify-center space-x-2 bg-white dark:bg-blueNavy-dark my-4 rounded-lg"
                    previousLabel={<ChevronLeftIcon className="w-10 h-10" />}
                    nextLabel={<ChevronRightIcon className="w-10 h-10" />}
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={-1}
                    onPageChange={handlePageChange}
                    activeClassName={"bg-white bg-opacity-50 rounded-full"}
                    breakLabel={"..."}
                    pageLinkClassName={
                        "w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-25 ease-in-out duration-150"
                    }
                />
            ) : (
                <ReactPaginate
                    className="flex items-center justify-center space-x-6 bg-white dark:bg-blueNavy-dark my-4 rounded-lg"
                    previousLabel={
                        <ChevronLeftIcon className="w-16 h-16 hover:scale-110" />
                    }
                    nextLabel={
                        <ChevronRightIcon className="w-16 h-16 hover:scale-110" />
                    }
                    pageCount={pageCount}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    activeClassName={"bg-white bg-opacity-50 rounded-full"}
                    breakLabel={"..."}
                    pageLinkClassName={
                        "w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-25 ease-in-out duration-150"
                    }
                />
            )}
        </>
    );
}
