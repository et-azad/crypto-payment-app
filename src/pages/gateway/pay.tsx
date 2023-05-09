
import Config from "@/components/layouts/gateway/Config";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/gateway/Layout";
import WalletDetails from "@/components/gateway/WalletDetails";

export default function Home() {
  return (
    <>
      <Config>
        <PageHead title="Complete Payment" />
        <Layout footerOneliner="Use your favorite crypto network to make Payment">
          <WalletDetails />
        </Layout>
      </Config>
    </>
  );
}