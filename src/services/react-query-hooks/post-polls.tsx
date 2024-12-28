import { API_ENDPOINTS } from "../api-endpoints";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { storage } from "../../utils/storage";

function postPolls(input: any) {
  const eventID = storage.getString("E-I");
  const { answers, poll_id } = input;

  // console.log(
  //   `events/${eventID}/event_users_poll_answers?answers=${
  //     answers && JSON.stringify(answers)
  //   }&poll_id=${poll_id}`
  // );

  return http.post(
    `events/${eventID}/event_users_poll_answers?answers=${
      answers && JSON.stringify(answers)
    }&poll_id=${poll_id}`
  );
}
export const usePostPolls = () => {
  return useMutation((input: any) => postPolls(input), {
    onError: (data) => {
      console.log(data, "accept meeting request error response");
    },
  });
};

// https://sc.eventy.cloud/en/api/v1/events/23/event_users_poll_answers?answers=[{'question_id': 2, answer: 'This is the answer'}, {'question_id': 2, answer: 'Theheheheh'}]&poll_id=24
