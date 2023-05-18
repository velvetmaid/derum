import { useRef } from "react";
import { Head } from "@inertiajs/react";
import Hero from "@/Components/Hero";
import NewAlbumSlider from "@/Pages/Contents/NewAlbumSlider";
import Layout from "../Layouts/Layout";
import SearchBar from "./Contents/SearchBar";
import Footer from "@/Components/Footer";
import NewMerchSlider from "./Contents/NewMerchSlider";

export default function Welcome(props) {
    const targetRef = useRef(null);

    const scrollTo = () => {
        targetRef.current.scrollIntoView();
    };

    return (
        <Layout>
            <Head title="Home" />
            <Hero targetRef={targetRef} scrollTo={scrollTo} {...props} />
            <NewAlbumSlider props={props.albums} />
            <NewMerchSlider props={props.merches} />
            <SearchBar ref={targetRef} props={props.albums} />
            <Footer />
        </Layout>
    );
}
