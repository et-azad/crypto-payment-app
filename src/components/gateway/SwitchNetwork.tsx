import { Chain } from "wagmi";
import { SyncLoader } from "react-spinners";
import Button from "@/components/shared/Button";

export default function SwitchNetwork({
  suggestedNetwork,
  switchNetwork,
  isLoading,
  pendingChainId,
}: {
  suggestedNetwork: Chain;
  switchNetwork: ((chainId_?: number | undefined) => void) | undefined;
  isLoading: boolean;
  pendingChainId: number | undefined;
}) {
  return (
    <div className="flex flex-wrap justify-center">
      <Button
        disabled={isLoading}
        onClick={() => switchNetwork?.(suggestedNetwork.id)}
      >
        {isLoading && suggestedNetwork.id === pendingChainId ? (
          <SyncLoader className="py-2 px-4" color="#f97316" size={10} />
        ) : <>Switch to {suggestedNetwork.name}</>}
      </Button>
    </div>
  )
}