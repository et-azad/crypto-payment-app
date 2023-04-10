import { ProviderOptions } from "@/components/models/provider";

export const DEFAULT_PROVIDER: ProviderOptions = {
  provider: "public",
  title: "Public Provider",
  hasApiKey: false,
};

export const PROVIDERS: ProviderOptions[] = [
  {
    provider: "alchemy",
    title: "Alchemy",
    icon: "/providers/alchemy.svg",
    hasApiKey: true,
    apiKey: "",
  },
  {
    provider: "infura",
    title: "Infura",
    icon: "/providers/infura.svg",
    hasApiKey: true,
    apiKey: "",
  },
  {
    provider: "public",
    title: "Public Provider",
    hasApiKey: false,
  },
];
