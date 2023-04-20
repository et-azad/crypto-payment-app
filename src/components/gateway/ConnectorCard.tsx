import Image from "next/image";
import { Connector } from 'wagmi';
import { SyncLoader } from "react-spinners";
import { ConnectorOptions } from "@/components/models/connector";
import Button, { ButtonType } from "@/components/shared/Button";

export default function ConnectorCard({
  connector,
  onConnect,
  isLoading,
  pendingConnector,
}: {
  connector: ConnectorOptions;
  onConnect: (connectorId: string) => void;
  isLoading: boolean;
  pendingConnector?: Connector;
}) {

  return (
    <div className="wrapper antialiased text-gray-900 h-full w-full md:w-72">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Image
          src={connector.icon}
          alt={connector.title}
          width={150}
          height={150}
          className="w-full object-cover object-center rounded-xl shadow-md border-dashed border-2 border-orange-500 transition duration-300 hover:scale-105 p-2" />
        <h1 className="text-3xl font-bold py-2 tracking-tight text-gray-900 mb-0">{connector.title}</h1>
        <p className="text-md text-gray-600 mb-2">{connector.description}</p>
        <Button
          theme={isLoading ? (connector.connector === pendingConnector?.id ? ButtonType.Primary : ButtonType.Secondary) : ButtonType.Primary}
          onClick={() => onConnect(connector.connector)}
          isFullWidth
          pulse={!isLoading}
          disabled={isLoading}
        >
          {isLoading && connector.connector === pendingConnector?.id ? (
            <SyncLoader className="py-2 px-4" color="#ffffff" size={10} />
          ) : "Connect"}
        </Button>
      </div>
    </div>
  )
}