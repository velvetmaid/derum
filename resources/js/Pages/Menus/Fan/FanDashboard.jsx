import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <Layout>
                <div className="overflow-hidden shadow-sm sm:rounded-lg mx-auto">
                    <div className="p-6">You're logged in as Fan</div>
                </div>
            </Layout>
        </>
    );
}
