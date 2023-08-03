import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        userData
      );
      const token = response.data;
      localStorage.setItem("token", response.data?.data?.token);
      return token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
