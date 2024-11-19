import axios from "axios";
import { storage } from "../utils/storage";
import { navigate } from "../utils/navigationHelper";

export const http = axios.create({
  baseURL: "",
});

const projectProxyRoute = "Centralization" as string;

const baseUrl = `http://maingatewayapi.ihs-solutions.com:8000/${projectProxyRoute}/Api`;
// const baseUrl = "https://jsonplaceholder.typicode.com";

http.interceptors.request.use(
  async (config) => {
    // const token = storage.getString("token");
    // config.headers["Authorization"] = `Bearer ${token ? token : ""}`;

    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Accept"] = "application/json, text/plain, */*";
    config.baseURL = baseUrl;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Your response logic here
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error.response && error.response.status === 401) {
      // Clear token from local storage
      storage.delete("token");
      setTimeout(() => {
        navigate("SignIn" as never);
      }, 3000);
    }
    // else if (error.response && error.response.status === 500) {
    //   setTimeout(() => {
    //     location.replace("/");
    //   }, 3000);
    // }

    return Promise.reject(error);
  }
);
