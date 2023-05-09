import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { getCookie } from "cookies-next";
import { Setting } from "@/components/models/setting";
import useNetworks from "@/hooks/useNetworks";
import useProviders from "@/hooks/useProviders";
import useConnectors from "@/hooks/useConnectors";
import { session } from "@/components/constants/slices";
import { setTimeoutFirst } from "@/store/slices/session";
import useToast from "@/hooks/useToast";


export default function Gateway({ children }: { children: ReactNode }) {
  const _token = getCookie("_token");
  const setting = useSelector(({ setting }: { setting: Setting }) => setting);
  const sessionState = useSelector(({ session }: { session: session }) => session);
  const dispatch = useDispatch();
  const { _connectors, _provider, _providerApiKey, _networks, _testNetworks, _sessionTimout } = setting.options;
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
  const [isTimedout, setIsTimedOut] = useState(false);
  const { pushToast } = useToast();

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      if (sessionState.status === "unset") {
        const timeLeft = localStorage.getItem("timeLeft");
        if (timeLeft != null && +timeLeft <= 0) {
          setIsTimedOut(true);
          pushToast("error", "Session timed out!");

        } else {
          if (timeLeft) dispatch(setTimeoutFirst({
            status: "set",
            timeout: +(timeLeft)
          }))
          else {
            localStorage.setItem(`timeLeft`, `${_sessionTimout}`);
            dispatch(setTimeoutFirst({
              status: "set",
              timeout: _sessionTimout
            }))
          }
        }
      }
    }, 1000);

    return () => clearTimeout(cleanUp);
  }, [dispatch, pushToast, sessionState, _sessionTimout])

  return (
    <WagmiConfig client={client}>
      {!isTimedout && children}
    </WagmiConfig>
  )
}