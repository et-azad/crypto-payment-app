import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CURRENCY } from "@/components/constants/currency";
import { DEFAULT_PROVIDER } from "@/components/constants/provider";
import { CONNECTORS } from "@/components/constants/connector";
import { NETWORKS, TEST_NETWORKS } from "@/components/constants/network";
import { Setting, SettingOptions } from "@/components/models/setting";

const options: SettingOptions = {
  _walletAddress: "",
  _currency: DEFAULT_CURRENCY,
  _provider: DEFAULT_PROVIDER,
  _providerApiKey: "",
  _connectors: CONNECTORS,
  _networks: NETWORKS,
  _sessionTimout: 300,
  _testPayments: false,
  _testNetworks: TEST_NETWORKS,
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
