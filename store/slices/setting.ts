import { createSlice } from "@reduxjs/toolkit";
import { Setting, SettingOptions } from "@/components/models/setting";

const options: SettingOptions = {
  _walletAddress: "",
  _currency: {
    symbol: "",
    currency: "",
  },
  _provider: {
    provider: "",
    title: "",
    hasApiKey: false,
  },
  _providerApiKey: "",
  _connectors: [],
  _networks: [],
  _sessionTimout: 300,
  _testPayments: false,
  _testNetworks: [],
};
const initialState: Setting = {
  status: false,
  options: options,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateSetting(state, { payload }: { payload: Setting }) {
      state.status = payload.status;
      state.options = payload.options;
    },
  },
});

export const { updateSetting } = settingSlice.actions;
export default settingSlice.reducer;
