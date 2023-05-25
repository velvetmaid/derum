import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Checkout(props) {
    console.log("checkout", props);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let totalPrice = "";

        if (name === "destination") {
            const selectedCityId = value;
            const selectedCity = props.cities.find(
                (city) => city.city_id === selectedCityId
            );
            selectedCityName = selectedCity ? selectedCity.city_name : "";
        }

        props.setData((prevData) => ({
            ...prevData,
            [name]: value,
            order_total_price: totalPrice,
        }));
    };

    console.log(props.data);

    const submit = (e) => {
        e.preventDefault();

        props.post(route("checkout"));
        props.setShowModalPay(false);
    };
    return (
        <AuthLayout>
            <h1 className="text-3xl text-center">Checkout</h1>
            <form onSubmit={submit} className="w-full">
                <div className="flex flex-col md:flex-row md:gap-4 relative">
                    {props.data.order_type == "Digital" ? (
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
                    ) : (
                        <div className="w-full">
                            <div className="mt-4">
                                <InputLabel htmlFor="order_name" value="Name" />

                                <TextInput
                                    id="order_name"
                                    name="order_name"
                                    disabled
                                    value={props.data.order_user_name}
                                    className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
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
                                    name="order_product_name"
                                    disabled
                                    value={props.data.order_product_name}
                                    className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
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
                                    name="order_type"
                                    disabled
                                    value={props.data.order_type}
                                    className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
                                    onChange={handleInputChange}
                                />

                                <InputError
                                    message={props.errors.order_type}
                                    className="mt-2"
                                />
                            </div>

                            <input
                                id="origin"
                                className="hidden"
                                name="origin"
                                value={props.data.origin}
                                onChange={handleInputChange}
                            />

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="destination"
                                    value="Destination"
                                />

                                <select
                                    name="destination"
                                    id="destination"
                                    value={props.data.destination}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full dark:bg-[#1f2937] rounded-lg border-none p-2"
                                >
                                    <option disabled value="">
                                        Choose Destination
                                    </option>
                                    {props.cities.map((city) => (
                                        <option
                                            key={city.city_id}
                                            value={city.city_id}
                                        >
                                            {city.city_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    <div className="w-full">
                        {props.data.order_type == "Digital" ? (
                            <>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="order_user_name"
                                        value="Name"
                                    />

                                    <TextInput
                                        id="order_user_name"
                                        name="order_user_name"
                                        disabled
                                        value={props.data.order_user_name}
                                        className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="order_product_name"
                                        value="Product Name"
                                    />

                                    <TextInput
                                        id="order_product_name"
                                        name="order_product_name"
                                        disabled
                                        value={props.data.order_product_name}
                                        className="mt-1 block w-full bg-white dark:bg-[#1f2937] border-none"
                                        onChange={handleInputChange}
                                    />

                                    <InputError
                                        message={
                                            props.errors.order_product_name
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mt-4 hidden">
                                    <TextInput
                                        type="number"
                                        name="weight"
                                        id="weight"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="order_address"
                                        value="Address"
                                    />

                                    <textarea
                                        rows={1}
                                        id="order_address"
                                        name="order_address"
                                        value={props.data.order_address}
                                        className="block w-full bg-white dark:bg-[#1f2937] border-none rounded-lg"
                                        onChange={handleInputChange}
                                    />

                                    <InputError
                                        message={props.errors.order_address}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="mt-4 w-full">
                                        <InputLabel
                                            htmlFor="order_qty"
                                            value="Qty"
                                        />

                                        <TextInput
                                            id="order_qty"
                                            type="number"
                                            name="order_qty"
                                            value={props.data.order_qty}
                                            className="block w-full bg-white dark:bg-[#1f2937] border-none"
                                            onChange={handleInputChange}
                                        />

                                        <InputError
                                            message={props.errors.order_qty}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4 w-full">
                                        <InputLabel value="Price" />
                                        <div className="block w-full bg-white dark:bg-[#1f2937] border-none p-2 rounded-lg">
                                            {props.data.order_price.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                    minimumFractionDigits: 0,
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="courier"
                                        value="Courier"
                                    />

                                    <select
                                        name="courier"
                                        id="courier"
                                        onChange={handleInputChange}
                                        className="block w-full dark:bg-[#1f2937] rounded-lg border-none p-2"
                                        value={props.data.courier}
                                    >
                                        <option disabled value="">
                                            Choose Courier
                                        </option>
                                        <option value="jne">JNE</option>
                                        <option value="pos">POS</option>
                                        <option value="tiki">TIKI</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="mt-4">
                            {props.loading ? (
                                <p>Loading...</p>
                            ) : props.ongkir && props.ongkir.length > 0 ? (
                                props.ongkir[0].costs &&
                                props.ongkir[0].costs.length > 0 ? (
                                    <>
                                        <InputLabel
                                            htmlFor="cost"
                                            value="Cost"
                                        />
                                        <div>
                                            <select
                                                className="mt-1 block w-full dark:bg-[#1f2937] rounded-lg uppercase border-none p-2"
                                                value={props.selectedService}
                                                onChange={(e) => {
                                                    props.setSelectedService(
                                                        e.target.value
                                                    );

                                                    const selectedIndex =
                                                        e.target.selectedIndex;
                                                    const selectedOption =
                                                        e.target[selectedIndex];
                                                    const selectedName =
                                                        selectedOption.getAttribute(
                                                            "name"
                                                        );
                                                    const selectedEtd =
                                                        selectedOption.getAttribute(
                                                            "etd"
                                                        );
                                                    const selectedCost =
                                                        selectedOption.getAttribute(
                                                            "data-cost"
                                                        );
                                                    const selectedDescription =
                                                        selectedOption.getAttribute(
                                                            "description"
                                                        );

                                                    console.log(selectedCost);

                                                    props.setData(
                                                        (prevData) => ({
                                                            ...prevData,
                                                            etd: selectedEtd,
                                                            name: selectedName,
                                                            cost: selectedCost,
                                                            description:
                                                                selectedDescription,
                                                            order_total_price:
                                                                parseInt(
                                                                    selectedCost,
                                                                    10
                                                                ) +
                                                                prevData.order_price,
                                                        })
                                                    );
                                                }}
                                            >
                                                <option value="">
                                                    Select Service
                                                </option>
                                                {props.ongkir[0].costs.map(
                                                    (cost, index) => (
                                                        <option
                                                            key={index}
                                                            value={cost.service}
                                                            name={
                                                                props.ongkir[0]
                                                                    .name
                                                            }
                                                            etd={
                                                                cost.cost[0].etd
                                                            }
                                                            data-cost={
                                                                cost.cost[0]
                                                                    .value
                                                            }
                                                            description={
                                                                cost.description
                                                            }
                                                        >
                                                            {
                                                                props.ongkir[0]
                                                                    .code
                                                            }{" "}
                                                            {cost.service}:{" "}
                                                            {cost.cost[0].value.toLocaleString(
                                                                "id-ID",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "IDR",
                                                                    minimumFractionDigits: 0,
                                                                }
                                                            )}{" "}
                                                            {cost.cost[0].etd +
                                                                " Days"}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </>
                                ) : (
                                    <p>
                                        No costs available for{" "}
                                        {props.ongkir[0].name}
                                    </p>
                                )
                            ) : (
                                <p>No shipping options available.</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <input
                                id="order_total_price"
                                name="order_total_price"
                                disabled
                                value={props.data.order_total_price}
                                className="hidden"
                                onChange={handleInputChange}
                            />
                            {props.data.order_type == "Digital" ? (
                                <>
                                    <InputLabel
                                        htmlFor="order_total_price"
                                        value="Price"
                                    />
                                    <div className="mt-1 p-2 rounded-lg dark:bg-[#1f2937]">
                                        Rp.{" "}
                                        {props.data.order_total_price.toLocaleString(
                                            "id-ID"
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="mt-1 text-sm text-end rounded-lg font-extrabold flex flex-col">
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        Total :
                                    </span>
                                    <span>
                                        {props.data.order_total_price.toLocaleString(
                                            "id-ID",
                                            {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                            }
                                        )}
                                    </span>
                                </div>
                            )}
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
