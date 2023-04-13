import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import useToast from "@/hooks/useToast";
import { updateAmount } from "@/store/slices/setting";
import { useDispatch } from "react-redux";
import { CurrencyOptions } from "@/components/models/currency";
import Input from "@/components/shared/Input";
import Button, { ButtonType } from "@/components/shared/Button";

export default function PayForm({ currency }: { currency: CurrencyOptions }) {
  const { pushToast } = useToast();
  const [amount, setAmount] = useState<number>();
  const handleAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setAmount(+e.target.value), []);
  const handleStartPayment = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || amount < 0) {
      pushToast("warning", "Enter an amount / valid amount");
      return;
    }
    console.log(amount);
  }, [pushToast, amount])

  return (
    <form className="rounded-lg shadow-md px-4 py-6" onSubmit={handleStartPayment}>
      <Input type="number" name="amount" step="any" label={`Enter Amount (in ${currency.currency})`} value={amount} onChange={handleAmountChange} />
      <Button type="submit" theme={ButtonType.Primary}>Start Payment</Button>
    </form>
  )
}