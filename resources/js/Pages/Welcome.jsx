import { Head } from "@inertiajs/react";
import Hero from "@/Components/Hero";
import NewAlbumSlider from "@/Pages/Contents/NewAlbumSlider";
import Layout from "../Layouts/Layout";
import SearchBar from "./Contents/SearchBar";
import Footer from "@/Components/Footer";

export default function Welcome(props) {
    return (
        <Layout>
            <Head title="Home" />
            <Hero />
            <NewAlbumSlider props={props.albums} />
            <SearchBar props={props.albums} />
            <Footer />
        </Layout>
    );
}
