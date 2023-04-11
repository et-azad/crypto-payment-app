import { ChangeEvent } from "react";
import Image from "next/image";
import Input from "@/components/shared/Input";
import { ConnectorOptions } from "@/components/models/connector";

export default function Connectors({
  connectors,
  onToggleConnector,
  onKeyUpdate,
}: {
  connectors: ConnectorOptions[];
  onToggleConnector: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <h3 className="mb-2 text-lg font-medium text-gray-900">Allow Connectors</h3>
      <ul className="grid w-full gap-2 md:grid-cols-3 mb-6">
        {connectors.map((connector: ConnectorOptions) => (
          <li key={connector.connector}>
            <input
              type="checkbox"
              id={connector.connector}
              value={connector.connector}
              className="hidden peer"
              defaultChecked={connector.selected && true}
              onChange={onToggleConnector}
            />
            <label htmlFor={connector.connector} className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-orange-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50 text-center">
              <div className="block">
                <Image src={connector.icon} width="50" height="50" alt={connector.title} className="mx-auto" />
                <div className="w-full text-lg font-semibold">{connector.title}</div>
                <div className="w-full text-sm">Allow {connector.title}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
      {connectors.map((connector: ConnectorOptions) => (
        <div key={connector.connector}>
          {connector.selected && connector.hasKey && connector.keyName && (
            <Input
              type="text"
              name={connector.connector}
              label={`${connector.title} ${connector.keyInfo}`}
              value={connector.key}
              onChange={onKeyUpdate}
            />
          )}
        </div>
      ))}
    </>
  )
}