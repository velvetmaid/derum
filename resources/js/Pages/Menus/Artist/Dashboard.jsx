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
                <div className="rounded-3xl p-8 mb-5">
                    <h1 className="text-2xl text-center md:text-left md:text-3xl font-bold mb-8">
                        Your Album
                    </h1>
                    <Album posts={posts} />
                </div>
            </Layout>
        </>
    );
}
