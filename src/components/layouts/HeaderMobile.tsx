import { useSelector } from "react-redux";
import { NavState } from "@/components/constants/slices";
import Image from "next/image";
import Link from "next/link";
import Button, { ButtonType } from "@/components/shared/Button";
import headerLogo from "@/public/header-logo.png";
import { useRouter } from "next/router";

export default function HeaderMobile() {
  const router = useRouter();
  const navOption = useSelector(({ nav }: { nav: NavState }) => nav);

  return (
    <header className="bg-white shadow-lg h-18 md:flex fixed top-0 w-full z-10 md:hidden">
      <div className="py-2">
        <div className="flex items-center px-3">
          <Link
            href={navOption.index}
            className="flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8"
          >
            <Image src={headerLogo} className="h-16 max-w-min" alt="Logo" />
          </Link>
          <div className="ml-auto flex-shrink-0">
            {navOption.type === "gateway" && router.pathname != "/gateway/connect" && (
              <Button theme={ButtonType.Primary} isFullWidth pulse thunderIcon>
                Connect Wallet
              </Button>
            )}
            {navOption.type === "main" && router.pathname != "/setup/settings" && (
              <Button theme={ButtonType.Primary} isFullWidth onClick={() => router.push("/setup/settings")}>
                Go to Settings
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
