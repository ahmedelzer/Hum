import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
export interface PostLink {
  social_type: string;
  social_url: string;
}
function postLink(input: PostLink) {
  console.log(input, "input from post-link");
  return http.post(`${API_ENDPOINTS.SOCIALLINKS}`, input);
}
export const usePostLink = () => {
  return useMutation((input: PostLink) => postLink(input), {
    onError: (data) => {
      console.log(data, "PostMeetingCalendar error response");
    },
  });
};
