import { ConnectorOptions } from "@/components/models/connector";

export const CONNECTORS: ConnectorOptions[] = [
  {
    active: true,
    selected: true,
    connector: "MetaMaskConnector",
    title: "MetaMask",
    description: "Connect with your MetaMask wallet",
    icon: "/connectors/metamask.svg",
  },
  {
    active: true,
    selected: false,
    connector: "WalletConnectConnector",
    title: "WalletConnect",
    description: "Scan the QR code to connect wallet",
    icon: "/connectors/walletconnect.svg",
    hasKey: true,
    keyName: "projectId",
    keyInfo: "Project Id",
    key: "",
  },
  {
    active: true,
    selected: false,
    connector: "CoinbaseWalletConnector",
    title: "Coinbase Wallet",
    description: "Connect with your Coinbase wallet",
    icon: "/connectors/coinbase.svg",
    hasKey: true,
    keyName: "apiKey",
    keyInfo: "Api Key",
    key: "",
  },
];
