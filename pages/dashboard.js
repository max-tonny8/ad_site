import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { Header, ImageContainer } from "../components";

const mainURL = `https://arweave.net/`;

const FETCH_IMAGES = gql`
  query images(
    $orderBy: String!
    $orderDirection: String!
    $first: Int!
    $skip: Int!
  ) {
    images(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
    ) {
      id
      image
      description
      tags
      photographer
      published
    }
  }
`;

const Dashboard = () => {
  const [page, setPage] = useState(0);

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

  const getImages = useCallback(async () => {
    clientApollo
      .query({
        query: FETCH_IMAGES,
        variables: {
          orderBy: "createdAt",
          orderDirection: "desc",
          first: 20,
          skip: page * 20,
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        console.log(data);
        setImages(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clientApollo, page]);

  useEffect(() => {
    getImages();
  }, [getImages, page]);

  return (
    <div className="font-body relative">
      <Head>
        <title>Imagegram</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>

      <Header />

      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

      <div>
        <div className="flex gap-5 max-w-[1240px] mx-auto my-20 items-center justify-center ">
          <h1 className="font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 ">
            Imagegram
          </h1>
          <img src="/logo.png" alt="logo" className="w-[50px] h-[50px]" />
        </div>

        {images?.images?.length === 0 && (
          <div className="max-w-[1240px] h-[350px] mx-auto my-0 font-body">
            <h1 className="text-2xl text-center">NO Images</h1>
          </div>
        )}

        <section className="max-w-[1440px] flex flex-col items-center justify-center my-0 mx-auto">
          <div className="gap-3 columns-3 md:columns-2 sm:columns-1 md:p-2 ">
            {images?.images?.length &&
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

          {images?.images?.length < 20 ? (
            <div>
              <h2 className="my-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 font-semibold">
                You&apos;ve reached end of the list{" "}
              </h2>
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
      </div>

      {isOpen ? (
        <div className="fixed h-full w-full z-[100] top-0 left-0">
          <ImageContainer toggle={toggle} selectedImage={selectedImage} />
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
