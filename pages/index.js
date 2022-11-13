import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import {useState} from 'react'

export default function Home() {

   const [isWalletConnected, setIsWalletConnected] = useState(false);
   const router = useRouter();

   const connectWallet = async () => {
     try {
       const { ethereum } = window;
       if (!ethereum) {
         alert("Please Install Metamask");
         return;
       }
       const accounts = await ethereum.request({
         method: "eth_requestAccounts",
       });
       setIsWalletConnected(true);
       localStorage.setItem("walletAddress", accounts[0]);
       router.push("/dashboard");
     } catch (error) {
       console.error(error);
     }
   };
  
  return (
    <div>
      <Head>
        <title>Imagegram</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      <div className="relative font-body overflow-hidden ">
        <section className="max-w-[1500px] my-0 h-screen mx-auto grid grid-cols-2 items-center justify-center gap-3 md:order-second md:grid-cols-1 ">
          <div className="flex flex-col p-1 md:items-center md:justify-center sm:p-2 md:h-screen md:p-8">
            <h1 className="font-body text-6xl md:text-5xl md:text-center font-bold my-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 leading-[120px] md:leading-normal sm:text-[30px] ">
              Imagegram
            </h1>
            <p className="text-[#979797] text-[20px] md:text-center md:text-base my-1">
              Imagegram is a Decentralized Image Web App built with Solidity,
              Hardhat, NextJS, Arweave + Bundlr Client, and Tailwind CSS.
            </p>
            <button
              className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-3xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>

          <div className="md:hidden parent h-screen">
            <div className="div1">
              <img
                src="/mockups/image1.jpg"
                alt="mockup"
                className="h-full w-full"
              />
            </div>
            <div className="div2">
              <img
                src="/mockups/image2.jpg"
                alt="mockup"
                className="h-full w-full"
              />
            </div>
            <div className="div3">
              <img
                src="/mockups/image3.jpg"
                alt="mockup"
                className="h-full w-full"
              />
            </div>
            <div className="div4">
              <img
                src="/mockups/image4.jpg"
                alt="mockup"
                className="h-full w-full"
              />
            </div>
            <div className="div5">
              <img
                src="/mockups/image5.jpg"
                alt="mockup"
                className="h-max w-full"
              />
            </div>
            <div className="div6">
              <img
                src="/mockups/image6.jpg"
                alt="mockup"
                className="h-max w-max"
              />
            </div>
            <div className="div7">
              <img
                src="/mockups/image7.jpg"
                alt="mockup"
                className="h-full w-full "
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
