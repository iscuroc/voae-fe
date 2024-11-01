import { message as antdMessage } from "antd";
import { TypeOpen } from "antd/es/message/interface";
import { ToastOptions } from "react-toastify";
export type TypeOptions = "info" | "success" | "warning" | "error" | "default";

export const showAlert = (message?: string, opts?: ToastOptions<unknown>) => {
  const messagesTypes: Record<TypeOptions, TypeOpen> = {
    success: antdMessage.success,
    error: antdMessage.error,
    info: antdMessage.info,
    warning: antdMessage.warning,
    default: antdMessage.info,
  };

  if (opts?.type) {
    (messagesTypes[opts.type] ?? messagesTypes.default)(message);
  }
};
