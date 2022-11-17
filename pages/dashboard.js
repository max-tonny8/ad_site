import { gql, useApolloClient } from '@apollo/client';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'

const mainURL = `https://arweave.net/`;

const FETCH_IMAGES = gql`
  query images($orderBy: String!, $orderDirection: String!) {
    images(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      image
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

        
      </div>
    </div>
  );
}

export default Dashboard;