import { ProviderOptions } from "@/components/models/provider";

export const PROVIDERS: ProviderOptions[] = [
  {
    provider: "alchemy",
    title: "Alchemy",
    icon: "/providers/alchemy.svg",
    hasApiKey: true,
  },
  {
    provider: "infura",
    title: "Infura",
    icon: "/providers/infura.svg",
    hasApiKey: true,
  },
  {
    provider: "public",
    title: "Public Provider",
    hasApiKey: false,
  },
];
