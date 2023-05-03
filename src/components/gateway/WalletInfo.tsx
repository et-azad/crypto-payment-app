import { useEffect, useState } from "react";
import { useDisconnect } from 'wagmi';
import Image from "next/image";
import { Chain } from "wagmi";
import { HashLoader } from "react-spinners";
import { NetworkOptions } from "@/components/models/network";
import { NETWORKS, TEST_NETWORKS } from "@/components/constants/network";
import AlertCard from "@/components/shared/AlertCard";

export default function WalletInfo({
  walletAddress,
  connectedNetwork,
}: {
  walletAddress: `0x${string}` | undefined;
  connectedNetwork: (Chain & {
    unsupported?: boolean | undefined;
  }) | undefined;
}) {
  const [networkDetails, setNetworkDetails] = useState<NetworkOptions>();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    let findNetwork = NETWORKS.find(network => network.id === connectedNetwork?.id);
    if (!findNetwork?.id) findNetwork = TEST_NETWORKS.find(network => network.id === connectedNetwork?.id);
    if (findNetwork?.id) setNetworkDetails(findNetwork);
    else setNetworkDetails(undefined);
  }, [connectedNetwork])

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {networkDetails?.icon ? (
          <Image src={networkDetails.icon} width={140} height={140} alt="Networks"
            className="bg-white border-orange-100 rounded-full align-middle border-8 absolute -m-14 -ml-18 lg:-ml-16 max-w-[150px]" />
        ) : (
          <HashLoader className="py-2 px-4 absolute -m-14 -ml-18 lg:-ml-16 max-w-[150px]" color="#f97316" size={80} />
        )}
      </div>
      <span
        className="m-2 float-right bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-orange-400 cursor-pointer absolute top-0 right-0"
        onClick={() => disconnect()}
      >
        Disconnect
      </span>
      <div className="mt-24 text-center">
        <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700">
          {networkDetails?.title}
        </h3>
        <p className="text-gray-500 text-xs">({walletAddress})</p>
      </div>
      {connectedNetwork?.unsupported && <AlertCard><b>Network Not Supported</b><br />Please change the network to complete payment.</AlertCard>}
      {!connectedNetwork?.unsupported && connectedNetwork?.testnet && (
        <>
          <span
            className="m-2 float-right bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-red-400 absolute top-0 left-0">
            Test Network
          </span>
          <AlertCard>This is <b>Test Netwrok</b>. Payment will be marked as <b>Test Payment</b>.</AlertCard>
        </>
      )}
    </>
  )
}