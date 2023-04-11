import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import Input from "@/components/shared/Input";
import Button, { ButtonType } from "@/components/shared/Button";
import Currency from "@/components/setup/Currency";
import { CurrencyOptions } from "@/components/models/currency";
import { DEFAULT_CURRENCY } from "@/components/constants/currency";
import Provider from "@/components/setup/Provider";
import { ProviderOptions } from "@/components/models/provider";
import { DEFAULT_PROVIDER } from "@/components/constants/provider";
import Connectors from "@/components/setup/Connectors";
import { ConnectorOptions } from "@/components/models/connector";
import { CONNECTORS } from "@/components/constants/connector";
import Networks from "@/components/setup/Networks";
import { NetworkOptions } from "@/components/models/network";
import { NETWORKS } from "@/components/constants/network";
import { TEST_NETWORKS } from "@/components/constants/network";

export default function SettingForm() {
	const [walletAddress, setWalletAddress] = useState<string>("");
	const [currency, setCurrency] = useState<CurrencyOptions>(DEFAULT_CURRENCY);
	const [provider, setProvider] = useState<ProviderOptions>(DEFAULT_PROVIDER);
	const [providerApiKey, setProviderApiKey] = useState<string>("");
	const [connectors, setConnectors] = useState<ConnectorOptions[]>(CONNECTORS);
	const [networks, setNetworks] = useState<NetworkOptions[]>(NETWORKS);
	const [sessionTimout, setSessionTimeout] = useState<number>(300);
	const [testPayments, setTestPayments] = useState(false);
	const [testNetworks, setTestNetworks] = useState<NetworkOptions[]>(TEST_NETWORKS);

	const handleWalletAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value), []);
	const handleCurrencyUpdate = useCallback((updateSelected: CurrencyOptions) => setCurrency(updateSelected), []);
	const handleProviderUpdate = useCallback((updateSelected: ProviderOptions) => setProvider(updateSelected), []);
	const handleProviderApiKeyUpdate = useCallback((e: ChangeEvent<HTMLInputElement>) => setProviderApiKey(e.target.value), []);
	const handleConnectorToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => setConnectors(prev => prev.map(connector => {
		if (connector.connector === e.target.value) {
			connector.selected = e.target.checked;
			return connector;
		}
		return connector;
	})), []);
	const handleConnectorKeyKeyUpdate = useCallback((e: ChangeEvent<HTMLInputElement>) => setConnectors(prev => prev.map(connector => {
		if (connector.connector === e.target.name) {
			connector.key = e.target.value;
			return connector;
		}
		return connector;
	})), []);
	const handleNetworkToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => setNetworks(prev => prev.map(network => {
		if (network.network === e.target.value) {
			network.selected = e.target.checked;
			return network;
		}
		return network;
	})), []);
	const handleSessionTimeoutChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setSessionTimeout(+e.target.value), []);
	const handleTestNetworkToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTestNetworks(prev => prev.map(network => {
		if (network.network === e.target.value) {
			network.selected = e.target.checked;
			return network;
		}
		return network;
	})), []);

	// Save Settings
	const handleSaveSettings = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (provider.hasApiKey) provider.apiKey = providerApiKey;
		console.log({
			walletAddress,
			currency,
			provider,
			connectors,
			networks,
			sessionTimout,
			testNetworks
		});

	}, [
		walletAddress,
		currency,
		provider,
		providerApiKey,
		connectors,
		networks,
		sessionTimout,
		testNetworks
	]);

	return (
		<form className="rounded-lg shadow-md px-4 py-6" onSubmit={handleSaveSettings}>
			<Input type="text" name=" setWalletAddress" label="Wallet Address (receiver)" value={walletAddress} onChange={handleWalletAddressChange} />
			<Currency selected={currency} onUpdateSelected={handleCurrencyUpdate} />
			<Provider selected={provider} apiKey={providerApiKey} onUpdateSelected={handleProviderUpdate} onUpdateApiKey={handleProviderApiKeyUpdate} />
			<Connectors connectors={connectors} onToggleConnector={handleConnectorToggle} onKeyUpdate={handleConnectorKeyKeyUpdate} />
			<Networks networks={networks} onToggleNetwork={handleNetworkToggle} />
			<div className="p-4 mb-6 text-sm text-orange-800 rounded-lg bg-orange-50 text-center" role="alert">
				<span className="font-medium">Extra Options</span>
			</div>
			<Input type="number" name="sessionTimout" label="Session Timeout (in secs)" value={sessionTimout} onChange={handleSessionTimeoutChange} />
			<label className="relative inline-flex items-center cursor-pointer mb-6">
				<input type="checkbox" name="testNetwork" className="sr-only peer" onChange={() => setTestPayments(prev => !prev)} />
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
				<span className="ml-3 text-md font-medium text-gray-900">{testPayments ? "Disable" : "Enable"} test payments</span>
			</label>
			{testPayments && <Networks networks={testNetworks} onToggleNetwork={handleTestNetworkToggle} isTest />}
			<Button type="submit" theme={ButtonType.Primary}>Save Setting</Button>
		</form>
	)
}