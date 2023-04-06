import { Alert } from "@/components/models/alert";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Alert = {
  alerts: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert(state, { payload }: { payload: Alert }) {
      state.alerts = payload.alerts;
    },
  },
});

export const { addAlert } = alertSlice.actions;
export default alertSlice.reducer;
