import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Chain, useDisconnect } from "wagmi";
import { NetworkOptions } from "@/components/models/network";
import Button, { ButtonType } from "@/components/shared/Button";
import headerLogo from "@/public/header-logo.png";

export default function HeaderDesktop({
  isConnect,
  walletAddress,
  connectedNetwork,
  networkDetails,
  onCancel,
}: {
  isConnect: boolean;
  walletAddress: `0x${string}` | undefined;
  connectedNetwork: (Chain & {
    unsupported?: boolean | undefined;
  }) | undefined;
  networkDetails: NetworkOptions | undefined;
  onCancel: () => void;
}) {
  const router = useRouter();
  const path = router.pathname;
  const [showOptions, setShowOptions] = useState(false);
  const { disconnect } = useDisconnect();

  return (
    <header className="bg-white shadow-lg h-18 hidden md:flex fixed top-0 w-full z-10 py-2">
      <Link
        href="/"
        className="flex-shrink-0 flex items-center justify-center px-4 lg:px-6 xl:px-8"
      >
        <Image src={headerLogo} className="h-16 max-w-min" alt="Logo" />
      </Link>
      <nav className="header-links contents font-semibold text-base lg:text-lg">
        <div className="flex items-center ml-4 xl:ml-8 mr-auto">
          <Button onClick={onCancel}>Cancel Payment</Button>
        </div>
      </nav>
      {path != "/gateway/connect" && isConnect && (
        <>
          <div className="flex items-center px-4 lg:px-6 xl:px-8">
            <Button theme={ButtonType.Primary} isFullWidth pulse thunderIcon={!networkDetails?.icon} onClick={() => setShowOptions(prev => !prev)}>
              {walletAddress}
              {networkDetails?.icon && (
                <span
                  className="pl-1 bg-gray-100 p-1 rounded-full text-purple-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <Image src={networkDetails?.icon} width={10} height={10} className="h-6 w-6" alt="" />
                </span>
              )}
            </Button>
          </div>
          {showOptions && (
            <div className="origin-top-right absolute right-7 top-16 mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              <div className="py-1" role="none">
                {connectedNetwork?.blockExplorers?.default.url && (
                  <Link href={`${connectedNetwork?.blockExplorers?.default.url}/address/${walletAddress}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" target="_blank">View on {connectedNetwork?.blockExplorers?.default.name}</Link>

                )}
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem" onClick={onCancel}>Cancel Payment</div>
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem" onClick={() => disconnect()}>Diconnect</div>
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
}
