import { ChangeEvent } from "react";
import Image from "next/image";
import Badge from "@/components/shared/Badge";
import { NetworkOptions } from "@/components/models/network";

export default function Networks({
  networks,
  isTest,
  onToggleNetwork,
}: {
  networks: NetworkOptions[]
  isTest?: boolean;
  onToggleNetwork: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <h3 className="mb-2 text-lg font-medium text-gray-900">Allow {isTest && "Test"} Networks</h3>
      <ul className="grid w-full gap-2 md:grid-cols-4 grid-cols-2 mb-6">
        {networks.map((network: NetworkOptions) => (
          <li key={network.network}>
            <input
              type="checkbox"
              id={network.network}
              value={network.network}
              className="hidden peer"
              defaultChecked={network.selected && true}
              onChange={onToggleNetwork}
            />
            <label htmlFor={network.network} className="inline-flex items-center justify-center w-full h-28 p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-orange-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50 text-center relative">
              <div className="block">
                <Image src={network.icon} width="40" height="40" alt={network.title} className="mx-auto mb-1" />
                <div className="w-full text-md font-semibold">{network.symbol}</div>
                <div className="w-full text-xs">{network.title}</div>
                {network.isTest && <Badge className="absolute top-0 left-0">Test Network</Badge>}
              </div>
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}