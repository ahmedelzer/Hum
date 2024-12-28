import { http } from "../http";
import { useQuery } from "@tanstack/react-query";

const fetchSchemaActions = async (option: any) => {
  const { dashboardSchemaId } = option || "";
  const { data } = await http.get(
    `Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${dashboardSchemaId}`
  );
  return data;
};

export const useFetchSchemaActions = (option: any) => {
  return useQuery({
    queryKey: ["FETCH_SCHEMA_ACTIONS", option],
    queryFn: () => fetchSchemaActions(option),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

// export function buildApiUrl(apiRequest, constants, projectUrl) {
//   if (!apiRequest || !apiRequest.dashboardFormSchemaActionQueryParams) {
//     // Handle the case where apiRequest is null or does not have dashboardFormSchemaActionQueryParams
//     return null; // or some default value or throw an error, depending on your use case
//   }

//   const queryParam = apiRequest.dashboardFormSchemaActionQueryParams
//     .map(
//       (param) =>
//         ${param.parameterName}=${constants[param.dashboardFormParameterField]}
//     )
//     .join("&");

//   const apiUrl = ${GetProjectUrl()}/${apiRequest.routeAdderss}?${queryParam};
//   return apiUrl;
// }
