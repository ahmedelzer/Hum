import { GetProjectUrl } from "../../../request";

export function buildApiUrl(
  apiRequest,
  constants,
  getProjectUrl = GetProjectUrl()
) {
  if (!apiRequest || !apiRequest.dashboardFormSchemaActionQueryParams) {
    // Handle the case where apiRequest is null or does not have dashboardFormSchemaActionQueryParams
    return null; // or some default value or throw an error, depending on your use case
  }
  const routeAddress = apiRequest.routeAdderss + "?SortRow=%22%22";
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
  // console.log(apiRequest.routeAddress.includes("?"),''.);
  const apiUrl = `${getProjectUrl}/${routeAddress}${routeAddress.includes("?") ? "&" : "?"}${queryParam}`;
  //const apiUrl = `${getProjectUrl}/${apiRequest.routeAdderss}?${queryParam}`;

  return apiUrl;
}
