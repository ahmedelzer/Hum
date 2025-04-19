import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveSecureValue } from "./src/store/zustandStore";

export const baseURL = "https://maingatewayapi.ihs-solutions.com:8000";
export const defaultProjectProxyRoute =
  "http://maingatewayapi.ihs-solutions.com:8000/BrandingMart/api/";
export const defaultProjectProxyRouteWithoutAPI =
  "http://maingatewayapi.ihs-solutions.com:8000/BrandingMart/";
export const publicImageURL = "http://41.196.0.25:5004/";
export const websocketBaseURI =
  "wss://maingatewayapi.ihs-solutions.com:8000/Chanels";
// export const languageName = window.localStorage.getItem("language");
// export const languageID = window.localStorage.getItem("languageID");
// export const projectProxyRoute =
//   window.sessionStorage.getItem("projectProxyRoute");//!make it by storge
export let projectProxyRoute = "BrandingMart";
// Set projectProxyRoute
export function SetReoute(Route) {
  projectProxyRoute = Route;
}

// Add other methods as needed

export const baseURLWithoutApi = `${baseURL}/${projectProxyRoute}`;
//"proxy": "http://ihs.ddnsking.com:8000",

export function GetProjectUrl() {
  return `${baseURL}/${projectProxyRoute}/api`;
}
export async function GetToken() {
  return await retrieveSecureValue("token");
}
export async function SetHeaders() {
  // console.log("====================================");
  // console.log(await GetToken(), "req");
  // console.log("====================================");
  const headers = {
    languageName: "",
    // languageName: encodeURIComponent(AsyncStorage.getItem("language")) || "",
    "Content-Type": "application/json",
    token: await GetToken(),
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Origin": "*",
    languageID: "",
    // languageID: AsyncStorage.getItem("languageID") || "",
  };

  // Remove any undefined or null properties
  Object.keys(headers).forEach(
    (key) =>
      (headers[key] === undefined || headers[key] === null) &&
      delete headers[key]
  );

  return headers;
}

export const request = axios.create({
  // baseURL: baseURL,
  // headers: {
  //   ...SetHeaders(),
  // },
  // withCredentials: true,
});
