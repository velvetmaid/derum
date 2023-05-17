import { useState } from "react";
import { Link } from "@inertiajs/react";
import AllMerchModal from "./AllMerchModal";
import Modal from "@/Components/Modal";

export default function Merch(props) {
    const [showModalMerch, setShowModalMerch] = useState(false);

    const handleCloseModalMerch = () => {
        setShowModalMerch(false);
    };
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Your Merch</h2>
            {props.merches.length > 0 ? (
                <div className="flex flex-wrap gap-4 pb-12 md:p-0">
                    {props.merches.slice(0, 11).map((post) => (
                        <div
                            key={post.id}
                            className="flex-[1_0_21%] overflow-hidden rounded-lg"
                        >
                            <Link
                                href={route("edit-merch", {
                                    id: post.id,
                                })}
                            >
                                <img
                                    className="hover:scale-105 ease-in duration-200 w-full"
                                    src={
                                        "/images/merches/thumbnails/thumb_" +
                                        JSON.parse(post.merch_image)[0]
                                    }
                                    alt={post.merch_title}
                                    title={post.merch_title}
                                />
                            </Link>
                        </div>
                    ))}
                    {props.merches.length >= 12 && (
                        <div
                            className="flex-[1_0_21%] text-gray-300 font-semibold text-center text-xs md:text-lg rounded-lg cursor-pointer overflow-hidden"
                            type="button"
                            onClick={() => setShowModalMerch(true)}
                        >
                            <span className="w-full h-full flex items-center justify-center bg-gray-800 hover:scale-105 duration-300">
                                Read More
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center">
                        You haven't posted a merch yet.
                </div>
            )}
            <Modal show={showModalMerch} onClose={handleCloseModalMerch}>
                <AllMerchModal
                    merches={props.merches}
                    showModalMerch={showModalMerch}
                    setShowModalMerch={setShowModalMerch}
                />
            </Modal>
        </>
    );
}
