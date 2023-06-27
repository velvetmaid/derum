import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Register({ setShowModalLogin, setShowModalRegister }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <AuthLayout>
            <form className="px-20" onSubmit={submit}>
                <h1 className="text-center text-3xl">Sign Up</h1>

                <div className="relative mt-4">
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        placeholder=" "
                        required
                        autoComplete=" "
                        className="peer h-full w-full border-t-0 border-l-0 border-r-0 border border-gray-300 dark:border-gray-400 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-700 dark:after:border-gray-200 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 dark:peer-focus:text-gray-200 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 dark:peer-focus:after:border-gray-200 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Name
                    </label>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="relative mt-4">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        placeholder=" "
                        required
                        className="peer h-full w-full border-t-0 border-l-0 border-r-0 border border-gray-300 dark:border-gray-400 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-700 dark:after:border-gray-200 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 dark:peer-focus:text-gray-200 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 dark:peer-focus:after:border-gray-200 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email
                    </label>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />
                    <select
                        name="role"
                        id="role"
                        className="peer dark:bg-gray-900 h-full w-full border-t-0 border-l-0 border-r-0 border border-gray-300 dark:border-gray-400 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-none focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        onChange={handleOnChange}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select an option
                        </option>
                        <option value="fan">Fan</option>
                        <option value="artist">Artist</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="relative mt-4">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        placeholder=" "
                        required
                        className="peer h-full w-full border-t-0 border-l-0 border-r-0 border border-gray-300 dark:border-gray-400 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-700 dark:after:border-gray-200 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 dark:peer-focus:text-gray-200 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 dark:peer-focus:after:border-gray-200 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                    </label>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="relative mt-4">
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        placeholder=" "
                        required
                        className="peer h-full w-full border-t-0 border-l-0 border-r-0 border border-gray-300 dark:border-gray-400 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-700 dark:after:border-gray-200 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 dark:peer-focus:text-gray-200 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 dark:peer-focus:after:border-gray-200 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Confirm Password
                    </label>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <span
                        className="cursor-pointer underline text-sm hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="button"
                        onClick={() => {
                            setShowModalLogin(true);
                            setShowModalRegister(false);
                        }}
                    >
                        Already registered? <span className="font-black">Sign In</span>
                    </span>
                    <PrimaryButton
                        className="ml-4"
                        type="button"
                        onClick={() => setShowModalRegister(false)}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
