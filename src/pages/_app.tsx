import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/index";
import NextNProgress from 'nextjs-progressbar';
import Toast from '@/components/shared/Toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress color="#f97316" />
      <Component {...pageProps} />
      <Toast />
    </Provider>
  );
}
