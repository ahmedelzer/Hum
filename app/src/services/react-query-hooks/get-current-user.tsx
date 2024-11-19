import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";

const fetchCurrentUser = async ({ queryKey }: any) => {
  // console.log("renderd current user");

  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CURRENT_USER);
  return data;
};

export const useGetCurrentUser = () => {
  return useQuery([`CURRENT_USER`], fetchCurrentUser, {
    staleTime: 6000 * 10,
    cacheTime: 6000 * 10,
  });
};
