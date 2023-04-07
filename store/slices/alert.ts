import { Alert, AlertOptions } from "@/components/models/alert";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Alert = {
  alerts: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert(state, { payload }: { payload: AlertOptions }) {
      state.alerts.push(payload);
    },
    removeAlert(state, { payload }: { payload: Number }) {
      state.alerts = state.alerts.filter(
        (alert: AlertOptions) => alert.id != payload
      );
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
