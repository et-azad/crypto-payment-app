import { useCallback, useEffect } from "react";
import { useConnect } from 'wagmi';
import useToast from "@/hooks/useToast";
import Image from "next/image";
import { SyncLoader } from "react-spinners";
import { ConnectorOptions } from "@/components/models/connector";
import Button, { ButtonType } from "@/components/shared/Button";

export default function AvailableConnectors({ availableConnector }: { availableConnector: ConnectorOptions[] }) {
  const { connect, connectors, pendingConnector, isLoading, error } = useConnect();
  const { pushToast } = useToast();

  const handleConnect = useCallback((connectorId: any) => {
    const connector = connectors.find(connector => connector.id === connectorId);
    if (connector) connect({ connector });
    else pushToast("error", "Something went wrong please try again later");
  }, [connect, pushToast, connectors])

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

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {availableConnector.map((connector: ConnectorOptions) => {
        if (connector.active && connector.selected) return (
          <div key={connector.connector} className="wrapper antialiased text-gray-900 h-full w-full md:w-72">
            <div
              className="bg-white p-4 rounded-lg shadow-lg">
              <Image src={connector.icon} alt="" width={150} height={150}
                className="w-full object-cover object-center rounded shadow-md border-dashed border-2 border-orange-500 transition duration-300 hover:scale-105 p-2" />
              <h1 className="text-3xl font-bold py-2 tracking-tight text-gray-900 mb-0">{connector.title}</h1>
              <p className="text-md text-gray-600 mb-2">{connector.description}</p>
              <Button
                theme={isLoading ? (connector.connector === pendingConnector?.id ? ButtonType.Primary : ButtonType.Secondary) : ButtonType.Primary}
                onClick={() => handleConnect(connector.connector)}
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
      })}
    </div>
  );
}