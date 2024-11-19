import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
export interface EditeProfileInput {
  image: Blob;
  first_name: string;
  last_name: string;
}

function editeProfile(input: EditeProfileInput) {
  return http.post(API_ENDPOINTS.EDIT_PROFILE, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const useEditeProfileMutation = () => {
  return useMutation((input: EditeProfileInput) => editeProfile(input), {
    onSuccess: (data, _) => {
      // console.log(data, 'success data from edite profile mutation');
    },
    onError: (data) => {
      console.log(data, "EditeProfile error response");
    },
  });
};
