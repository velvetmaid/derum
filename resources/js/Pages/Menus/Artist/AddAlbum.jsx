import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard(props) {
    const [text, setText] = useState(null);
    const onChangeText = (event) => {
        event.preventDefault();
        setText(event.target.value);
    };
    const [date, setDate] = useState(null);
    const onChangeDate = (event) => {
        event.preventDefault();
        setDate(event.target.value);
    };
    const [picture, setPicture] = useState(null);
    const [imgPreview, setimgPreview] = useState(null);
    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setimgPreview(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
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
                    <div className="bg-white rounded-3xl p-8 mb-5 flex flex-col md:flex-row">
                        <div className="sm:max-w-lg w-auto p-10 bg-white rounded-xl z-10 mx-auto">
                            <div className="flex w-auto h-[4rem] overflow-hidden border">
                                <div className="w-[4rem] h-full">
                                    <img className="object-cover w-full h-full" src={imgPreview} />
                                </div>
                                <div className="relative w-56 border-2 over">
                                    <p className="pl-1 pt-1 text-xl">
                                        {text}
                                    </p>
                                    <span className="pl-1 text-xs text-gray-500 absolute md:block bottom-1">
                                        Relase date: <a>{date}</a>
                                    </span>
                                </div>
                            </div>
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
                                        onChange={onChangeText}
                                    />
                                </div>
                                <div className="grid grid-cols-1 space-y-2">
                                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                                        Release Date
                                    </label>
                                    <input
                                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        type="date"
                                        placeholder="Your Album Title"
                                        onChange={onChangeDate}
                                    />
                                </div>
                                <div className="grid grid-cols-1 space-y-2">
                                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                                        Album Art
                                    </label>
                                    <input
                                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-gray-200 bg-clip-padding py-[0.32rem] px-3 text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-turquoise file:px-3 file:py-[0.32rem] file:text-blueNavy file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-green-300 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                                        id=""
                                        type="file"
                                        onChange={onChangePicture}
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
                                        className="my-5 w-full flex justify-center bg-turquoise text-blueNavy p-4  rounded-full tracking-wide
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
