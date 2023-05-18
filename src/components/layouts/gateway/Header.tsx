import { useEffect, useState } from "react";
import {
  useAccount,
  useNetwork,
} from 'wagmi';
import { Chain } from "wagmi";
import { NetworkOptions } from "@/components/models/network";
import { NETWORKS, TEST_NETWORKS } from "@/components/constants/network";
import HeaderDesktop from "@/components/layouts/gateway/HeaderDesktop";
import HeaderMobile from "@/components/layouts/gateway/HeaderMobile";

export default function Header() {
  const [checkConnection, setCheckConnection] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<`0x${string}` | undefined>(undefined);
  const [connectedNetwork, setConnectedNetwork] = useState<(Chain & { unsupported?: boolean | undefined; }) | undefined>(undefined);
  const [networkDetails, setNetworkDetails] = useState<NetworkOptions>();

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();


  useEffect(() => {
    const cleanUp = setTimeout(() => {
      setCheckConnection(isConnected);
      setWalletAddress(address);
      setConnectedNetwork(chain);
      let findNetwork = NETWORKS.find(network => network.id === chain?.id);
      if (!findNetwork?.id) findNetwork = TEST_NETWORKS.find(network => network.id === chain?.id);
      if (findNetwork?.id) setNetworkDetails(findNetwork);
      else setNetworkDetails(undefined);
    }, 1000)

    return () => clearTimeout(cleanUp);
  }, [
    isConnected,
    address,
    chain
  ])

  return (
    <>
      <HeaderDesktop
        isConnect={checkConnection}
        walletAddress={walletAddress}
        connectedNetwork={connectedNetwork}
        networkDetails={networkDetails}
      />
      <HeaderMobile
        isConnect={checkConnection}
        walletAddress={walletAddress}
        connectedNetwork={connectedNetwork}
        networkDetails={networkDetails}
      />
    </>
  );
}
