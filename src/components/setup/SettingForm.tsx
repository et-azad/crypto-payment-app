import { useCallback, useState } from "react";
import Input from "@/components/shared/Input";
import Button, { ButtonType } from "@/components/shared/Button";
import Currency from "@/components/setup/Currency";
import Provider from "@/components/setup/Provider";
import Connectors from "@/components/setup/Connectors";
import Networks from "@/components/setup/Networks";
import { TEST_NETWORKS } from "@/components/constants/network";

export default function SettingForm() {
	const [testPayments, setTestPayments] = useState(false);
	const saveSettings = useCallback((e: any) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(e.target);
		console.log(formData);
	}, [])

	return (
		<form className="rounded-lg shadow-md px-4 py-6" onSubmit={saveSettings}>
			<Input type="text" name="walletAddress" label="Wallet Address (reciever / marchant)" />
			<Currency />
			<Provider />
			<Connectors />
			<Networks />
			<div className="p-4 mb-6 text-sm text-orange-800 rounded-lg bg-orange-50 text-center" role="alert">
				<span className="font-medium">Extra Options</span>
			</div>
			<Input
				type="number"
				name="sessionTimout"
				label="Session Timeout (in secs)"
				value="300"
			/>
			<label className="relative inline-flex items-center cursor-pointer mb-6">
				<input
					type="checkbox"
					name="testNetwork"
					className="sr-only peer"
					onChange={() => setTestPayments(prev => !prev)}
				/>
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
				<span className="ml-3 text-md font-medium text-gray-900">{testPayments ? "Disable" : "Enable"} test payments</span>
			</label>
			{testPayments && <Networks networks={TEST_NETWORKS} isTest />}

			<Button type="submit" theme={ButtonType.Primary}>Save Setting</Button>
		</form>
	)
}