import { http } from "../http";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchSearchResults = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, { value, debouncedSearchResults, pageSize }] = queryKey;

  console.log(pageParam, "pageParam");
  console.log(queryKey, "queryKey");
  const { data } = await http.get(`posts`, {
    params: {
      _page: pageParam,
    },
  });
  return data;
};

export const usePagination = (options: any) => {
  const { value, debouncedSearchResults, pageSize } = options;

  return useInfiniteQuery({
    queryKey: ["SEARCH_RESULTS", { value, debouncedSearchResults, pageSize }],
    queryFn: fetchSearchResults,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1, // Add initialPageParam
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
