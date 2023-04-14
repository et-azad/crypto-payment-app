import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useToast from "@/hooks/useToast";
import { setNav } from "@/store/slices/nav";
import { Setting } from "@/components/models/setting";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import { SETUP_NAVS } from "@/components/constants/links";
import PayForm from "@/components/setup/PayForm";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pushToast } = useToast();
  const { status, options } = useSelector(({ setting }: { setting: Setting }) => setting);

  useEffect(() => {
    const cleanUp = setTimeout(
      () => {
        // Check setting status
        if (!status) {
          pushToast("warning", "Please complete the Settings first!")
          router.replace("settings");
        }
        dispatch(
          setNav({
            show: true,
            links: SETUP_NAVS,
          })
        )
      }, 500
    );
    return () => clearTimeout(cleanUp);
  }, [dispatch, pushToast, status, router]);

  return (
    <>
      <PageHead title="Settings" />
      <Layout
        isSetup
        footerOneliner="Completed the Setting? start accepting Payments!"
      >
        <div className="w-full md:w-4/12">
          {status ? <PayForm options={options} /> : <h1 className="text-center">Setup not completed!</h1>}
        </div>
      </Layout >
    </>
  );
}
