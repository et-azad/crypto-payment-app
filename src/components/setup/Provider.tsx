import { useState } from "react";
import Image from "next/image";
import { PROVIDERS, DEFAULT_PROVIDER } from "@/components/constants/provider";
import Input from "@/components/shared/Input";
import { ProviderOptions } from "@/components/models/provider";

export default function Provider({
  selected = DEFAULT_PROVIDER,
}: {
  selected?: ProviderOptions;
}) {
  const [selectedProvider, setSelectedProvider] = useState<ProviderOptions>(selected);

  return (
    <>
      <h3 className="mb-2 text-lg font-medium text-gray-900">Select Provider</h3>
      <ul className="grid w-full gap-2 md:grid-cols-3 mb-6">
        {PROVIDERS.map((provider: ProviderOptions) => (
          <li key={provider.provider} onClick={() => setSelectedProvider(provider)}>
            <input
              type="radio"
              name="provider"
              id={provider.provider}
              value={provider.provider}
              className="hidden peer"
              defaultChecked={selectedProvider.provider === provider.provider ? true : false}
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
      </ul >
      {selectedProvider.hasApiKey && (
        <Input
          type="text"
          name="providerApiKey"
          label={`${selectedProvider.title} Api Key`}
          value={selectedProvider.apiKey}
        />
      )}
    </>
  )
}