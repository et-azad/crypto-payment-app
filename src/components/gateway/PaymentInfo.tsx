import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chain } from "wagmi";
import { PulseLoader } from "react-spinners";
import useConvertCurrency from "@/hooks/useConvertCurrency";
import { Setting } from "@/components/models/setting";
import BottomAnimation from "@/components/shared/BottomAnimation";
import Button, { ButtonType } from "@/components/shared/Button";

export default function PaymentInfo({
  connectedNetwork
}: {
  connectedNetwork: (Chain & { unsupported?: boolean | undefined }) | undefined,
}) {
  const setting = useSelector(({ setting }: { setting: Setting }) => setting);
  const { _amount, _currency } = setting.options;
  const { convertedAmount, setConvertedAmount, setTo } = useConvertCurrency(_currency.currency, _amount);

  useEffect(() => {
    setTo(connectedNetwork?.nativeCurrency.symbol);
    setConvertedAmount(0);
  }, [setTo, setConvertedAmount, connectedNetwork])

  return (
    <>
      <div className="pt-3 mx-4 text-center">
        <div className="mb-4 py-6 font-bold text-gray-500 rounded-xl shadow-md border-dashed border-2 border-orange-500">
          <h2 className="text-sm text-gray-700">Payable Amount</h2>
          <h1 className="text-md font-bold">
            <span className="text-2xl text-orange-400 mr-1">
              {convertedAmount === 0 ? (<PulseLoader className="px-1" color="#f97316" size={13} />) : convertedAmount} {connectedNetwork?.nativeCurrency.symbol}
            </span>
            ({_amount} {_currency.currency})
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <Button theme={ButtonType.Primary} pulse>Complete Payment</Button>
        </div>
      </div>
      <BottomAnimation />
    </>
  )
}