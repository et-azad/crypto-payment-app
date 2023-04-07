import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setNav } from "@/store/slices/nav";
import { addAlert } from "@/store/slices/alert";
import { Setting } from "@/components/models/setting";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import { SETUP_NAVS } from "@/components/constants/links";
import Button, { ButtonType } from "@/components/shared/Button";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const settingStatus = useSelector(({ setting }: { setting: Setting }) => setting.status);

  useEffect(() => {
    const cleanUp = setTimeout(
      () => {
        // Check setting status
        if (!settingStatus) {
          dispatch(addAlert({
            id: Math.floor(Math.random() * 100000) + 1,
            visible: true,
            type: "warning",
            message: "Please complete the Settings first!"
          }));
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
  }, [dispatch, settingStatus, router]);

  return (
    <>
      <PageHead title="Settings" />
      <Layout
        isSetup
        footerOneliner="Completed the Setting? start accepting Payments!"
      >
        <div className="min-h-screen flex items-center justify-center p-2">
          {settingStatus ? (
            <form className="bg-gray-800 rounded-lg shadow-md px-6 py-4">
              <label
                className="block font-medium text-gray-100 mb-2"
                htmlFor="name"
              >
                Amount
              </label>
              <div className="mb-4 flex">
                <span className="inline-flex items-center px-3 text-sm bg-gray-800 border border-r-0 border-gray-300 text-gray-300 rounded-l-md">
                  USD
                </span>
                <input
                  className="rounded-none rounded-r-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="10.25"
                />
              </div>
              <Button type={ButtonType.Primary}>Start Payment</Button>
            </form>
          ) : (<h1>Setup not completed!</h1>)}
        </div>
      </Layout>
    </>
  );
}
