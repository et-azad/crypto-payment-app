import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Button, { ButtonType } from "@/components/shared/Button";
import headerLogo from "@/public/header-logo.png";
import { GATEWAY_NAVS } from "@/components/constants/links";

export default function HeaderDesktop() {
  const router = useRouter();
  const path = router.pathname;

  return (
    <header className="bg-white shadow-lg h-18 hidden md:flex fixed top-0 w-full z-10 py-2">
      <Link
        href="/"
        className="flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8"
      >
        <Image src={headerLogo} className="h-16 max-w-min" alt="Logo" />
      </Link>
      <nav className="header-links contents font-semibold text-base lg:text-lg">
        <ul className="flex items-center ml-4 xl:ml-8 mr-auto">
          {GATEWAY_NAVS.map((navs, idx: number) => (
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
        <Button theme={ButtonType.Primary} isFullWidth pulse thunderIcon>
          Wallet Details
        </Button>
      </div>
    </header>
  );
}
