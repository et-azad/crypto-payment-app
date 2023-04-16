import { ReactNode } from "react";
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { useSelector } from "react-redux";
import { Setting } from "@/components/models/setting";

export default function Gateway({ children }: { children: ReactNode }) {
  const setting = useSelector(({ setting }: { setting: Setting }) => setting);
  const { _connectors, _provider, _providerApiKey, _networks } = setting.options;

  // Configure chains & providers with the Alchemy provider.
  // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet],
    [publicProvider()],
  )

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      // new CoinbaseWalletConnector({
      //   chains,
      //   options: {
      //     appName: 'wagmi',
      //   },
      // }),
      // new WalletConnectConnector({
      //   chains,
      //   options: {
      //     projectId: '...',
      //   },
      // }),
    ],
    provider,
    webSocketProvider,
  })

  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}