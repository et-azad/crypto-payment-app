import { ConnectorOptions } from "@/components/models/connector";

export const CONNECTORS: ConnectorOptions[] = [
  {
    active: true,
    connector: "MetaMaskConnector",
    title: "MetaMask",
    description: "",
    icon: "/connectors/metamask.svg",
  },
  {
    active: true,
    connector: "WalletConnectConnector",
    title: "WalletConnect",
    description: "",
    icon: "/connectors/walletconnect.svg",
  },
  {
    active: true,
    connector: "CoinbaseWalletConnector",
    title: "Coinbase Wallet",
    description: "",
    icon: "/connectors/coinbase.svg",
  },
];
