import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "@/store/slices/setting";
import sessionReducer from "@/store/slices/session";
import alertReducer from "@/store/slices/alert";

const store = configureStore({
  reducer: {
    setting: settingReducer,
    session: sessionReducer,
    alert: alertReducer,
  },
});

export default store;
