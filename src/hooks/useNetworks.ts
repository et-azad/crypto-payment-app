import {
  mainnet,
  bsc,
  polygon,
  avalanche,
  fantom,
  iotex,
  optimism,
  celo,
  goerli,
  bscTestnet,
  polygonMumbai,
  avalancheFuji,
  fantomTestnet,
  iotexTestnet,
  optimismGoerli,
  celoAlfajores,
  Chain,
} from "@wagmi/chains";
import { NetworkOptions } from "@/components/models/network";

export default function useNetworks(
  networks: NetworkOptions[],
  type: "main" | "test" = "main"
): { allowedNetworks: Chain[] } {
  const allowedNetworks: Chain[] = [];
  switch (type) {
    case "main":
      networks.forEach((network) => {
        if (network.selected) {
          switch (network.network) {
            case "mainnet":
              allowedNetworks.push(mainnet);
              break;
            case "bsc":
              allowedNetworks.push(bsc);
              break;
            case "polygon":
              allowedNetworks.push(polygon);
              break;
            case "avalanche":
              allowedNetworks.push(avalanche);
              break;
            case "fantom":
              allowedNetworks.push(fantom);
              break;
            case "iotex":
              allowedNetworks.push(iotex);
              break;
            case "optimism":
              allowedNetworks.push(optimism);
              break;
            case "celo":
              allowedNetworks.push(celo);
              break;
            default:
              throw new Error(`Unknown network - ${network.network}`);
              break;
          }
        }
      });
      break;
    case "test":
      networks.forEach((network) => {
        if (network.selected) {
          switch (network.network) {
            case "goerli":
              allowedNetworks.push(goerli);
              break;
            case "bscTestnet":
              allowedNetworks.push(bscTestnet);
              break;
            case "polygonMumbai":
              allowedNetworks.push(polygonMumbai);
              break;
            case "avalancheFuji":
              allowedNetworks.push(avalancheFuji);
              break;
            case "fantomTestnet":
              allowedNetworks.push(fantomTestnet);
              break;
            case "iotexTestnet":
              allowedNetworks.push(iotexTestnet);
              break;
            case "optimismGoerli":
              allowedNetworks.push(optimismGoerli);
              break;
            case "celoAlfajores":
              allowedNetworks.push(celoAlfajores);
              break;
            default:
              throw new Error(`Unknow network - ${network.network}`);
              break;
          }
        }
      });
      break;
    default:
      throw new Error("Unknow type");
      break;
  }

  return {
    allowedNetworks,
  };
}
