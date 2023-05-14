import { Head, router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import Layout from "@/Layouts/Layout";
import FormFeedback from "./Resources/FormFeedback";
import PreviewMerch from "./PreviewMerch";
import "@/../css/main.css";
import { useState } from "react";

export default function EditAlbum(props) {
    const { data, setData, errors, progress } = useForm({
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
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="sr-only peer"
                                            onClick={handleToggle}
                                            defaultChecked={toggleValue === 1}
                                        />
                                        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-turquoise dark:peer-checked:bg-blue-900" />
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {data.merch_exists === 1
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>
                                    </label>

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
        </>
    );
}
