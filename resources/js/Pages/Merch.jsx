import { Head } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import Footer from "@/Components/Footer";
import SearchBarMerch from "./Contents/SearchBarMerch";

export default function Merch(props)  {
    return (
        <Layout>
            <Head title="Merch" />
            <SearchBarMerch {...props} />
            <Footer />
        </Layout>
    );
}
