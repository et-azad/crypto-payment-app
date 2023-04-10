export interface NetworkOptions {
  active: boolean | "commingSoon";
  selected: boolean;
  network: string;
  symbol: string;
  title: string;
  description?: string;
  icon: string;
  isTest?: boolean;
}
