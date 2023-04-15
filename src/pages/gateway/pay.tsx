import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { setNav } from "@/store/slices/nav";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import Button, { ButtonType } from "@/components/shared/Button";
import { GATEWAY_NAVS } from "@/components/constants/links";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const _token = getCookie("_token");
  console.log(_token);



  useEffect(() => {
    const cleanUp = setTimeout(
      () =>
        dispatch(
          setNav({
            show: true,
            links: GATEWAY_NAVS,
          })
        ),
      500
    );
    return () => clearTimeout(cleanUp);
  }, [dispatch]);

  return (
    <>
      <PageHead title="Settings" />
      <Layout footerOneliner="Use your favorite crypto network to make Payment or else Cancel Payment">
        <div
          className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl pt-4">
          <div className="pb-6">
            <div className="flex flex-wrap justify-center">
              <Image src="/networks/eth.svg" width={140} height={140} alt="Networks"
                className="bg-white dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-14 -ml-18 lg:-ml-16 max-w-[150px]" />
            </div>
            <span
              className="m-2 float-right bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 absolute top-0 right-0">Test
              Mode</span>
            <div className="mt-20 text-center">
              <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">Goerli
                (Testnet)
              </h3>
              <p className="text-gray-500 text-xs">(0x175997B32c350f35E52C9232C7E9320448b982a9)</p>
            </div>
            <div className="pt-3 mx-6 text-center">
              <div className="flex p-2 pb-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                role="alert">
                <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"></path>
                </svg>
                <div className="ml-1 text-sm font-medium">
                  This is Test Netwrok! Payment will be marked as Test Payment.
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="w-full">
                  <div className="rounded-lg shadow-md mb-4 py-6 font-bold text-gray-500">
                    <h2 className="text-sm text-gray-700">Payable Amount</h2>
                    <h1 className="text-xl font-bold"><span className="text-3xl text-orange-400">0.0063 ETH</span> (11.5 USD)</h1>
                  </div>
                  <button
                    className="transform rounded-md px-5 py-3 font-medium text-white transition-colors bg-gradient-to-r from-orange-300 to-orange-500 hover:from-pink-500 hover:to-yellow-500 transition duration-300 hover:scale-105">Complete Payment <span
                      className="animate-ping absolute right-0 top-0 w-3 h-3  rounded-full bg-gradient-to-r from-orange-400 to-orange-700 "></span></button>
                </div>
              </div>
            </div>
            <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
              <div className="absolute flex -space-x-12 rounded-b-2xl">
                <div
                  className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-orange-400/90 group-hover:bg-orange-600/90 z-10">
                </div>
                <div
                  className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-orange-300/90 group-hover:bg-orange-500/90 z-20">
                </div>
                <div
                  className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-orange-200/90 group-hover:bg-orange-400/90 z-30">
                </div>
                <div
                  className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-orange-100/90 group-hover:bg-orange-300/90 z-40">
                </div>
                <div
                  className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-orange-50/90 group-hover:bg-orange-200/90 z-50">
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}