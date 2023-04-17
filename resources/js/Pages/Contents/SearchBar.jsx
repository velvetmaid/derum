import { useState } from "react";
import AlbumGroup from "./AlbumGroup";
import ErrorBoundary from "./ErrorB";

export default function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            fetch(`/search/${searchTerm}`)
                .then((response) => response.json())
                .then((data) => setSearchResults(data))
                .catch((error) => console.log(error));
        } else {
            setSearchResults([]);
        }
    };

    return (
        <>
            <div className="md:max-w-md md:p-0 mx-auto max-w-xs px-8 my-8">
                <form onSubmit={handleSubmit}>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden shadow-md">
                        <div className="grid place-items-center h-full w-12 text-blueNavy ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none"
                            type="text"
                            id="search"
                            autoComplete="search"
                            placeholder={`Search here...`}
                            value={searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>

                <AlbumGroup {...props} searchRes={searchResults} />
        </>
    );
}
