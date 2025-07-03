// utils/useErrorToast.ts
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../../../components/ui";
import { useRef } from "react";

export function useErrorToast() {
  const toast = useToast();
  const lastMessageRef = useRef<string | null>(null);

  const showErrorToast = (
    title: string,
    description: string,
    action = "error",
    variant = "solid"
  ) => {
    // Prevent duplicate message
    if (lastMessageRef.current === description) return;

    lastMessageRef.current = description;

    const toastId = Math.random().toString();
    toast.show({
      id: toastId,
      placement: "top",
      duration: 3000,
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
