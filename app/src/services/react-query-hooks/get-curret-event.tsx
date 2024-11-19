import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";

const fetchCurrentEvent = async () => {
  const { data } = await http.get(API_ENDPOINTS.CURRENT_EVENT);
  return data?.data;
};

export const useGetCurrentEvent = () => {
  return useQuery([`CURRENCT_EVENT`], fetchCurrentEvent, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 10,
    cacheTime: 60 * 1000 * 10,
  });
};
