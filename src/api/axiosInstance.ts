import { ENV } from "@/globals/env";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const axiosInstance = axios.create({
  baseURL: ENV.URL_BACK,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});

export default axiosInstance;
