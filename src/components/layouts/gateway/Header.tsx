import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useAccount,
  useNetwork,
} from 'wagmi';
import useToast from "@/hooks/useToast";
import { NetworkOptions } from "@/components/models/network";
import { NETWORKS, TEST_NETWORKS } from "@/components/constants/network";
import HeaderDesktop from "@/components/layouts/gateway/HeaderDesktop";
import HeaderMobile from "@/components/layouts/gateway/HeaderMobile";

export default function Header() {
  const [networkDetails, setNetworkDetails] = useState<NetworkOptions>();
  const [checkConnection, setCheckConnection] = useState<boolean>(false);
  const router = useRouter();
  const { pushToast } = useToast();

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const handleCancel = useCallback(() => {
    pushToast("warning", "Payment has been cancelled!");
    router.replace("/setup/pay");
  }, [pushToast, router])

  useEffect(() => {
    setCheckConnection(isConnected);
    let findNetwork = NETWORKS.find(network => network.id === chain?.id);
    if (!findNetwork?.id) findNetwork = TEST_NETWORKS.find(network => network.id === chain?.id);
    if (findNetwork?.id) setNetworkDetails(findNetwork);
    else setNetworkDetails(undefined);
  }, [
    isConnected,
    chain
  ])

  return (
    <>
      <HeaderDesktop
        isConnect={checkConnection}
        walletAddress={address}
        connectedNetwork={chain}
        networkDetails={networkDetails}
        onCancel={handleCancel}
      />
      <HeaderMobile
        isConnect={checkConnection}
        walletAddress={address}
        connectedNetwork={chain}
        networkDetails={networkDetails}
        onCancel={handleCancel}
      />
    </>
  );
}
