import { Setting } from "@/components/models/setting";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Setting = {
  status: false,
  options: {
    test: true,
  },
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
