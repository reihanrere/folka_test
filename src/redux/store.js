import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./features/balance/balanceSlice";
import toastSlice from "./features/toast/toastSlice";
import authSlice from "./features/auth/loginSlice";
import productSlice from "./features/product/productSlice";
import registerSlice from "./features/auth/registerSlice";

export default configureStore({
  reducer: {
    balance: balanceReducer,
    toast: toastSlice,
    product: productSlice,
    auth: authSlice,
    register: registerSlice,
  },
});
