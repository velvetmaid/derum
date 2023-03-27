import { Head } from "@inertiajs/react";
import Hero from "@/Components/Hero";
import PopularSlide from "@/Pages/Contents/PopularSlide";
import Layout from "../Layouts/Layout";

export default function Welcome(props) {
    return (
        <>
            <Layout>
                <Head title="Home" />
                <Hero />
                <PopularSlide {...props} />
            </Layout>
        </>
    );
}
