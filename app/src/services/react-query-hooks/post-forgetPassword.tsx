import { API_ENDPOINTS } from "../api-endpoints";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { storage } from "../../utils/storage";

export interface postForgetPasswordType {
  email: string;
  event_uuid: string;
  subdomain_name: string;
}

function postForgetPassword(input: any) {
  console.log(input); // Log the input to the console

  return http.post(`${API_ENDPOINTS.FORGETPASSWORD}`, input);
}

export const usePostForgetPassword = () => {
  return useMutation(
    (input: postForgetPasswordType) => postForgetPassword(input),
    {
      onError: (data) => {
        console.log(data, "accept meeting request error response");
      },
    }
  );
};
