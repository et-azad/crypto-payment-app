import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect, useAccount } from 'wagmi';
import useToast from "@/hooks/useToast";
import { ConnectorOptions } from "@/components/models/connector";
import ConnectorCard from "@/components/gateway/ConnectorCard";
import { HashLoader } from "react-spinners";

export default function AvailableConnectors({ availableConnector }: { availableConnector: ConnectorOptions[] }) {
  const [checkConnection, setCheckConnection] = useState(false);
  const router = useRouter();
  const { pushToast } = useToast();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { isConnected } = useAccount();

  const handleConnect = useCallback((connectorId: string) => {
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

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      if (isConnected) {
        setCheckConnection(isConnected);
        router.replace("/gateway/pay")
        pushToast("success", "Wallet connected!");
      }
    }, 100)
    return () => clearTimeout(cleanUp);
  }, [router, isConnected, pushToast])

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {!checkConnection ? availableConnector.map((connector: ConnectorOptions) => {
        if (connector.active && connector.selected)
          return (
            <ConnectorCard
              key={connector.connector}
              connector={connector}
              onConnect={handleConnect}
              isLoading={isLoading}
              pendingConnector={pendingConnector}
            />
          )
      }) : (<HashLoader className="py-2 px-4" color="#f97316" />)}
    </div>
  );
}