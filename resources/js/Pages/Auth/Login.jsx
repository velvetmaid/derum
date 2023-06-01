import { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import "@/../css/main.css";

export default function Login({ status, canResetPassword, setShowModalLogin }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
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

        post(route("login"));
    };

    return (
        <AuthLayout>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <h1 className="text-center text-3xl">Sign In</h1>
            <form className="px-20 space-y-10" onSubmit={submit}>
                <div className="relative">
                    <input
                        id="email"
                        name="email"
                        value={data.email}
                        placeholder=" "
                        isFocused={true}
                        onChange={handleOnChange}
                        className="peer h-full w-full border-t-0 border-l-0 border-r-0 border border-gray-300 dark:border-gray-400 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-700 dark:after:border-gray-200 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 dark:peer-focus:text-gray-200 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 dark:peer-focus:after:border-gray-200 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email
                    </label>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="relative">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder=" "
                        onChange={handleOnChange}
                        className="peer h-full w-full border-t-0 border-l-0 border-r-0 border border-gray-300 dark:border-gray-400 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-700 dark:after:border-gray-200 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-700 dark:peer-focus:text-gray-200 peer-focus:after:scale-x-100 peer-focus:after:border-gray-700 dark:peer-focus:after:border-gray-200 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                    </label>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                onChange={handleOnChange}
                            />
                            <span className="ml-2 text-sm">Remember me</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* {canResetPassword && ( */}
                        <Link
                            href={route("password.request")}
                            className="cursor-pointer underline text-sm hover:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                        {/* )} */}
                        <PrimaryButton
                            className="ml-4"
                            type="button"
                            onClick={() => setShowModalLogin(false)}
                        >
                            Back
                        </PrimaryButton>
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
