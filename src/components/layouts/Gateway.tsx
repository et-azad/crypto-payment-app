import { ReactNode, useMemo } from "react";
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import useNetworks from "@/hooks/useNetworks";

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { useSelector } from "react-redux";
import { Setting } from "@/components/models/setting";
import useConnectors from "@/hooks/useConnectors";

export default function Gateway({ children }: { children: ReactNode }) {
  const setting = useSelector(({ setting }: { setting: Setting }) => setting);
  const { _connectors, _provider, _providerApiKey, _networks, _testNetworks } = setting.options;
  const { allowedNetworks } = useNetworks(_networks);
  const { allowedNetworks: allowedTestNetworks } = useNetworks(_testNetworks, "test");

  // Configure chains & providers with the Alchemy provider.
  // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
  const { chains, provider, webSocketProvider } = configureChains(
    [...allowedNetworks, ...allowedTestNetworks],
    [publicProvider()],
  )

  const { allowedConnectors } = useConnectors(_connectors, chains);

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: allowedConnectors,
    provider,
    webSocketProvider,
  })

  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}