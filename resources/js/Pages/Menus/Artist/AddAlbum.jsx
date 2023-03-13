import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FormAddAlbum from "./FormAddAlbum";
import "@/../css/main.css";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Artist Dashboard
                </h2>
            }
        >
            <Head title={props.auth.user.name + " Dashboard"} />

            <div className="px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 mb-5 flex flex-col md:flex-row overflow-hidden">
                        <div className="sm:max-w-lg w-full p-2 md:p-8 bg-white rounded-xl z-10 mx-auto">
                            <div className="flex w-full md:w-max h-[4rem] border-2 rounded-md mx-auto">
                                <div className="relative w-[4rem] h-full  p-1">
                                    <img
                                        className="absolute -z-50 w-8 top-[25%] left-[19%] md:left-[25%] opacity-20"
                                        src="https://cdn-icons-png.flaticon.com/512/739/739249.png"
                                        alt="Before Preview"
                                    />
                                    <img
                                        className="object-cover w-[4rem] h-full z-50 rounded-md"
                                        // {coverArtPreview}
                                        // {coverArtPreview}
                                    />
                                </div>
                                <div className="relative md:w-56 w-full over overflow-hidden">
                                    <p className="pl-1 text-xl">
                                        {/* {data.album_title} */}
                                    </p>
                                    <span className="pl-1 absolute bottom-5 text-xs">
                                        by:
                                        {/* value={handleChange} */}
                                    </span>
                                    <span className="pl-1 text-xs text-gray-500 absolute md:block bottom-1">
                                        Relase date:
                                        {/* {data.album_art} */}
                                    </span>
                                </div>
                            </div>
                            <p className="text-center text-gray-500">
                                Price: Rp.
                                {/* value={handleChange} */}
                            </p>
                        </div>
                        <div className="sm:max-w-lg w-full bg-white rounded-xl z-10 mx-auto">
                            <div className="text-center">
                                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                                    Upload Album
                                </h2>
                                <p className="mt-2 text-sm text-gray-400">
                                    Lorem ipsum is placeholder text.
                                </p>
                            </div>

                            <FormAddAlbum />

                            {/* FORM */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
