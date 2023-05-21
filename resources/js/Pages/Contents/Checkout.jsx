import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Checkout(props) {
    console.log(props.data);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        props.setData({ ...props.data, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();

        props.post(route("checkout"));

        props.setShowModalPay(false);
    };
    return (
        <AuthLayout>
            <h1 className="text-3xl text-center">Checkout</h1>
            <form onSubmit={submit} className="w-full">
                <div className="flex flex-col md:flex-row gap-4 relative">
                    <div className="mt-4 w-full rounded-lg overflow-hidden">
                        <img
                            className="object-cover w-full h-full"
                            src={
                                "/images/albums/main/" +
                                props.data.order_product_image
                            }
                            alt={props.data.order_product_name}
                        />
                    </div>

                    <div className="w-full">
                        <div className="mt-4">
                            <InputLabel htmlFor="order_name" value="Name" />

                            <TextInput
                                id="order_name"
                                type="order_name"
                                name="order_name"
                                disabled
                                value={props.data.order_name}
                                className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
                                autoComplete="username"
                                isFocused={true}
                                onChange={handleInputChange}
                            />

                            <InputError
                                message={props.errors.order_name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="order_product_name"
                                value="Product Name"
                            />

                            <TextInput
                                id="order_product_name"
                                type="order_product_name"
                                name="order_product_name"
                                disabled
                                value={props.data.order_product_name}
                                className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
                                autoComplete="username"
                                isFocused={true}
                                onChange={handleInputChange}
                            />

                            <InputError
                                message={props.errors.order_product_name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="order_type" value="Type" />

                            <TextInput
                                id="order_type"
                                type="order_type"
                                name="order_type"
                                disabled
                                value={props.data.order_type}
                                className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
                                autoComplete="username"
                                isFocused={true}
                                onChange={handleInputChange}
                            />

                            <InputError
                                message={props.errors.order_type}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="order_price" value="Price" />

                            <input
                                id="order_price"
                                type="order_price"
                                name="order_price"
                                disabled
                                value={props.data.order_price}
                                className="hidden"
                                autoComplete="current-order_price"
                                onChange={handleInputChange}
                            />
                            <div className="mt-1 p-2 rounded-lg w-full dark:bg-[#1f2937]">
                                Rp.{" "}
                                {props.data.order_price.toLocaleString("id-ID")}
                            </div>

                            <InputError
                                message={props.errors.order_price}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton
                        className="ml-4"
                        type="button"
                        onClick={() => props.setShowModalPay(false)}
                    >
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton className="ml-4">Pay</PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
