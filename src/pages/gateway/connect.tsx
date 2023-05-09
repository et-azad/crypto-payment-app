import { useSelector } from "react-redux";
import { Setting } from "@/components/models/setting";
import Config from "@/components/layouts/gateway/Config";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/gateway/Layout";
import AvailableConnectors from "@/components/gateway/AvailableConnectors";

export default function Home() {
  const setting = useSelector(({ setting }: { setting: Setting }) => setting);
  const { _connectors } = setting.options;

  return (
    <>
      <Config>
        <PageHead title="Connect with your Wallet" />
        <Layout footerOneliner="Use your favorite crypto network to make Payment">
          <div className="w-full">
            <AvailableConnectors availableConnector={_connectors} />
          </div>
        </Layout>
      </Config>
    </>
  );
}