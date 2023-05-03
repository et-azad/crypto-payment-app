import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useAccount,
  useNetwork,
  useDisconnect,
} from 'wagmi';
import { useSwitchNetwork, useBalance } from 'wagmi';
import { Chain } from "wagmi";
import { HashLoader, } from "react-spinners";
import useErrors from "@/hooks/useErrors";
import useToast from "@/hooks/useToast";
import WalletInfo from "@/components/gateway/WalletInfo";
import PaymentInfo from "@/components/gateway/PaymentInfo";
import SwitchNetwork from "@/components/gateway/SwitchNetwork";
import AlertCard from "@/components/shared/AlertCard";

export default function WalletDetails() {
  const [checkConnection, setCheckConnection] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<`0x${string}` | undefined>(undefined);
  const [connectedNetwork, setConnectedNetwork] = useState<(Chain & { unsupported?: boolean | undefined; }) | undefined>(undefined);

  const router = useRouter();
  const { pushToast } = useToast();
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { data: balanceData, isFetched } = useBalance({
    address: address
  });

  useErrors(error);

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
              (isFetched && (+(balanceData?.formatted || 0) > 0) ?
                <PaymentInfo connectedNetwork={connectedNetwork} /> :
                <AlertCard>No funds! Unable to complete transaction</AlertCard>)
              :
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