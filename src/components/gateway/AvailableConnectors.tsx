import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect, useAccount } from 'wagmi';
import useErrors from "@/hooks/useErrors";
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

  useErrors(error);

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