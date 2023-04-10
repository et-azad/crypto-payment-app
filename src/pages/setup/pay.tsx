import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setNav } from "@/store/slices/nav";
import { addAlert } from "@/store/slices/alert";
import { Setting } from "@/components/models/setting";
import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import Input from "@/components/shared/Input";
import { SETUP_NAVS } from "@/components/constants/links";
import Button, { ButtonType } from "@/components/shared/Button";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const settingStatus = useSelector(({ setting }: { setting: Setting }) => setting.status);
  const [amount, setAmount] = useState(null);

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
          // router.replace("settings");
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
        <div className="w-full md:w-4/12">
          {!settingStatus ? (
            <form className="rounded-lg shadow-md px-4 py-6">
              <Input type="number" name="amount" label="Enter Amount (in USD)" />
              <Button type="submit" theme={ButtonType.Primary}>Start Payment</Button>
            </form>
          ) : (<h1>Setup not completed!</h1>)}
        </div>
      </Layout>
    </>
  );
}
