import { CurrencyOptions } from "@/components/models/currency";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/components/constants/currency";

export default function Currency({
  selected = DEFAULT_CURRENCY,
}: {
  selected?: CurrencyOptions
}) {
  return (
    <>
      <h3 className="mb-2 text-lg font-medium text-gray-900">Select Currency</h3>
      <ul className="grid w-full gap-2 md:grid-cols-6 grid-cols-4 mb-6">
        {CURRENCIES.map((currency: CurrencyOptions) => (
          <li key={currency.currency}>
            <input
              type="radio"
              name="currency"
              id={currency.currency}
              value={currency.currency}
              className="hidden peer"
              defaultChecked={selected.currency === currency.currency ? true : false}
            />
            <label htmlFor={currency.currency} className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-orange-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
              <div className="block">
                <div className="w-full text-sm font-semibold">{currency.symbol} {currency.currency}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}