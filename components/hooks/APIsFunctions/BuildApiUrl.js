// import { GetProjectUrl } from "../../../request";

// export function buildApiUrl(
//   apiRequest,
//   constants,
//   getProjectUrl = GetProjectUrl()
// ) {
//   if (!apiRequest || !apiRequest.dashboardFormSchemaActionQueryParams) {
//     // Handle the case where apiRequest is null or does not have dashboardFormSchemaActionQueryParams
//     return null; // or some default value or throw an error, depending on your use case
//   }
//   const routeAddress = apiRequest.routeAdderss + "?SortRow=%22%22";
//   const queryParam = apiRequest.dashboardFormSchemaActionQueryParams
//     .filter(
//       (param) =>
//         param.IsRequired || constants[param.dashboardFormParameterField]
//     )
//     .map(
//       (param) =>
//         `${param.parameterName}=${constants[param.dashboardFormParameterField]}`
//     )
//     .join("&");
//   // console.log(apiRequest.routeAddress.includes("?"),''.);
//   const apiUrl = `${getProjectUrl}/${routeAddress}${routeAddress.includes("?") ? "&" : "?"}${queryParam}`;
//   //const apiUrl = `${getProjectUrl}/${apiRequest.routeAdderss}?${queryParam}`;

//   return apiUrl;
// }
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetProjectUrl } from "../../../request";
import { selectSelectedNode } from "../../../src/reducers/LocationReducer";
import { store } from "../../../src/store/reduxStore";
//import store from "./store";

export function buildApiUrl(
  apiRequest,
  baseConstants,
  getProjectUrl = GetProjectUrl()
) {
  //const languageRow = returnLange();
  //typeof languageRow === "string" ? JSON.parse(languageRow) : languageRow;

  // console.log("languageRow:,",languageRowObj);
  const selectedNode = selectSelectedNode(store.getState());
  const selectedLocation = store.getState().location.selectedLocation;
  const languageRow = store.getState().localization.languageRow;
  const constants = {
    ...baseConstants,
    ...languageRow,
    ...selectedNode,
    ...selectedLocation,
  };
  if (!apiRequest || !apiRequest.dashboardFormSchemaActionQueryParams) {
    // Handle the case where apiRequest is null or does not have dashboardFormSchemaActionQueryParams
    return null; // or some default value or throw an error, depending on your use case
  }
  const routeAddress = apiRequest.routeAdderss;
  const queryParam = apiRequest.dashboardFormSchemaActionQueryParams
    .filter(
      (param) =>
        param.IsRequired || constants[param.dashboardFormParameterField]
    )
    .map(
      (param) =>
        `${param.parameterName}=${constants[param.dashboardFormParameterField]}`
    )
    .join("&");

  const apiUrl = `${getProjectUrl}/${routeAddress}${routeAddress.includes("?") ? "&" : "?"}${queryParam}`;
  console.log("====================================");
  console.log(apiUrl, "apiUrl");
  console.log("====================================");
  //const apiUrl = `${getProjectUrl}/${apiRequest.routeAdderss}?${queryParam}`;
  return apiUrl;
}
