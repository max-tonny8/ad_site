import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import BundlrContextProvider from "../context/bundlrContext";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ApolloProvider client={client}>
        <BundlrContextProvider>
          <Head>
            <title>Blazon</title>

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="favicon/site.webmanifest"></link>

            <meta name="theme-color" content="#000000" />

            <meta name="description" content="Blazon Decentralize Image App" />

            <meta itemprop="name" content="Framer Magic" />
            <meta
              itemprop="description"
              content="Blazon Decentralize Image App"
            />
            <meta itemprop="image" content="/Card.png" />

            <meta property="og:url" content=" " />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Blazon" />
            <meta
              property="og:description"
              content="Blazon Decentralize Image App"
            />
            <meta property="og:image" content="/Card.png" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Blazon" />
            <meta
              name="twitter:description"
              content="Blazon Decentralize Image App"
            />
            <meta name="twitter:image" content="/Card.png"></meta>
          </Head>
          <Component {...pageProps} />{" "}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BundlrContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
