import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { Setting } from "@/components/models/setting";
import useNetworks from "@/hooks/useNetworks";
import useProviders from "@/hooks/useProviders";
import useConnectors from "@/hooks/useConnectors";

export default function Gateway({ children }: { children: ReactNode }) {
  const setting = useSelector(({ setting }: { setting: Setting }) => setting);
  const { _connectors, _provider, _providerApiKey, _networks, _testNetworks } = setting.options;
  const { allowedNetworks } = useNetworks(_networks);
  const { allowedNetworks: allowedTestNetworks } = useNetworks(_testNetworks, "test");
  const { allowedProviders } = useProviders(_provider, _providerApiKey);
  const { chains, provider, webSocketProvider } = configureChains(
    [...allowedNetworks, ...allowedTestNetworks], allowedProviders,
  )
  const { allowedConnectors } = useConnectors(_connectors, chains);
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