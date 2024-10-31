import { toast, ToastOptions } from "react-toastify";

export const showAlert = (message?: string, opts?: ToastOptions<unknown>) => {
  toast(message, opts);
};
