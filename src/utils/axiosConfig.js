import axios from "axios";
import { useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari Redux state
    const token = localStorage.getItem("token");

    // Jika token tersedia, tambahkan header Authorization
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
