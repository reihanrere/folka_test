import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "",
  visible: false,
  type: "error",
};
const balanceSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    show(state, action) {
      const { message, severity } = action.payload;
      return {
        ...state,
        message,
        severity,
        visible: true,
      };
    },
    hide(state, action) {
      return {
        ...state,
        visible: false,
      };
    },
  },
});
export const { show, hide } = balanceSlice.actions;
export default balanceSlice.reducer;
