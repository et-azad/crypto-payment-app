import { ChangeEvent } from "react";
import Image from "next/image";
import Input from "@/components/shared/Input";
import { ProviderOptions } from "@/components/models/provider";
import { PROVIDERS } from "@/components/constants/provider";

export default function Provider({
  selected,
  apiKey,
  onUpdateSelected,
  onUpdateApiKey,
}: {
  selected: ProviderOptions;
  apiKey: string;
  onUpdateSelected: (updateSelected: ProviderOptions) => void;
  onUpdateApiKey: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <h3 className="mb-2 text-lg font-medium text-gray-900">Select Provider</h3>
      <ul className="grid w-full gap-2 md:grid-cols-3 mb-6">
        {PROVIDERS.map((provider: ProviderOptions) => (
          <li key={provider.provider} onClick={() => onUpdateSelected(provider)}>
            <input
              type="radio"
              name="provider"
              id={provider.provider}
              value={provider.provider}
              className="hidden peer"
              defaultChecked={selected.provider === provider.provider ? true : false}
            />
            <label htmlFor={provider.provider} className="inline-flex items-center justify-center w-full text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-orange-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50 text-center">
              <div className="block">
                {provider.icon ? (
                  <Image src={provider.icon} width="120" height="120" alt={provider.title} className="mx-auto" />
                ) : (
                  <div className="px-3 py-5">
                    <div className="w-full text-lg font-semibold">{provider.title}</div>
                    <div className="w-full text-sm">Go with {provider.title}</div>
                  </div>
                )}
              </div>
            </label>
          </li>
        ))}
      </ul>
      {selected.hasApiKey && (
        <Input
          type="text"
          name="providerApiKey"
          label={`${selected.title} Api Key`}
          value={apiKey}
          onChange={onUpdateApiKey}
        />
      )}
    </>
  )
}