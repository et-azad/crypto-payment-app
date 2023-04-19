import { useEffect, useState } from "react";
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
            className="bg-white dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-14 -ml-18 lg:-ml-16 max-w-[150px]" />
        ) : (
          <HashLoader className="py-2 px-4 absolute -m-14 -ml-18 lg:-ml-16 max-w-[150px]" color="#f97316" size={80} />
        )}
      </div>
      <div className="mt-20 text-center">
        <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
          {networkDetails?.title}
        </h3>
        <p className="text-gray-500 text-xs">({walletAddress})</p>
      </div>
      {connectedNetwork?.unsupported && <AlertCard><b>Network Not Supported</b><br />Please change the network to complete payment.</AlertCard>}
      {!connectedNetwork?.unsupported && connectedNetwork?.testnet && (
        <>
          <span
            className="m-2 float-right bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 absolute top-0 right-0">
            Test Network
          </span>
          <AlertCard>This is <b>Test Netwrok</b>. Payment will be marked as <b>Test Payment</b>.</AlertCard>
        </>
      )}
    </>
  )
}