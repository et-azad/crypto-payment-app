import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "@/store/slices/setting";
import alertReducer from "@/store/slices/alert";

const store = configureStore({
  reducer: {
    setting: settingReducer,
    alert: alertReducer,
  },
});

export default store;
