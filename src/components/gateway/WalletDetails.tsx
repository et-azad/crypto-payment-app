import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useAccount,
  useNetwork,
  useDisconnect,
} from 'wagmi'
import useToast from "@/hooks/useToast";
import WalletInfo from "@/components/gateway/WalletInfo";
import PaymentInfo from "@/components/gateway/PaymentInfo";
import { HashLoader } from "react-spinners";

export default function WalletDetails() {
  const [checkConnection, setCheckConnection] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<`0x${string}` | undefined>(undefined);
  const router = useRouter();
  const { pushToast } = useToast();
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { disconnect } = useDisconnect();

  // console.log(chain, chains);

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      if (!isConnected) {
        setCheckConnection(false);
        router.replace("/gateway/connect");
        pushToast("success", "Wallet disonnected!");
      } else setCheckConnection(true);
      setWalletAddress(address);
    }, 100)
    return () => clearTimeout(cleanUp);
  }, [
    router,
    pushToast,
    isConnected,
    address
  ])

  return (
    <>
      {checkConnection ? (
        <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white shadow-2xl rounded-xl pt-4">
          <div className="pb-6">
            <WalletInfo walletAddress={walletAddress} />
            <PaymentInfo />
          </div>
        </div>
      ) : (<HashLoader className="py-2 px-4" color="#f97316" />)}
    </>
  );
}