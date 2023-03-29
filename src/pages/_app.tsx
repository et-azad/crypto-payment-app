import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import NextNProgress from 'nextjs-progressbar';
import store from "../../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress color="#f97316" />
      <Component {...pageProps} />
    </Provider>
  );
}
