import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { NavLink } from "@/components/models/link";
import { NavState } from "@/components/constants/slices";
import Button, { ButtonType } from "@/components/shared/Button";
import headerLogo from "@/public/header-logo.png";

export default function HeaderDesktop() {
  const router = useRouter();
  const navOption = useSelector(({ nav }: { nav: NavState }) => nav);
  const path = useRouter().pathname;

  return (
    <header className="bg-white shadow-lg h-18 hidden md:flex fixed top-0 w-full z-10 py-2">
      <Link
        href={navOption.index}
        className="flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8"
      >
        <Image src={headerLogo} className="h-16 max-w-min" alt="Logo" />
      </Link>
      <nav className="header-links contents font-semibold text-base lg:text-lg">
        <ul className="flex items-center ml-4 xl:ml-8 mr-auto">
          {navOption.show &&
            navOption.links.map((navs: NavLink, idx: number) => (
              <li key={idx} className="p-3">
                <Link
                  href={navs.href}
                  className={`p-3 rounded-md ${path === navs.href
                    ? `shadow-md border-dashed border-2 border-orange-500`
                    : `hover:shadow-xl hover:border-dashed hover:border-2 hover:border-orange-500`
                    }`}
                >
                  <span>{navs.lable}</span>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <div className="flex items-center px-4 lg:px-6 xl:px-8">
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
    </header>
  );
}
