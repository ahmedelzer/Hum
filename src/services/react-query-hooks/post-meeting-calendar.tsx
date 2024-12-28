import { API_ENDPOINTS } from "../api-endpoints";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { storage } from "../../utils/storage";
export interface PostMeetingCalendarInput {
  selected_start_date: string;
  selected_end_date: string;
  receiver_id: number;
  event_user_calendar_id: number;
}

function postMeetingsCalendar(input: PostMeetingCalendarInput) {
  const eventID = storage.getString("E-I");
  return http.post(
    `events/${eventID}/${API_ENDPOINTS.POST_MEETING_CALANDER}`,
    input
  );
}

export const usePostMeetingCalendar = () => {
  return useMutation(
    (input: PostMeetingCalendarInput) => postMeetingsCalendar(input),
    {
      onError: (data) => {
        console.log(data, "PostMeetingCalendar error response");
      },
    }
  );
};
