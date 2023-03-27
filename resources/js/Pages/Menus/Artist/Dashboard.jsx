import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts/Layout";
import Album from "./Album";
import Desk from "./Desk";

export default function Dashboard(props) {
    const posts = props.posts;

    return (
        <>
            <Layout>
                <Head title={props.auth.user.name + " Dashboard"} />
                <Desk {...props} />
                <Album posts={posts} />
            </Layout>
        </>
    );
}
