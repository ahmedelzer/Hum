import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { storage } from "../../utils/storage";
import { API_ENDPOINTS } from "../api-endpoints";

const fetchLinks = async (queryKey: any) => {
  const { data } = await http.get(`${API_ENDPOINTS.SOCIALLINKS}`);
  return data?.data;
};

export const useGetLinks = (options: any) => {
  return useQuery({
    queryKey: ["LINKS", options],
    queryFn: () => fetchLinks(options),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};
