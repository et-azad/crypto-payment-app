import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/store/slices/nav";
import settingReducer from "@/store/slices/setting";
import alertReducer from "@/store/slices/alert";

const store = configureStore({
  reducer: {
    nav: navReducer,
    setting: settingReducer,
    alert: alertReducer,
  },
});

export default store;
