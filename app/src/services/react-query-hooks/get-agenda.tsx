import { http } from "../http";
import { useQuery } from "@tanstack/react-query";

const jsonUse = async () => {
  const { data } = await http.get(`posts`);
  return data;
};

export const useJson = () => {
  return useQuery({
    queryKey: ["JSON"],
    queryFn: () => jsonUse(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
