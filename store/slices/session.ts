import { session } from "@/components/constants/slices";
import { createSlice } from "@reduxjs/toolkit";

const initialState: session = {
  status: "unset",
  timeout: 0,
};

const session = createSlice({
  name: "session",
  initialState,
  reducers: {
    setTimeoutFirst(state, { payload }: { payload: session }) {
      state.status = payload.status;
      state.timeout = payload.timeout;
    },
    timeoutRunning(state, { payload }: { payload: number }) {
      state.timeout = payload;
    },
  },
});

export const { setTimeoutFirst, timeoutRunning } = session.actions;
export default session.reducer;
