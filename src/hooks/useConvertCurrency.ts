import { useState, useEffect, Dispatch, SetStateAction } from "react";
import useToast from "@/hooks/useToast";

export default function useConvertCurrency(
  from: string,
  amount: number
): {
  convertedAmount: number;
  setConvertedAmount: Dispatch<any>;
  setTo: Dispatch<SetStateAction<string | undefined>>;
} {
  const [convertedAmount, setConvertedAmount] = useState<any>(0);
  const [to, setTo] = useState<string | undefined>(undefined);
  const { pushToast } = useToast();

  useEffect(() => {
    const cleanUp = setInterval(() => {
      fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${to}`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((currencies) => {
          const fromRate = currencies.data.rates[from];
          const toRate = 1 / fromRate;
          setConvertedAmount(
            (amount * toRate).toFixed(5).replace(/\.?0+$/, "")
          );
        })
        .catch((error) => {
          pushToast("error", `Unable to convert amount into ${to}`);
        });
    }, 1000);
    return () => clearInterval(cleanUp);
  }, [pushToast, to, from, amount]);

  return {
    convertedAmount,
    setConvertedAmount,
    setTo,
  };
}
