import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useBundler } from "../context/bundlrContext";
import { FundWallet } from "../components";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { ContractABI } from "../constants/contractABI";

const Upload = () => {
  const [imageDetails, setImageDetails] = useState({
    image: "",
    tag: "Experimental",
    description: "",
  });

  const { initialiseBundlr, bundlrInstance, balance, uploadFile } =
    useBundler();

  const [file, setFile] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dataRef = useRef();

  function triggerOnChange() {
    dataRef.current.click();
  }

  async function handleFileChange(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setImageDetails({ ...imageDetails, image: uploadedFile });
    let reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        setFile(Buffer.from(reader.result));
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  }

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI,
      signer
    );
    return contract;
  };

  const handleUpload = async () => {
    const { image, tag, description } = imageDetails;

    if (!image) {
      toast.error("Please Select an Image for Imagegram");
    } else if (!tag) {
      toast.error("Please Select a Tag for Image");
    } else if (!description) {
      toast.error("Please Select a Description for Image");
    } else {
      setLoading(true);
      const url = await uploadFile(file);
      upload(url.data.id)
    }
  };

  const upload = async (imgURL) => {
    try {
      const contract = await getContract();

      const uploadDate = String(new Date());

      await contract.uploadImage(
        imgURL,
        imageDetails?.description,
        imageDetails?.tag,
        uploadDate
      );

      setLoading(false);

      setImageDetails({
        image: "",
        tag: "",
        description: "",
      });

      setFile("");

      toast.success("Uploaded on Imagegram 🖼️");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", error);
      setLoading(false);
    }
  };

  if (!bundlrInstance) {
    return (
      <div className="justify-center items-center h-screen flex font-body flex-col">
        <h3 className="text-4xl font-bold sm:text-xl">
          Let&apos;s initialise Bundlr now 💱
        </h3>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-8 py-5 text-center mr-2 mb-2 transition-all ease-in-out delay-150 duration-150
            hover:translate-y-1 text-1xl hover:shadow-lg hover:shadow-blue-500/80 mt-2 cursor-pointer outline-none border-none"
          onClick={initialiseBundlr}
        >
          Initialise Bundlr 💸
        </button>
      </div>
    );
  }

  if (
    !balance ||
    (Number(balance) <= 0 && !balance) ||
    Number(balance) <= 0.06
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h3 className="text-4xl font-body text-center">
          Oops! Before Uploading Song Please Add Some Funds.🪙
        </h3>
        <FundWallet />
      </div>
    );
  }

  return (
    <div className="font-body  relative ">
      <Head>
        <title>Upload || Imagegram</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>

      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

      <div>
        <section className="max-w-[1240px] h-screen my-0 mx-auto grid grid-cols-2 items-center justify-center gap-8 md:order-second md:grid-cols-1 p-6 ">
          <div
            className="w-full bg-[#272D37]/60 rounded-3xl sm:h-[350px] h-[589px] border border-solid border-sky-700 cursor-pointer"
            onClick={triggerOnChange}
          >
            <input
              id="selectImage"
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
              ref={dataRef}
            />
            {imageDetails.image ? (
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={window.URL.createObjectURL(imageDetails.image)}
                  alt="image"
                  ref={imageDetails.image}
                  className="w-full h-full  sm:h-[350px] rounded-3xl p-2"
                />
              </div>
            ) : (
              <div className="h-full  flex justify-center items-center">
                <h2 className="text-center">
                  Please Select Image for Imagegram
                </h2>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col font-body gap-5">
            <div className="flex flex-col">
              <label className="text-2xl my-1 font-semibold">Tag</label>
              <select
                value={imageDetails.tag}
                onChange={(e) =>
                  setImageDetails({ ...imageDetails, tag: e.target.value })
                }
                name="category"
                className="px-5 py-3 rounded-xl
               placeholder:text-slate-400 outline-none border-none  bg-[#272D37]/60 placeholder:font-body font-body"
              >
                <option>Experimental</option>
                <option>3D Render</option>
                <option>Background</option>
                <option>Athletic</option>
                <option>People</option>
                <option>Street Photography</option>
                <option>Nature</option>
                <option>Food & Drinks</option>
                <option>Architecture & Interior</option>
                <option>Fashion & Beauty</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-2xl my-1 font-semibold">Description</label>
              <textarea
                placeholder="eg. Minimalistic 3D Rendering Wallpaper in 8K Resolution."
                className="px-5 py-3 rounded-xl placeholder:text-slate-400 bg-[#272D37]/60 border-none outline-none placeholder:font-body tx font-body"
                value={imageDetails.description}
                onChange={(e) =>
                  setImageDetails({
                    ...imageDetails,
                    description: e.target.value,
                  })
                }
                rows="14"
              />
            </div>

            <button
              type="button"
              className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out  hover:drop-shadow-xl hover:shadow-sky-600 w-auto focus:scale-90 sm:mb-10 md:mb-10"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Upload"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Upload;
