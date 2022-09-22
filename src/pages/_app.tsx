import type { AppProps } from "next/app";
import Head from "next/head";
import NextNavBar from "../components/NextNavBar/NextNavBar";
import { persistor, store } from "../app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
