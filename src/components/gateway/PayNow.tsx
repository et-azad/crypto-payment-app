import { Chain, useSendTransaction, useWaitForTransaction } from "wagmi";
import useErrors from "@/hooks/useErrors";
import Button, { ButtonType } from "@/components/shared/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useToast from "@/hooks/useToast";
import { SyncLoader } from "react-spinners";
import Link from "next/link";

export default function PayNow({
  config,
  connectedNetwork
}: {
  config: any;
  connectedNetwork: (Chain & { unsupported?: boolean | undefined }) | undefined;
}) {
  const router = useRouter();
  const { pushToast } = useToast();
  const { data, sendTransaction, error: errorWhenTransactionStart, isLoading: isSendTransaction } = useSendTransaction(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useErrors(errorWhenTransactionStart);

  useEffect(() => {
    if (isSendTransaction) pushToast("warning", "Payment request send, please check your wallet")
    if (isSuccess) setTimeout(() => router.replace("/"), 1000)
  }, [router, pushToast, isSendTransaction, isSuccess])

  return (
    <>
      {!isSuccess ? (
        <>
          {isLoading && (
            <div className="mb-4 py-4 font-bold text-gray-500 rounded-xl shadow-md border-dashed border-2 border-orange-500">
              <h2 className="text-md text-gray-700">Transaction Status <Link className="text-orange-700" href={`${connectedNetwork?.blockExplorers?.default.url}/tx/${data?.hash}`} target="_blank"><b><u>Here</u></b></Link></h2>
            </div>
          )}
          <div className="flex flex-wrap justify-center">
            <Button theme={isSendTransaction || isLoading ? ButtonType.Secondary : ButtonType.Primary} pulse={!isSendTransaction} onClick={sendTransaction} disabled={isSendTransaction || isLoading}>
              {isSendTransaction || isLoading ? (
                <SyncLoader className="py-2 px-4" color="#f97316" size={10} />
              ) : "Complete Payment"}
            </Button>
          </div>
        </>
      ) : (
        <h2 className="text-md text-orange-400 mr-1">Payment has been done! Redirecting to home...</h2>
      )}

    </>
  )
}