import { CURRENCIES } from "@/components/constants/currency";
import Input from "@/components/shared/Input";
import Button, { ButtonType } from "@/components/shared/Button";
import Currency from "@/components/setup/Currency";
import Connectors from "@/components/setup/Connectors";

export default function SettingForm() {
	return (
		<form className="rounded-lg shadow-md px-4 py-6">
			<Input type="text" name="walletAddress" label="Wallet Address" />
			<Currency currencies={CURRENCIES} />
			
			<Connectors />


			<div className="p-4 mb-6 text-sm text-orange-800 rounded-lg bg-orange-50 text-center" role="alert">
				{/* <span className="font-medium">Extra Options</span> */}
				<label className="relative inline-flex items-center cursor-pointer">
					<input type="checkbox" value="" className="sr-only peer" />
					<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
					<span className="ml-3 text-sm font-medium text-gray-900">Test payments</span>
				</label>
			</div>



			{/* <div className="grid md:grid-cols-2 md:gap-6">
            </div> */}
			<Button type={ButtonType.Primary}>Save Setting</Button>
		</form>
	)
}