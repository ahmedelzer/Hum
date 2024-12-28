import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchAllEvents = async () => {
  TODO: "Replace with your API URL REGESTRATION";

  const { data } = await axios.get(
    "https://registration.eventy.cloud/en/api/v1/events/all_events"
  );
  return data;
};

export const useGetAllEvents = () => {
  return useQuery([`ALL_EVENTS`], fetchAllEvents, {
    cacheTime: 1000 * 60,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
