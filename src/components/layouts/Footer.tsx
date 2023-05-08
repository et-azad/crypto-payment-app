import Button, { ButtonType } from "@/components/shared/Button";
import { useSelector } from "react-redux";
import { NavState } from "@/components/constants/slices";
import { Setting } from "@/components/models/setting";
import { useRouter } from "next/router";

export default function Footer({
  isSetup,
  footerOneliner,
}: {
  isSetup: boolean;
  footerOneliner: string;
}) {
  const router = useRouter();
  const navOption = useSelector(({ nav }: { nav: NavState }) => nav);
  const { status, options } = useSelector(({ setting }: { setting: Setting }) => setting);

  return (
    <>
      {status && router.pathname != "/setup/pay" && (
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
                {navOption.type == "main" ? (
                  <Button theme={ButtonType.Primary} isFullWidth pulse onClick={() => router.push("/setup/pay")}>
                    Pay Now
                  </Button>
                ) : (
                  <p className="font-medium text-[16px] flex items-center justify-center px-5 py-2 rounded-xl text-white shadow-glass w-full">
                    Session will expire in - <span className="text-orange-400 ml-1">10:00
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
