import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { storage } from "../../utils/storage";

const fetchPolls = async (queryKey: any) => {
  const { agenda_id } = queryKey;
  const EI = storage.getString("E-I");
  // console.log(EI, agenda_id, "EI, AGENDA_ID");
  const { data } = await http.get(
    `events/${EI}/event_users_polls?agenda_id=${agenda_id}`
  );
  return data;
};

export const useGetPolls = (options: any) => {
  return useQuery({
    queryKey: ["POLLS", options],
    queryFn: () => fetchPolls(options),
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
  });
};
