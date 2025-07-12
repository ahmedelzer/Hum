import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageSchema from "./src/Schemas/LanguageSchema/LanguageSchema.json";
import { retrieveSecureValue } from "./src/store/secureStore";
import { getField } from "./src/utils/operation/getField";
//export const domainURL = "https://maingatewayapi.ihs-solutions.com:8000";
export const domainURL = "41.196.0.25";
export const baseURL = "http://" + domainURL + ":8000";
export const defaultProjectProxyRoute = `${baseURL}/BrandingMart/api/`;
export const defaultProjectProxyRouteWithoutAPI = `${baseURL}/BrandingMart/`;
export const publicImageURL = "http://" + domainURL + ":5056/";
//export const publicImageURL = "https://ihs-solutions.com:5055/";
//export const websocketBaseURI =
// "wss://maingatewayapi.ihs-solutions.com:8000/Chanels";
export const websocketBaseURI = "ws://" + domainURL + ":9000";
// export const languageName = window.localStorage.getItem("language");
// export const languageID = window.localStorage.getItem("languageID");
// export const projectProxyRoute =
//   window.sessionStorage.getItem("projectProxyRoute");//!make it by storge
export let projectProxyRoute = "BrandingMart";
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
  const langField = getField(
    LanguageSchema.dashboardFormSchemaParameters,
    "Language"
  );
  const languageRow = await AsyncStorage.getItem("languageRow");
  const languageRowObj =
    typeof languageRow === "string" ? JSON.parse(languageRow) : languageRow;
  const languageValue = String(languageRowObj?.[langField] ?? "Eng_US");
  const headers = {
    languageName: encodeURIComponent(languageValue),
    "Content-Type": "application/json",
    token: await GetToken(),
    ...(languageRowObj && Object.keys(languageRowObj).length > 0
      ? Object.fromEntries(
          Object.entries(languageRowObj).map(([k, v]) => [
            k,
            String(encodeURIComponent(v)),
          ])
        )
      : {}),
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
