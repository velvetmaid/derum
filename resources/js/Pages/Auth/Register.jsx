import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

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
            <form onSubmit={submit}>
            <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full dark:bg-[#1f2937]"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full dark:bg-[#1f2937]"
                        autoComplete="username"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />
                    <select
                        name="role"
                        id="role"
                        className="mt-1 block w-full dark:bg-[#1f2937] rounded-md"
                        onChange={handleOnChange}
                    >
                        <option selected disabled>
                            Please select
                        </option>
                        <option value="fan">Fan</option>
                        <option value="artist">Artist</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full dark:bg-[#1f2937]"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full dark:bg-[#1f2937]"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />
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
                        Already registered?
                    </span>
                    <PrimaryButton
                        className="ml-4"
                        type="button"
                        onClick={() => setShowModalRegister(false)}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Sign Up
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
