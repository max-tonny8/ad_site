import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Footer } from "../components";
import Dashboard from "./dashboard";

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
        <title>Blazon</title>
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div className="relative font-body overflow-hidden ">
        {isWalletConnected ? (
          <Dashboard />
        ) : (
          <section className="max-w-[1440px] my-0 h-screen mx-auto grid grid-cols-2 items-center justify-center gap-3 md:order-second md:grid-cols-1 ">
            <div className="flex flex-col p-1 md:items-center md:justify-center sm:p-2 md:h-screen md:p-8">
              <h1 className="font-body text-6xl md:text-5xl md:text-center font-bold my-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 leading-[120px] md:leading-normal sm:text-[30px] ">
                Blazon
              </h1>
              <p className="text-[#979797] text-[20px] md:text-center md:text-base my-1">
                Blazon is a Decentralized Image Web App built with Solidity,
                Hardhat, NextJS, Arweave + Bundlr Client, and Tailwind CSS.
              </p>
              <button
                className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-3xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>

            <div className="flex items-center justify-center h-full w-full relative">
              <img
                src="https://images.unsplash.com/photo-1662865433800-dae637c7b735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                alt="mockup"
                className="h-fit w-fit"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
