import { API_ENDPOINTS } from "../api-endpoints";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { storage } from "../../utils/storage";

export interface acceptMeetingInputType {
  id: string;
  event_user_calendar_id: string;
}
const queryClient = new QueryClient();

function acceptMeeting(input: any) {
  const eventID = storage.getString("E-I");
  const { id, event_user_calendar_id } = input;
  return http.patch(
    `events/${eventID}/${API_ENDPOINTS.USER_MEETING_CALENDARS}/${id}/${API_ENDPOINTS.ACCEPT_MEETING}`,
    { event_user_calendar_id }
  );
}

export const useAcceptMeeting = () => {
  return useMutation((input: acceptMeetingInputType) => acceptMeeting(input), {
    onError: (data) => {
      console.log(data, "accept meeting request error response");
    },
  });
};
