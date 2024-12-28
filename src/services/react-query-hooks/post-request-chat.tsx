import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
async function requestChat(params: any) {
  const { message, receiver_id } = params;
  return http.post(
    `${API_ENDPOINTS.REQUEST_CHAT}?receiver_id=${receiver_id}&message=${message}`
  );
}

export const usePostRequestChat = () => {
  return useMutation((id: any) => requestChat(id), {
    onError: (error) => {
      console.log(error, "error in post request chat");
    },
  });
};
