import Image from "next/image";
import Link from "next/link";
import Button, { ButtonType } from "@/components/shared/Button";
import headerLogo from "@/public/header-logo.png";

export default function HeaderMobile() {

  return (
    <header className="bg-white shadow-lg h-18 md:flex fixed top-0 w-full z-10 md:hidden">
      <div className="py-2">
        <div className="flex items-center px-3">
          <Link
            href="/"
            className="flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8"
          >
            <Image src={headerLogo} className="h-16 max-w-min" alt="Logo" />
          </Link>
          <div className="ml-auto flex-shrink-0">
            <Button theme={ButtonType.Primary} isFullWidth pulse thunderIcon>
              Wallet Details
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
