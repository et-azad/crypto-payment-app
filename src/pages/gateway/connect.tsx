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
        <div className="w-full md:w-8/12">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 rounded-lg shadow-md px-4 py-6">
            <div className="wrapper antialiased text-gray-900">
              <div
                className="bg-white p-4 rounded-lg shadow-lg">
                <Image src="/connectors/metamask.svg" alt="" width={150} height={150}
                  className="w-full object-cover object-center rounded shadow-md border-dashed border-2 border-orange-500 transition duration-300 hover:scale-105 p-2" />
                <h1 className="text-3xl font-bold leading-[4rem] tracking-tight text-gray-900">MetaMask</h1>
                <p className="text-md text-gray-600">
                  Connect your MetaMask wallet to access Ethereum dapps.
                </p>
                <Button pulse theme={ButtonType.Primary} isFullWidth>Connect</Button>
              </div>
            </div>
            <div className="wrapper antialiased text-gray-900">
              <div
                className="bg-white p-4 rounded-lg shadow-lg">
                <Image src="/connectors/walletconnect.svg" alt="" width={150} height={150}
                  className="w-full object-cover object-center rounded shadow-md border-dashed border-2 border-orange-500 transition duration-300 hover:scale-105 p-2" />
                <h1 className="text-3xl font-bold leading-[4rem] tracking-tight text-gray-900">Wallet Connect</h1>
                <p className="text-md text-gray-600">
                  Connect your Wallet to access Binance Smart Chain
                  dapps.
                </p>
                <Button pulse theme={ButtonType.Primary} isFullWidth>Connect</Button>
              </div>
            </div>
            <div className="wrapper antialiased text-gray-900">
              <div
                className="bg-white p-4 rounded-lg shadow-lg">
                <Image src="/connectors/coinbase.svg" alt="" width={150} height={150}
                  className="w-full object-cover object-center rounded shadow-md border-dashed border-2 border-orange-500 transition duration-300 hover:scale-105 p-2" />
                <h1 className="text-3xl font-bold leading-[4rem] tracking-tight text-gray-900">MetaMask</h1>
                <p className="text-md text-gray-600">
                  Connect your MetaMask wallet to access Ethereum dapps.
                </p>
                <Button pulse theme={ButtonType.Primary} isFullWidth>Connect</Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}