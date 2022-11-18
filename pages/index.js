import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {mockupData} from '../constants/data'
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

  console.log(mockupData)

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

            <div className="gap-3 columns-3 ">
              {mockupData?.map((data) => (
                <div className="w-full rounded-sm h-full" key={data.id}>
                  <img
                    src={data?.url}
                    alt={data?.title}
                    className="w-full mb-3 rounded-sm h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
