import { useCallback, useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToast from "@/hooks/useToast";
import { Setting } from "@/components/models/setting";
import { updateSetting } from "@/store/slices/setting";
import Input from "@/components/shared/Input";
import Button, { ButtonType } from "@/components/shared/Button";
import Currency from "@/components/setup/Currency";
import { CurrencyOptions } from "@/components/models/currency";
import Provider from "@/components/setup/Provider";
import { ProviderOptions } from "@/components/models/provider";
import Connectors from "@/components/setup/Connectors";
import { ConnectorOptions } from "@/components/models/connector";
import Networks from "@/components/setup/Networks";
import { NetworkOptions } from "@/components/models/network";

export default function SettingForm() {
	const dispatch = useDispatch();
	const { pushToast } = useToast();
	const setting = useSelector(({ setting }: { setting: Setting }) => setting);
	const {
		_walletAddress,
		_currency,
		_provider,
		_providerApiKey,
		_connectors,
		_networks,
		_sessionTimout,
		_testPayments,
		_testNetworks
	} = setting.options;

	const [walletAddress, setWalletAddress] = useState<string>(_walletAddress);
	const [currency, setCurrency] = useState<CurrencyOptions>(_currency);
	const [provider, setProvider] = useState<ProviderOptions>(_provider);
	const [providerApiKey, setProviderApiKey] = useState<string>(_providerApiKey);
	const [connectors, setConnectors] = useState<ConnectorOptions[]>(_connectors);
	const [networks, setNetworks] = useState<NetworkOptions[]>(_networks);
	const [sessionTimout, setSessionTimeout] = useState<number>(_sessionTimout);
	const [testPayments, setTestPayments] = useState(_testPayments);
	const [testNetworks, setTestNetworks] = useState<NetworkOptions[]>(_testNetworks);

	const handleWalletAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value), []);
	const handleCurrencyUpdate = useCallback((updateSelected: CurrencyOptions) => setCurrency(updateSelected), []);
	const handleProviderUpdate = useCallback((updateSelected: ProviderOptions) => setProvider(updateSelected), []);
	const handleProviderApiKeyUpdate = useCallback((e: ChangeEvent<HTMLInputElement>) => setProviderApiKey(e.target.value), []);
	const handleConnectorToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => setConnectors(prev => prev.map(connector => {
		const updateConnector = { ...connector };
		if (updateConnector.connector === e.target.value) {
			updateConnector.selected = e.target.checked;
			return updateConnector;
		}
		return updateConnector;
	})), []);
	const handleConnectorKeyUpdate = useCallback((e: ChangeEvent<HTMLInputElement>) => setConnectors(prev => prev.map(connector => {
		const updateConnector = { ...connector };
		if (updateConnector.connector === e.target.name) {
			updateConnector.key = e.target.value;
			return updateConnector;
		}
		return updateConnector;
	})), []);
	const handleNetworkToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => setNetworks(prev => prev.map(network => {
		const updateNetwork = { ...network };
		if (updateNetwork.network === e.target.value) {
			updateNetwork.selected = e.target.checked;
			return updateNetwork;
		}
		return updateNetwork;
	})), []);
	const handleSessionTimeoutChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setSessionTimeout(+e.target.value), []);
	const handleTestNetworkToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTestNetworks(prev => prev.map(network => {
		const updateNetwork = { ...network };
		if (updateNetwork.network === e.target.value) {
			updateNetwork.selected = e.target.checked;
			return updateNetwork;
		}
		return updateNetwork;
	})), []);

	// Save Settings
	const handleSaveSettings = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Checking Wallet Address
		if (!walletAddress) {
			pushToast("warning", "Enter your Wallet Address");
			return;
		}
		// Checking Provider Api Key
		if (provider.hasApiKey) {
			if (!providerApiKey) {
				pushToast("warning", `Enter your ${provider.title} Api Key`);
				return;
			}
			setProvider(prev => ({
				apiKey: providerApiKey,
				...prev
			}))
			// provider.apiKey = providerApiKey;
		}
		// Checking Connectors
		let connectorSelected = false;
		let connectorApiKeyMissing = false;
		connectors.forEach((connector: ConnectorOptions) => {
			if (connector.selected) {
				connectorSelected = true;
				if (connector.hasKey && !connector.key) {
					pushToast("warning", `Enter your ${connector.title} ${connector.keyInfo}`);
					connectorApiKeyMissing = true;
				}
			}
		})
		if (!connectorSelected) {
			pushToast("warning", `Select a Connector`);
			return;
		}
		if (connectorApiKeyMissing) return;
		// Checking Networks
		let networkSelected = false;
		networks.forEach((network: NetworkOptions) => {
			if (network.selected) networkSelected = true;
		})
		if (!networkSelected) {
			pushToast("warning", `Select a Network`);
			return;
		}
		// Checking Session Timout
		if (sessionTimout < 300) {
			pushToast("warning", `Session timout must be greater than 300 secs`);
			return;
		}
		// Checking Networks
		let testNetworkSelected = false;
		testNetworks.forEach((network: NetworkOptions) => {
			if (network.selected) testNetworkSelected = true;
		})
		if (!testNetworkSelected) {
			pushToast("warning", `Either select a Test Network or disable the option`);
			return;
		}
		// Updating Settings
		const updatedOptions = {
			_walletAddress: walletAddress,
			_currency: currency,
			_provider: provider,
			_providerApiKey: providerApiKey,
			_connectors: connectors,
			_networks: networks,
			_sessionTimout: sessionTimout,
			_testPayments: testPayments,
			_testNetworks: testNetworks
		}
		dispatch(updateSetting({
			status: true,
			options: updatedOptions
		}))
		localStorage.setItem("_settings", JSON.stringify(updatedOptions))
	}, [
		pushToast,
		dispatch,
		walletAddress,
		currency,
		provider,
		providerApiKey,
		connectors,
		networks,
		sessionTimout,
		testPayments,
		testNetworks
	]);

	useEffect(() => {
		const cleanUp = setTimeout(() => {
			setWalletAddress(setting.options._walletAddress);
			setCurrency(setting.options._currency);
			setProvider(setting.options._provider);
			setProviderApiKey(setting.options._providerApiKey);
			setConnectors(setting.options._connectors);
			setNetworks(setting.options._networks);
			setSessionTimeout(setting.options._sessionTimout);
			setTestPayments(setting.options._testPayments);
			setTestNetworks(setting.options._testNetworks);
		}, 500);
		return () => clearTimeout(cleanUp);
	}, [setting]);

	return (
		<form className="rounded-lg shadow-md px-4 py-6" onSubmit={handleSaveSettings}>
			<Input type="text" name=" setWalletAddress" label="Wallet Address (receiver)" value={walletAddress} onChange={handleWalletAddressChange} />
			<Currency selected={currency} onUpdateSelected={handleCurrencyUpdate} />
			<Provider selected={provider} apiKey={providerApiKey} onUpdateSelected={handleProviderUpdate} onUpdateApiKey={handleProviderApiKeyUpdate} />
			<Connectors connectors={connectors} onToggleConnector={handleConnectorToggle} onKeyUpdate={handleConnectorKeyUpdate} />
			<Networks networks={networks} onToggleNetwork={handleNetworkToggle} />
			<div className="p-4 mb-6 text-sm text-orange-800 rounded-lg bg-orange-50 text-center" role="alert">
				<span className="font-medium">Extra Options</span>
			</div>
			<Input type="number" name="sessionTimout" label="Session Timeout (in secs)" value={sessionTimout} onChange={handleSessionTimeoutChange} />
			<label className="relative inline-flex items-center cursor-pointer mb-6">
				<input type="checkbox" name="testNetwork" className="sr-only peer" onChange={() => setTestPayments(prev => !prev)} checked={testPayments} />
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
				<span className="ml-3 text-md font-medium text-gray-900">{testPayments ? "Disable" : "Enable"} test payments</span>
			</label>
			{testPayments && <Networks networks={testNetworks} onToggleNetwork={handleTestNetworkToggle} isTest />}
			<Button type="submit" theme={ButtonType.Primary}>Save Setting</Button>
		</form>
	)
}