import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";

const fetchChatRequests = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CHAT_REQUESTS);
  return data.data;
};

export const useGetChatRequests = () => {
  return useQuery([`CHAT_REQUESTS`], fetchChatRequests, {
    // refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
