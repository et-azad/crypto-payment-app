import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { setNav } from "@/store/slices/nav";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import Gateway from "@/components/layouts/Gateway";
import WalletDetails from "@/components/gateway/WalletDetails";
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
      <Gateway>
        <PageHead title="Settings" />
        <Layout footerOneliner="Use your favorite crypto network to make Payment or else Cancel Payment">
          <WalletDetails />
        </Layout>
      </Gateway>
    </>
  );
}