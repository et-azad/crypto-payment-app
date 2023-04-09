import Image from "next/image";
import nextSvg from "@/public/connectors/metamask.svg";

export default function Connectors() {
  return (
    <>
      <h3 className="mb-2 text-lg font-medium text-gray-900">Allow Connectors</h3>
      <ul className={`grid w-full gap-2 md:grid-cols-3 mb-6`}>
        <li>
          <input type="checkbox" id="react-option" value="" className="hidden peer" required />
          <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-orange-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
            <div className="block">
              <Image src={nextSvg} width="50" height="50" alt="MetaMask" />
              <div className="w-full text-lg font-semibold">MetaMask</div>
              <div className="w-full text-sm">Connect with MetaMask</div>
            </div>
          </label>
        </li>
        <li>
          <input type="checkbox" id="react-option-2" value="" className="hidden peer" required />
          <label htmlFor="react-option-2" className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-orange-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
            <div className="block">
              <Image src="/connectors/walletconnect.svg" width="50" height="50" alt="MetaMask" />
              <div className="w-full text-lg font-semibold">MetaMask</div>
              <div className="w-full text-sm">Connect with MetaMask</div>
            </div>
          </label>
        </li>
      </ul>
    </>
  )
}