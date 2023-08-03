import { createAsyncThunk } from "@reduxjs/toolkit";
import queryString from "query-string";
import axiosInstance from "../../../utils/axiosConfig";

export const getProductList = createAsyncThunk(
  "product/getProductList",
  async (params, { rejectWithValue }) => {
    try {
      const param = queryString.stringify(params);
      const { data } = await axiosInstance.get(`product?${param}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (productName, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `product?keyword=${productName}&price=&page=1&limit=10&order=product_name,ASC`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
