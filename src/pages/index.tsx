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

          {/* Will use this for alert  */}
          <div id="toast-bottom-left" className="fixed flex items-center w-full max-w-xs p-4 text-gray-500 bg-orange-200 rounded-lg shadow bottom-20 right-3 cursor-pointer" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Warning icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">Please complete the Settings first!</div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-orange-200 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-orange-300 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </section>
      </Layout>
    </>
  );
}
