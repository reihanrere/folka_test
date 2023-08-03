import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../actions/auth/login";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    logoutUser: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
