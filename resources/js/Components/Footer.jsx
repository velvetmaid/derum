export default function Footer() {
    return (
        <>
            <div className=" mx-auto py-10">
                <div className="text-center mb-10">
                    <h3 className="text-3xl mb-3">
                        {" "}
                        Get your groove on with our cutting-edge music streaming
                        platform!{" "}
                    </h3>
                    <p> Feel the groove. </p>
                </div>
                <hr className="border-gray-600" />

                <div className="max-w-2xl mx-auto mt-6 flex flex-col md:flex-row md:justify-between items-center text-sm">
                    <p className="order-2 md:order-1 mt-8 md:mt-0">
                        {" "}
                        &copy; Derum, 2023
                    </p>
                    <div className="order-1 md:order-2">
                        <span className="px-2">About us</span>
                        <span className="px-2 border-l">Contact us</span>
                        <span className="px-2 border-l">Privacy Policy</span>
                    </div>
                </div>
            </div>
        </>
    );
}
