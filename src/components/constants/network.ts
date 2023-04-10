import { NetworkOptions } from "@/components/models/network";

export const TEST_NETWORKS: NetworkOptions[] = [
  {
    active: true,
    selected: true,
    network: "testnet",
    symbol: "ETH",
    title: "Ethereum Testnet",
    description: "",
    icon: "/connectors/metamask.svg",
  },
  {
    active: true,
    selected: false,
    network: "mumbai",
    symbol: "MATIC",
    title: "Mumbai Testnet",
    description: "",
    icon: "/connectors/metamask.svg",
  },
];

export const NETWORKS: NetworkOptions[] = [
  {
    active: true,
    selected: true,
    network: "mainnet",
    symbol: "ETH",
    title: "Ethereum Mainnet",
    description: "",
    icon: "/connectors/metamask.svg",
  },
  {
    active: true,
    selected: false,
    network: "polygon",
    symbol: "MATIC",
    title: "Polygon Mainnet",
    description: "",
    icon: "/connectors/metamask.svg",
  },
  {
    active: true,
    selected: false,
    network: "solana",
    symbol: "SOL",
    title: "Solana Mainnet",
    description: "",
    icon: "/connectors/metamask.svg",
  },
  {
    active: true,
    selected: false,
    network: "binance",
    symbol: "BNB",
    title: "Binance Smart Chain",
    description: "",
    icon: "/connectors/metamask.svg",
  },
];
