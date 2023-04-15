import Image from "next/image";
import Button, { ButtonType } from "@/components/shared/Button";
import { ConnectorOptions } from "@/components/models/connector";

export default function AvailableConnectors({ connectors }: { connectors: ConnectorOptions[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {connectors.map((connector: ConnectorOptions) => {
        if (connector.active && connector.selected) return (
          <div key={connector.connector} className="wrapper antialiased text-gray-900 h-full w-full md:w-72">
            <div
              className="bg-white p-4 rounded-lg shadow-lg">
              <Image src={connector.icon} alt="" width={150} height={150}
                className="w-full object-cover object-center rounded shadow-md border-dashed border-2 border-orange-500 transition duration-300 hover:scale-105 p-2" />
              <h1 className="text-3xl font-bold py-2 tracking-tight text-gray-900 mb-0">{connector.title}</h1>
              <p className="text-md text-gray-600 mb-2">{connector.description}</p>
              <Button pulse theme={ButtonType.Primary} isFullWidth>Connect</Button>
            </div>
          </div>
        )
      })}
    </div>
  );
}