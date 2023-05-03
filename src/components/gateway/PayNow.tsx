import { Chain, usePrepareSendTransaction, useSendTransaction } from "wagmi";
import useErrors from "@/hooks/useErrors";
import Button, { ButtonType } from "@/components/shared/Button";

export default function PayNow({ config }: { config: any }) {
  const { data, sendTransaction, error: errorWhenTransactionStart } = useSendTransaction(config);
  useErrors(errorWhenTransactionStart);
  console.log(data);

  return (
    <div className="flex flex-wrap justify-center">
      <Button theme={ButtonType.Primary} pulse onClick={sendTransaction}>Complete Payment</Button>
    </div>
  )
}