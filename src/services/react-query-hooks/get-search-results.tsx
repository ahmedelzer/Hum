import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";

const fetchSearchResults = async (queryKey: any) => {
  const { value, debouncedSearchResults } = queryKey;
  console.log(
    `${API_ENDPOINTS.EVENET_USERS}?filter=${JSON.stringify(value)}`,
    " the link"
  );

  // console.log(
  //   `${API_ENDPOINTS.EVENET_USERS}?filter=${
  //     value ? value : ""
  //   }&search=${debouncedSearchResults}`
  // );
  const { data } = await http.get(
    // `${API_ENDPOINTS.EVENET_USERS}?filter${value}&search=${debouncedSearchResults}`
    `${API_ENDPOINTS.EVENET_USERS}?filter=${value}&search=${debouncedSearchResults}`
  );

  return data;
};

export const useGetSearchResults = (options: any) => {
  return useQuery({
    queryKey: ["SEARCH_RESULTS", options],
    queryFn: () => fetchSearchResults(options),
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5,
    // cacheTime: 1000 * 60 * 5,
  });
};
