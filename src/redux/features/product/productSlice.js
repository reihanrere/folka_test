import { createSlice } from "@reduxjs/toolkit";
import { getProductDetail, getProductList } from "../../actions/product";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  productDetail: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [getProductList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getProductList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [getProductDetail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.productDetail = payload;
    },
  },
});

export default productSlice.reducer;
