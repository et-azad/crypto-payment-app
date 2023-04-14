import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import useToast from "@/hooks/useToast";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { updateAmount } from "@/store/slices/setting";
import { SettingOptions } from "@/components/models/setting";
import Input from "@/components/shared/Input";
import Button, { ButtonType } from "@/components/shared/Button";

export default function PayForm({ options }: { options: SettingOptions }) {
  
  const { pushToast } = useToast();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>();
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const { _currency } = options;

  const handleAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setAmount(+e.target.value), []);
  const handleStartPayment = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || amount < 0) {
      pushToast("warning", "Enter an amount / valid amount");
      return;
    }
    dispatch(updateAmount(amount));
    localStorage.setItem("_settings", JSON.stringify({
      ...options,
      _amount: amount
    }));
    setPaymentInitiated(true);
  }, [pushToast, dispatch, options, amount])

  return (
    <form className="rounded-lg shadow-md px-4 py-6" onSubmit={handleStartPayment}>
      <Input type="number" name="amount" step="any" label={`Enter Amount (in ${_currency.currency})`} value={amount} onChange={handleAmountChange} disabled={paymentInitiated} />
      <Button type="submit" theme={ButtonType.Primary} disabled={paymentInitiated}>
        {paymentInitiated ? <SyncLoader className="py-2 px-4" color="#ffffff" size={10} /> : "Start Payment"}
      </Button>
    </form>
  )
}