import { useApolloClient, gql } from "@apollo/client";
import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Footer, Header, ImageContainer, SongContainer } from "../components";
import { truncateEthAddress } from "../utils/truncAddress";

const mainURL = `https://arweave.net/`;

const Search = () => {
  const [page, setPage] = useState(0);

  const [searchFilter, setSearchFilter] = useState("");

  const [images, setImages] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [selectedImage, setSelectedImage] = useState({
    id: "",
    image: "",
    description: "",
    tags: "",
    photographer: "",
    published: "",
  });

  const clientApollo = useApolloClient();

  const SEARCH_IMAGES = gql`
    query images(
      $orderBy: String!
      $orderDirection: String!
      $first: Int!
      $skip: Int!
      $where: Image_filter
    ) {
      images(
        orderBy: $orderBy
        orderDirection: $orderDirection
        first: $first
        skip: $skip
        where: $where
      ) {
        id
        image
        description
        tags
        photographer
        createdAt
        published
      }
    }
  `;

  const getImages = useCallback(async () => {
    clientApollo
      .query({
        query: SEARCH_IMAGES,
        variables: {
          orderBy: "createdAt",
          orderDirection: "desc",
          first: 20,
          skip: page * 20,
          where: {
            ...(searchFilter && {
              tags_contains_nocase: searchFilter,
            }),
          },
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setImages(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [SEARCH_IMAGES, clientApollo, searchFilter, page]);

  useEffect(() => {
    getImages();
  }, [searchFilter, getImages, page]);

  return (
    <div>
      <Head>
        <title>Blazon Search</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      <Header />
      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

      <div className="flex items-center justify-center mt-8">
        <input
          placeholder="Search "
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="px-5 py-3 rounded-xl border-slate-200   bg-[#272D37]/60 placeholder-slate-400 contrast-more:border-sky-400 contrast-more:placeholder-sky-500 max-w-[650px] outline-none caret-sky-700 font-body"
        />
      </div>

      {searchFilter ? (
        <div>
          <section className="max-w-[1440px] flex flex-col items-center justify-center my-8 mx-auto">
            <div className="gap-3 columns-3 md:columns-2 sm:columns-1 md:p-2 ">
              {images?.images?.length > 0 &&
                images?.images?.map((data) => (
                  <div
                    key={data.id}
                    className="relative"
                    onClick={() => {
                      setSelectedImage({
                        id: data.id,
                        image: data.image,
                        description: data.description,
                        tags: data.tags,
                        photographer: data.photographer,
                        published: data.published,
                      });

                      setIsOpen(!isOpen);
                    }}
                  >
                    <img
                      src={mainURL + data.image}
                      alt={data.tags}
                      className="w-full mb-3 rounded-sm"
                    />

                    <div className="absolute opacity-0 backdrop-blur-sm bg-black/50 hover:opacity-100 w-full h-full left-0 top-0 p-6  cursor-pointer transition duration-350 ease-out hover:ease-in rounded-sm">
                      <h2 className="font-bold text-3xl my-2">See Details</h2>
                    </div>
                  </div>
                ))}
            </div>

            {images?.images?.length === 0 && (
              <div>
                <h1 className="my-2 text-xl text-transparent bg-clip-text text-center bg-gradient-to-r from-sky-500 to-blue-800 font-semibold">
                  There appears to be no images matching your search criteria.
                </h1>
              </div>
            )}

            {images?.images?.length < 20 ? (
              <div>
                {images?.images?.length === 0 ? null : (
                  <h2 className="my-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 font-semibold ">
                    You&apos;ve reached end of the list{" "}
                  </h2>
                )}
              </div>
            ) : (
              <div className="flex gap-8">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-3xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-115 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
                >
                  Prev
                </button>

                <button
                  disabled={images?.images?.length < 20}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-3xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-115 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
                >
                  Next
                </button>
              </div>
            )}
          </section>

          {isOpen ? (
            <div className="fixed h-full w-full z-[100] top-0 left-0">
              <ImageContainer toggle={toggle} selectedImage={selectedImage} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex gap-5 max-w-[1240px] mx-auto my-20 items-center justify-center ">
          <h1 className="font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 font-body">
            Search
          </h1>
          <img src="/logo.png" alt="logo" className="w-[50px] h-[50px]" />
        </div>
      )}
    </div>
  );
};

export default Search;
