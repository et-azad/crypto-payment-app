import { ConnectorOptions } from "@/components/models/connector";

export const CONNECTORS: ConnectorOptions[] = [
  {
    active: true,
    selected: true,
    connector: "metaMask",
    title: "MetaMask",
    description: "Connect with your MetaMask wallet",
    icon: "/connectors/metamask.svg",
  },
  {
    active: true,
    selected: false,
    connector: "walletConnect",
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
    connector: "coinbaseWallet",
    title: "Coinbase Wallet",
    description: "Connect with your Coinbase wallet",
    icon: "/connectors/coinbase.svg",
    hasKey: true,
    keyName: "apiKey",
    keyInfo: "Api Key",
    key: "",
  },
];
