import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { storage } from "../../utils/storage";

export const fetchEventUserChats = async ({ queryKey }: any) => {
  const token = storage.getString("token");
  const uuid = storage.getString("uuid");
  const subdomain = storage.getString("subdomain");

  if (token && uuid && subdomain) {
    const [_key, _params] = queryKey;
    const { data } = await http.get(API_ENDPOINTS.EVENT_USER_CHAT);
    return data.data;
  } else {
    return []; // Return an empty array or handle the case when the token is not available.
  }
};

export const useGetEventUserChats = () => {
  return useQuery([`EVENT_USER_CHAT`], fetchEventUserChats, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnMount: true,
  });
};
