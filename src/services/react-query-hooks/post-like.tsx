import { API_ENDPOINTS } from "../api-endpoints";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { storage } from "../../utils/storage";

function postLike(input: any) {
  const eventID = storage.getString("E-I");
  const { answers, question_id } = input;

  return http.post(
    `events/${eventID}/event_users_questions/${question_id}/like_question`
  );
}
export const usePostLike = () => {
  return useMutation((input: any) => postLike(input), {
    onError: (data) => {
      console.log(data, "accept meeting request error response");
    },
  });
};

// https://sc.eventy.cloud/en/api/v1/events/23/event_users_poll_answers?answers=[{'question_id': 2, answer: 'This is the answer'}, {'question_id': 2, answer: 'Theheheheh'}]&poll_id=24
