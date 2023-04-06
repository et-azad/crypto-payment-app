import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setNav } from "@/store/slices/nav";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import { SETUP_NAVS } from "@/components/constants/links";
import Button, { ButtonType } from "@/components/shared/Button";
import Intro from "@/components/home/Intro";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const cleanUp = setTimeout(
      () =>
        dispatch(
          setNav({
            show: true,
            links: SETUP_NAVS,
          })
        ),
      500
    );

    return () => clearTimeout(cleanUp);
  }, [dispatch]);

  return (
    <>
      <PageHead title="Home" />
      <Layout
        isSetup
        footerOneliner="Before connecting your wallet, complete the Settings!"
      >
        <section className="p-4 py-24 flex items-center min-h-screen justify-center bg-white">
          <div className="mx-auto max-w-[43rem]">
            <Intro
              topHeading="Introducing Crypto Currency Payment"
              mainHeading="Distribute your brand from&nbsp;design to code"
            >
              Specify helps you unify your brand identity by collecting, storing
              and distributing design tokens and assets — automatically.
            </Intro>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                type={ButtonType.Primary}
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
        </section>
      </Layout>
    </>
  );
}
