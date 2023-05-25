import PrimaryButton from "@/Components/PrimaryButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function MerchGroup(props) {
    console.log("asd", props);
    const [currentPage, setCurrentPage] = useState(0);

    const pageSize = 8;
    const totalItems =
        props.searchRes.length > 0
            ? props.searchRes.length
            : props.merches.length;
    const pageCount = Math.ceil(totalItems / pageSize);
    const data =
        props.searchRes.length > 0
            ? props.searchRes.slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
              )
            : props.merches.slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
              );

    const handlePageChange = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <div className="my-6 flex flex-wrap gap-8 justify-center items-center">
                {props.searchRes.length === 0
                    ? data.reverse().map((merch) => (
                          <div key={merch.id} className="max-w-sm">
                              <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg overflow-hidden">
                                  <img
                                      className="w-full"
                                      src={
                                          "/images/merches/thumbnails/thumb_" +
                                          JSON.parse(merch.merch_image)[0]
                                      }
                                      alt={merch.merch_title}
                                  />
                                  <div className="py-6 px-6 rounded-lg bg-white">
                                      <h1 className="text-gray-700 font-bold text-2xl mb-1 hover:text-gray-900 hover:cursor-pointer">
                                          {merch.merch_title}
                                      </h1>
                                      <p className="text-gray-700 tracking-wide">
                                          {merch.merch_description}
                                      </p>
                                      <Link
                                          href={route("merch-info", {
                                              id: merch.id,
                                          })}
                                      >
                                          <PrimaryButton className="mt-4">
                                              Buy Now
                                          </PrimaryButton>
                                      </Link>
                                  </div>
                                  <div className="absolute top-2 right-2 py-2 px-4 bg-white text-gray-900 rounded-lg">
                                      <span className="text-md">
                                          {merch.merch_price >= 1000
                                              ? (
                                                    merch.merch_price / 1000
                                                ).toLocaleString("id-ID", {
                                                    minimumFractionDigits: 0,
                                                }) + "K"
                                              : merch.merch_price.toLocaleString(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }
                                                )}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      ))
                    : data.map((merch) => (
                          <div key={merch.id} className="max-w-sm">
                              <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg overflow-hidden">
                                  <img
                                      className="w-full"
                                      src={
                                          "/images/merches/thumbnails/thumb_" +
                                          JSON.parse(merch.merch_image)[0]
                                      }
                                      alt={merch.merch_title}
                                  />
                                  <div className="py-6 px-6 rounded-lg bg-white">
                                      <h1 className="text-gray-700 font-bold text-2xl mb-1 hover:text-gray-900 hover:cursor-pointer">
                                          {merch.merch_title}
                                      </h1>
                                      <p className="text-gray-700 tracking-wide">
                                          {merch.merch_description}
                                      </p>
                                      <Link
                                          href={route("merch-info", {
                                              id: merch.id,
                                          })}
                                      >
                                          <PrimaryButton className="mt-4">
                                              Buy Now
                                          </PrimaryButton>
                                      </Link>
                                  </div>
                                  <div className="absolute top-2 right-2 py-2 px-4 bg-white text-gray-900 rounded-lg">
                                      <span className="text-md">
                                          {merch.merch_price >= 1000
                                              ? (
                                                    merch.merch_price / 1000
                                                ).toLocaleString("id-ID", {
                                                    minimumFractionDigits: 0,
                                                }) + "K"
                                              : merch.merch_price.toLocaleString(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }
                                                )}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      ))}
            </div>
            <ReactPaginate
                className="flex text-xl items-center justify-center space-x-2 bg-white dark:bg-blueNavy-dark my-4 rounded-lg"
                previousLabel={
                    <ChevronLeftIcon className="w-10 h-10 hover:-translate-x-1 duration-100" />
                }
                nextLabel={
                    <ChevronRightIcon className="w-10 h-10 hover:translate-x-1 duration-100" />
                }
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={-1}
                onPageChange={handlePageChange}
                activeClassName={"bg-white bg-opacity-50 rounded-full"}
                breakLabel={"..."}
                pageLinkClassName={
                    "w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-25 ease-in-out duration-150"
                }
            />
        </>
    );
}
