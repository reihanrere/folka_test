import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        userData
      );
      localStorage.setItem("isRegister", true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
