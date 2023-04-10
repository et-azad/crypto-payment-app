export interface ConnectorOptions {
  active: boolean | "commingSoon";
  selected: boolean;
  connector: string;
  title: string;
  description?: string;
  icon: string;
  hasKey?: boolean;
  keyName?: string;
  keyInfo?: string;
  key?: string;
}
