import { ProviderOptions } from "@/components/models/provider";
import { providers } from "ethers";
import { Chain, ChainProviderFn, WebSocketProvider } from "@wagmi/core";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";

export default function useProviders(
  provider: ProviderOptions,
  providerApiKey: string
): {
  allowedProviders: ChainProviderFn<
    Chain,
    providers.StaticJsonRpcProvider,
    WebSocketProvider
  >[];
} {
  const allowedProviders: ChainProviderFn<
    Chain,
    providers.StaticJsonRpcProvider,
    WebSocketProvider
  >[] = [];
  switch (provider.provider) {
    case "public":
      allowedProviders.push(publicProvider());
      break;
    case "infura":
      if (providerApiKey)
        allowedProviders.push(infuraProvider({ apiKey: providerApiKey }));
      else throw new Error(`Infura API key is missing`);
      break;
    case "alchemy":
      if (providerApiKey)
        allowedProviders.push(alchemyProvider({ apiKey: providerApiKey }));
      else throw new Error(`Alchemy API key is missing`);
      break;
    default:
      throw new Error(`Unknown provider - ${provider.provider}`);
      break;
  }

  return {
    allowedProviders,
  };
}
