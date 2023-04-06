export interface AlertOptions {
  visible: boolean;
  type: string;
  message: string;
}

export interface Alert {
  alerts: AlertOptions[];
}
