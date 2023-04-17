import { Chain, Connector } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { ConnectorOptions } from "@/components/models/connector";

export default function useConnectors(
  connectors: ConnectorOptions[],
  chains: Chain[]
): { allowedConnectors: Connector[] } {
  const allowedConnectors: Connector[] = [];
  connectors.forEach((connector) => {
    if (connector.selected) {
      switch (connector.connector) {
        case "metaMask":
          allowedConnectors.push(new MetaMaskConnector({ chains }));
          break;
        case "walletConnect":
          if (connector.key) {
            allowedConnectors.push(
              new WalletConnectConnector({
                chains,
                options: {
                  projectId: connector.key,
                },
              })
            );
          } else
            throw new Error(
              "WalletConnect is selected but not provided the Project Id"
            );
          break;
        case "coinbaseWallet":
          if (connector.key) {
            allowedConnectors.push(
              new CoinbaseWalletConnector({
                chains,
                options: {
                  appName: connector.key,
                },
              })
            );
          } else
            throw new Error(
              "Coinbase wallet is selected but not provided the App Name."
            );
          break;
        default:
          throw new Error(`Unknown connector - ${connector.connector}`);
          break;
      }
    }
  });

  return {
    allowedConnectors,
  };
}
