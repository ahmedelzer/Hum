import { http } from "../http";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import { storage } from "../../utils/storage";

const fetchUserMeetings = async () => {
  const eventID = storage.getString("E-I");
  const { data } = await http.get(
    `events/${eventID}/${API_ENDPOINTS.USER_MEETING_CALENDARS}`
  );
  return data.data;
};

export const useGetUserMeetings = () => {
  return useQuery(["USER_MEETINGS"], fetchUserMeetings, {
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
