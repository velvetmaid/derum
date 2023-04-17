import { Head } from "@inertiajs/react";
import Hero from "@/Components/Hero";
import PopularSlide from "@/Pages/Contents/PopularSlide";
import Layout from "../Layouts/Layout";
import SearchBar from "./Contents/SearchBar";
import Footer from "@/Components/Footer";

export default function Welcome(props) {
    return (
        <>
            <Layout>
                <Head title="Home" />
                <Hero />
                <PopularSlide {...props} />
                <SearchBar {...props}/>
                <Footer />
            </Layout>
        </>
    );
}
