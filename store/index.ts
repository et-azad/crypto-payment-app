import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/store/slices/nav"

const store = configureStore({
    reducer: { nav: navReducer }
})

export default store;