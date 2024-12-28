import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
export interface resetPasswordType {
  old_password: string;
  password: string;
  password_confirmation: string;
  event_user_email: string;
}

async function resetPassword(input: resetPasswordType) {
  return http.post(API_ENDPOINTS.RESET_PASSWORD, input);
}

export const useResetPassword = () => {
  return useMutation((input: resetPasswordType) => resetPassword(input), {
    onError: (data) => {
      console.log(data, "resetPassword error response");
    },
  });
};
