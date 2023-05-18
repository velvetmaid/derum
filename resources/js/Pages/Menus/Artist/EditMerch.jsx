import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Layout from "@/Layouts/Layout";
import FormFeedback from "./Resources/FormFeedback";
import PreviewMerch from "./PreviewMerch";
import "@/../css/main.css";
import Modal from "@/Components/Modal";

export default function EditAlbum(props) {
    const {
        data,
        setData,
        errors,
        progress,
        delete: destroy,
    } = useForm({
        merch_title: props.merches.merch_title || "",
        merch_category: props.merches.merch_category || "",
        merch_image: props.merches.merch_image || null,
        merch_description: props.merches.merch_description || "",
        merch_price: props.merches.merch_price,
        merch_exists: props.merches.merch_exists,
    });

    const [toggleValue, setToggleValue] = useState(data.merch_exists);

    const handleToggle = () => {
        const newValue = toggleValue === 0 ? 1 : 0;
        setToggleValue(newValue);
        setData((prevData) => ({
            ...prevData,
            merch_exists: newValue,
        }));
    };
    console.log(data.merch_exists);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        setData({ ...data, merch_image: files });
    };

    function submit(e) {
        e.preventDefault();

        router.post(
            `update/${props.merches.id}`,

            {
                forceFormData: true,
                data,
                _method: "put",
            }
        );

        const hasErrors =
            !data.merch_title ||
            !data.merch_image ||
            !data.merch_category ||
            data.merch_price < 500;

        if (hasErrors) {
            toast.error(
                "There must be something wrong, please recheck that pal!",
                {
                    position: toast.POSITION.TOP_LEFT,
                    className: "w-5/6 md:w-full dark:bg-gray-800",
                }
            );
            return;
        } else {
            toast.success("Form submitted successfully", {
                position: toast.POSITION.TOP_LEFT,
                className: "w-5/6 md:w-full dark:bg-gray-800",
            });
        }
    }

    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    };

    const handleConfirmDelete = async () => {
        await destroy(
            route("delete-merch", {
                id: props.merches.id,
            })
        );
        handleCloseModalDelete();
        toast.success("You have successfully deleted the merch", {
            position: toast.POSITION.TOP_LEFT,
            className: "w-5/6 md:w-full dark:bg-gray-800",
        });
    };

    return (
        <>
            <Layout>
                <Head title={props.merches.merch_title} />
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-blueNavy-dark rounded-3xl p-8 mb-5 flex flex-col md:flex-row overflow-hidden">
                            <PreviewMerch
                                posts={props.merches}
                                data={data}
                                setData={setData}
                            />
                            <div className="sm:max-w-lg w-full bg-white dark:bg-blueNavy-dark rounded-xl z-10 mx-auto">
                                <div className="text-center">
                                    <h2 className="mt-5 text-3xl font-bold">
                                        Update Merch
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-400">
                                        Lorem ipsum is placeholder text.
                                    </p>
                                </div>
                                <form
                                    className="mt-8 space-y-3"
                                    name="createForm"
                                    onSubmit={submit}
                                    encType="multipart/form-data"
                                >
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold tracking-wide">
                                            Merch Title
                                        </label>
                                        <input
                                            id="merch_title"
                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                            type="text"
                                            name="merch_title"
                                            value={data.merch_title}
                                            placeholder="Your Album Title"
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-1">
                                        <div className="grid grid-cols-1 space-y-2 md:w-1/2">
                                            <label className="text-sm font-bold tracking-wide">
                                                Merch Category
                                            </label>
                                            <select
                                                id="merch_category"
                                                className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                                name="merch_category"
                                                value={data.merch_category}
                                                onChange={handleInputChange}
                                            >
                                                <option disabled value="">
                                                    Select Category
                                                </option>
                                                <option value="Accessories">
                                                    Accessories
                                                </option>
                                                <option value="Apparel">
                                                    Clothing Line
                                                </option>
                                                <option value="Physical Media">
                                                    Physical Media
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-1 space-y-2 md:w-2/3">
                                            <label className="text-sm font-bold tracking-wide">
                                                Merch Image
                                            </label>
                                            <input
                                                id="merch_image"
                                                className="relative text-base block flex-auto cursor-pointer rounded-lg border border-solid border-gray-100 dark:border-none bg-clip-padding px-3 font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:cursor-pointer file:overflow-hidden file:rounded-md file:border-0 file:border-solid file:border-inherit file:bg-turquoise dark:file:bg-white file:px-3 file:p-2 file:text-blueNavy file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-green-300 focus:shadow-primary focus:outline-none"
                                                type="file"
                                                name="merch_image"
                                                multiple
                                                accept=".jpg, .jpeg, .png, .svg"
                                                value={undefined}
                                                onChange={handleFileInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold tracking-wide">
                                            Description
                                        </label>
                                        <textarea
                                            id="merch_description"
                                            className="text-base p-2 border border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:border-turquoise"
                                            type="text"
                                            name="merch_description"
                                            value={data.merch_description}
                                            placeholder="Your Artits Name"
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold tracking-wide">
                                            Price
                                        </label>
                                        <div className="flex border-gray-500 border rounded-lg">
                                            <p className="self-center pl-2">
                                                Rp.
                                            </p>
                                            <input
                                                id="merch_price"
                                                className="text-base w-full p-2 border-0 border-gray-500 dark:bg-blueNavy-dark rounded-lg focus:outline-none focus:shadow-none"
                                                type="number"
                                                name="merch_price"
                                                value={data.merch_price}
                                                placeholder="enter zero or more (e.g., 0, 10000"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                onClick={handleToggle}
                                                defaultChecked={
                                                    toggleValue === 1
                                                }
                                            />
                                            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-turquoise dark:peer-checked:bg-blue-900" />
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                {data.merch_exists === 1
                                                    ? "Available"
                                                    : "Unavailable"}
                                            </span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowModalDelete(true)
                                            }
                                            className="relative inline-block px-4 font-medium group"
                                        >
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-[5px] translate-y-[5px] bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                            <span className="relative text-blueNavy group-hover:text-white">
                                                Delete Merch
                                            </span>
                                        </button>
                                    </div>

                                    <div>
                                        <FormFeedback
                                            errors={errors}
                                            progress={progress}
                                        />
                                        <button
                                            type="submit"
                                            className="my-5 w-full flex justify-center bg-turquoise hover:bg-green-300 dark:bg-white dark:hover:bg-gray-300 text-blueNavy p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition duration-200"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Modal show={showModalDelete} onClose={handleCloseModalDelete}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        onClick={handleCloseModalDelete}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this merch?
                        </h3>
                        <button
                            type="button"
                            onClick={handleConfirmDelete}
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseModalDelete}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
