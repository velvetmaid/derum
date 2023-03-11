import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

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
                    <div className="bg-white rounded-3xl p-8 mb-5">
                        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto">
                            <div className="text-center">
                                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                                    Upload Album
                                </h2>
                                <p className="mt-2 text-sm text-gray-400">
                                    Lorem ipsum is placeholder text.
                                </p>
                            </div>
                            <form
                                className="mt-8 space-y-3"
                                action="#"
                                method="POST"
                            >
                                <div className="grid grid-cols-1 space-y-2">
                                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                                        Album Title
                                    </label>
                                    <input
                                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        type=""
                                        placeholder="Your Album Title"
                                    />
                                </div>
                                <div className="grid grid-cols-1 space-y-2">
                                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                                        Attach Document
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                            <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                <p className="pointer-none text-gray-500 ">
                                                    <span className="text-sm">
                                                        Drag and drop
                                                    </span>
                                                    files here <br /> or
                                                    <a
                                                        href=""
                                                        id=""
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {" select a file "}
                                                    </a>
                                                    from your computer
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300">
                                    <span>File type: mp3</span>
                                </p>
                                <div>
                                    <button
                                        type="submit"
                                        className="my-5 w-full flex justify-center bg-[#04ddb4] text-[#0d2758] p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-[#00b896] shadow-lg cursor-pointer transition ease-in duration-200"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
