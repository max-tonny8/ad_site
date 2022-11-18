import Head from "next/head";
import React, { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils/truncAddress";
import moment from "moment";
import { CloseSquare, Edit, Edit2 } from "iconsax-react";
import { useBundler } from "../context/bundlrContext";
import { useRouter } from "next/router";

const mainURL = `https://arweave.net/`;

const ImageContainer = ({ toggle, selectedImage }) => {
  const [addr, setAddr] = useState("");

  const { setEditImageDetails } = useBundler();

  const router = useRouter();

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  return (
    <div
      className="w-full h-full  backdrop-blur-sm bg-black/50 flex items-center justify-center font-body "
      onClick={toggle}
    >
      <Head>
        <title>{selectedImage.tags} </title>
        <link rel="icon" href="/logo-main.png" />
      </Head>

      <section className="grid grid-cols-1 max-w-[850px] mx-auto my-0 sm:grid-cols-1  gap-2  p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded md:m-8">
        <div className="w-full sm:h-[350px] h-[450px] ssm:h-[250px]">
          <img
            src={mainURL + selectedImage.image}
            alt="mockup"
            className="w-full h-full rounded"
          />
        </div>
        <div className="relative">
          <div
            className="absolute sm:top-[-410px] sm:right-[-55px] ssm:top-[-310px] right-[-50px] top-[-510px] z-[999] backdrop-blur-lg bg-white/30 p-3 rounded-lg cursor-pointer "
            onClick={toggle}
          >
            <CloseSquare size="32" color="#d9e3f0" />
          </div>
          <h2 className="text-xl font-semibold ssm:text-base">
            {selectedImage.description}
          </h2>
          <h3 className="text-lg  my-2 sm:my-1 ssm:text-base">
            Publisher:{" "}
            <span className="">
              {truncateEthAddress(selectedImage.photographer)}
            </span>
          </h3>
          <h4 className="my-2 sm:my-1">Tag: {selectedImage.tags}</h4>
          <p className="my-2 sm:my-1">
            Published: {moment(selectedImage.published).format("MMM Do YY")}
          </p>

          {selectedImage?.photographer === addr ? (
            <div
              className={`${
                selectedImage.photographer === addr
                  ? `block cursor-pointer`
                  : `hidden`
              } `}
            >
              <button
                className="bg-black/40 outline-none border-none py-3 px-5 rounded-full font-body cursor-pointer transition duration-250 ease-in-out  hover:drop-shadow-xl hover:shadow-black/100  hover:bg-black w-auto focus:scale-90 flex items-center justify-center gap-2"
                onClick={() => {
                  setEditImageDetails(selectedImage.id);
                  router.push("/upload");
                }}
              >
                <Edit size="32" color="#d9e3f0" /> Edit Details
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default ImageContainer;
