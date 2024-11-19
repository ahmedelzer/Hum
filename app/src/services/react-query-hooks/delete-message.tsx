import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";

function deleteMessage(input: any) {
  console.log(input, "input from delete-link");

  console.log(
    `${API_ENDPOINTS.REMOVE_CHAT_REQUEST}?id=${input.id}&sender_id=${input.sender_id}`,
    "    `${API_ENDPOINTS.REMOVE_CHAT_REQUEST}?id=${input.id}&sender_id=${input.sender_id}`"
  );

  return http.delete(
    `${API_ENDPOINTS.EVENET_USER}/${API_ENDPOINTS.REMOVE_CHAT_REQUEST}?id=${input.id}&sender_id=${input.sender_id}`
  );
}
export const useDeleteMessage = () => {
  return useMutation((input: any) => deleteMessage(input), {
    onError: (data) => {
      console.log(data, "Delete Link error response");
    },
  });
};
