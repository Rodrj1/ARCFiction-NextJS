import type { AppProps } from "next/app";
import Head from "next/head";
import NextNavBar from "../components/NextNavBar/NextNavBar";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ARCFiction - NextJS</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://kit.fontawesome.com/1c30045aa9.js"></script>
      </Head>

      <NextNavBar />
      <br />
      <br />
      <br />
      <br />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
