import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";

export interface postVerifyOtpType {
  otp: number;
  event_uuid: string;
  subdomain_name: string;
}

function postVerifyOtp(input: any) {
  console.log(input); // Log the input to the console

  return http.post(`${API_ENDPOINTS.VERIFY_OTP}`, input);
}

export const usePostVerifyOtp = () => {
  return useMutation((input: postVerifyOtpType) => postVerifyOtp(input), {
    onError: (data) => {
      console.log(data, "accept meeting request error response");
    },
  });
};
