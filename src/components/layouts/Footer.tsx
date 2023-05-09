import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Setting } from "@/components/models/setting";
import Button, { ButtonType } from "@/components/shared/Button";

export default function Footer({
  footerOneliner,
}: {
  footerOneliner: string;
}) {
  const router = useRouter();
  const path = router.pathname;
  const { status, options } = useSelector(({ setting }: { setting: Setting }) => setting);

  return (
    <>
      {status && path != "/setup/pay" && (
        <footer className="bg-gray-900 py-2 fixed bottom-0 w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              {footerOneliner !== "" && (
                <div className="w-0 flex-1 flex items-center">
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="hidden md:inline">{footerOneliner}</span>
                  </p>
                </div>
              )}
              <div className="order-3 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <Button theme={ButtonType.Primary} isFullWidth pulse onClick={() => router.push("/setup/pay")}>
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
