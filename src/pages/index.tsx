import { useRouter } from "next/router";
import Layout from "@/components/layouts/Layout";
import PageHead from "@/components/layouts/PageHead";
import Intro from "@/components/home/Intro";
import Button, { ButtonType } from "@/components/shared/Button";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <PageHead title="Home" />
      <Layout
        footerOneliner="Before connecting your wallet, complete the Settings!"
      >
        <div className="mx-auto max-w-[43rem]">
          <Intro
            topHeading="Introducing Crypto Currency Payment"
            mainHeading="Let's start accepting payment with Crypto Currency"
          >
            Cryptocurrency is gaining popularity as a fast and efficient payment method for businesses. Accepting cryptocurrency can help businesses save money on transaction fees and receive payments faster.
          </Intro>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              theme={ButtonType.Primary}
              pulse
              onClick={() => router.push("/setup/pay")}
            >
              Pay Now
            </Button>
            <Button onClick={() => router.push("/setup/settings")}>
              Settings
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
