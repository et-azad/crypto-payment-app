import { CurrencyOptions } from "@/components/models/currency";
import { ProviderOptions } from "@/components/models/provider";
import { ConnectorOptions } from "@/components/models/connector";
import { NetworkOptions } from "@/components/models/network";

export interface SettingOptions {
  _walletAddress: string;
  _currency: CurrencyOptions;
  _provider: ProviderOptions;
  _providerApiKey: string;
  _connectors: ConnectorOptions[];
  _networks: NetworkOptions[];
  _sessionTimout: number;
  _testPayments: boolean;
  _testNetworks: NetworkOptions[];
}

export interface Setting {
  status: boolean;
  options: SettingOptions;
}
