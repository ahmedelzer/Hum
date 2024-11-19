import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
export interface DeleteLink {
  id: number;
}
function deleteLink(input: DeleteLink) {
  return http.delete(`${API_ENDPOINTS.SOCIALLINKS}/${input.id}`);
}
export const useDeleteLink = () => {
  return useMutation((input: DeleteLink) => deleteLink(input), {
    onError: (data) => {
      console.log(data, "Delete Link error response");
    },
  });
};
