import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../../../components/ui";
import { useRef } from "react";

export function useErrorToast() {
  const toast = useToast();

  const showErrorToast = (
    title: string,
    description: string,
    action = "error",
    variant = "solid"
  ) => {
    const toastId = Math.random().toString();

    toast.show({
      id: toastId,
      placement: "top",
      duration: 5000,
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} action={action} variant={variant}>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </Toast>
      ),
    });
  };

  return { showErrorToast };
}
