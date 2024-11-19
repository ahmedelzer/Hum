import { API_ENDPOINTS } from "../api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { storage } from "../../utils/storage";
import { useCurrentUser } from "../../store/zustandStore";

export interface LoginInputType {
  email: string;
  password: string;
  event_uuid?: string;
  subdomain_name?: string;
}

async function login(input: LoginInputType) {
  return http.post(API_ENDPOINTS.LOGIN, input);
}

export const UseLoginMutation = () => {
  const { setCurrentUser } = useCurrentUser();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: async (data, _) => {
      const id = await data?.data.data.current_user.data.id;
      const name =
        (await data?.data.data.current_user.data.attributes.first_name) || "";

      // console.log(name, id, data?.data.data);
      storage.set("userId", id);
      storage.set("userName", name);
      setCurrentUser(data?.data.data);
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
