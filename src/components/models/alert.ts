export interface AlertOptions {
  id: number;
  visible: boolean;
  type: "warning" | "error" | "success";
  message: string;
}

export interface Alert {
  alerts: AlertOptions[];
}
