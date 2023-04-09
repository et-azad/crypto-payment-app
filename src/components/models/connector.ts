export interface ConnectorOptions {
  active: boolean | "commingSoon";
  connector: string;
  title: string;
  description?: string;
  icon: string;
}
