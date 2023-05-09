import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useToast from "@/hooks/useToast";
import { Setting } from "@/components/models/setting";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import PayForm from "@/components/setup/PayForm";

export default function Home() {
  const router = useRouter();
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
      }, 500
    );
    return () => clearTimeout(cleanUp);
  }, [pushToast, status, router]);

  return (
    <>
      <PageHead title="Start Payment" />
      <Layout
        footerOneliner="Completed the Setting? start accepting Payments!"
      >
        <div className="w-full md:w-4/12 shadow-2xl rounded-xl">
          {status ? <PayForm options={options} /> : <h1 className="text-center">Setup not completed!</h1>}
        </div>
      </Layout >
    </>
  );
}
