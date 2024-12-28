import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { storage } from "../../utils/storage";

const fetchQa = async (queryKey: any) => {
  const { agenda_id } = queryKey;
  // console.log(agenda_id, "agenda_id");
  const EI = storage.getString("E-I");
  const { data } = await http.get(
    `events/${EI}/event_users_questions?agenda_id=${agenda_id}`
  );
  return data;
};

export const useGetQa = (options: any) => {
  return useQuery({
    queryKey: ["QA", options],
    queryFn: () => fetchQa(options),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};
