import { gql, useApolloClient } from '@apollo/client';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'

const mainURL = `https://arweave.net/`;

const FETCH_IMAGES = gql`
  query images($orderBy: String!, $orderDirection: String!) {
    images(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      image
      tags
    }
  }
`;

const Dashboard = () => {

  const [images, setImages] = useState([]);

  const clientApollo = useApolloClient();
  
   const getImages = async () => {
     clientApollo
       .query({
         query: FETCH_IMAGES,
         variables: {
           orderBy: "createdAt",
           orderDirection: "desc",
         },
         fetchPolicy: "network-only",
       })
       .then(({ data }) => {
         console.log(data)
         setImages(data);
       })
       .catch((error) => {
         console.error(error);
       });
  };
  
    useEffect(() => {
      getImages();
    }, [images]);

  return (
    <div className="font-body  relative">
      <Head>
        <title>Imagegram</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>

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

        <section className="max-w-[1440px] flex items-center justify-center my-0 mx-auto">
          <div className="gap-3 columns-3 md:columns-2 sm:columns-1 md:p-2">
            {images?.images?.length &&
              images?.images?.map((data) => (
                <div key={data.id} className="relative">
                  <img
                    src={mainURL + data.image}
                    alt={data.tags}
                    className="w-full mb-3 rounded-sm"
                  />

                  <div className="absolute opacity-0 backdrop-blur-sm bg-black/50 hover:opacity-100 w-full h-full left-0 top-0 p-6  cursor-pointer">
                    <h2 className="font-bold text-3xl my-2">See Details</h2>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;