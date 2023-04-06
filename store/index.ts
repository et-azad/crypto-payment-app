import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/store/slices/nav";
import settingReducer from "@/store/slices/setting";

const store = configureStore({
  reducer: {
    nav: navReducer,
    setting: settingReducer,
  },
});

export default store;
