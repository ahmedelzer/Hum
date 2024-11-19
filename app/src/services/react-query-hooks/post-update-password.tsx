import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";

export interface postUpdatePasswordType {
  otp: number;
  event_uuid: string;
  subdomain_name: string;
  password: string;
  password_confirmation: string;
}

function postUpdatePassword(input: any) {
  console.log(input); // Log the input to the console

  return http.post(`${API_ENDPOINTS.UPDATE_PASSWORD}`, input);
}

export const usePostUpdatePassword = () => {
  return useMutation(
    (input: postUpdatePasswordType) => postUpdatePassword(input),
    {
      onError: (data) => {
        console.log(data, "accept meeting request error response");
      },
    }
  );
};
