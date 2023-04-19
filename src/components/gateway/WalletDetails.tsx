import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useAccount,
  useNetwork,
  useDisconnect,
} from 'wagmi';
import { useSwitchNetwork } from 'wagmi';
import { Chain } from "wagmi";
import { HashLoader, } from "react-spinners";
import useToast from "@/hooks/useToast";
import WalletInfo from "@/components/gateway/WalletInfo";
import PaymentInfo from "@/components/gateway/PaymentInfo";
import SwitchNetwork from "@/components/gateway/SwitchNetwork";

export default function WalletDetails() {
  const [checkConnection, setCheckConnection] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<`0x${string}` | undefined>(undefined);
  const [connectedNetwork, setConnectedNetwork] = useState<(Chain & { unsupported?: boolean | undefined; }) | undefined>(undefined);

  const router = useRouter();
  const { pushToast } = useToast();
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      console.log(error);
      if (error)
        switch (error.name) {
          case "UserRejectedRequestError":
            pushToast("error", "Connection request rejected");
            break;
          case "ConnectorAlreadyConnectedError":
            pushToast("warning", "You are already connected");
            break;
          default:
            pushToast("error", error.name);
            break;
        }
    }, 200);
    return () => clearTimeout(cleanUp);
  }, [error, pushToast])

  useEffect(() => {
    setCheckConnection(isConnected);
    setWalletAddress(address);
    setConnectedNetwork(chain);
    if (!isConnected) router.replace("/gateway/connect");
  }, [
    router,
    pushToast,
    isConnected,
    address,
    chain
  ])

  return (
    <>
      {checkConnection ? (
        <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white shadow-2xl rounded-xl pt-4">
          <div className="pb-6">
            <WalletInfo
              walletAddress={walletAddress}
              connectedNetwork={connectedNetwork}
            />
            {!chain?.unsupported ?
              <PaymentInfo /> :
              <SwitchNetwork
                suggestedNetwork={chains[0]}
                switchNetwork={switchNetwork}
                isLoading={isLoading}
                pendingChainId={pendingChainId}
              />
            }
          </div>
        </div>
      ) : (<HashLoader className="py-2 px-4" color="#f97316" />)}
    </>
  );
}