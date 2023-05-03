import { NavState } from "@/components/constants/slices";
import { createSlice } from "@reduxjs/toolkit";

const initialState: NavState = {
  type: "main",
  index: "/",
  show: false,
  links: [],
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNav(state, { payload }: { payload: NavState }) {
      state.type = payload.type;
      state.index = payload.index;
      state.show = payload.show;
      state.links = payload.links;
    },
  },
});

export const { setNav } = navSlice.actions;
export default navSlice.reducer;
