import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { Setting } from "@/components/models/setting";
import { setNav } from "@/store/slices/nav";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import Gateway from "@/components/layouts/Gateway";
import AvailableConnectors from "@/components/gateway/AvailableConnectors";
import { GATEWAY_NAVS } from "@/components/constants/links";

export default function Home() {
  const dispatch = useDispatch();
  const _token = getCookie("_token");
  const setting = useSelector(({ setting }: { setting: Setting }) => setting);
  const { _connectors, _provider, _providerApiKey, _networks } = setting.options;

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
        <PageHead title="Connect with a Wallet" />
        <Layout footerOneliner="Use your favorite crypto network to make Payment or else Cancel Payment">
          <div className="w-full">
            {/* {_token ? <ConnectorOptions /> : <h1 className="text-center">Token Not Defined!</h1>} */}
            <AvailableConnectors availableConnector={_connectors} />
          </div>
        </Layout>
      </Gateway>
    </>
  );
}