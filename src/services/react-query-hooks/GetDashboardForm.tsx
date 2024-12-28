import { http } from "../http";
import { useQuery } from "@tanstack/react-query";

const fetchGetDashboardForm = async (option: any) => {
  const { dashboardItemId } = option || "";
  const { data } = await http.get(
    `Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemId}`
  );
  return data;
};

export const useGetDashboardForm = (option: any) => {
  return useQuery({
    queryKey: ["GET_DASHBOARD_FORM", option],
    queryFn: () => fetchGetDashboardForm(option),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
