import { ErrorData, ErrorItem } from "@/api/types/error";
import axios from "axios";
import { showAlert } from "./show-error-toast";

export const getErrorData = (error: unknown): ErrorData | undefined => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    return data;
  } else {
    showAlert("Ocurrió un error inesperado", {
      type: "error",
    });
  }
};

export const getFirstErrorDescription = (errors?: ErrorItem[]) => {
  if (!errors) return;
  const error = errors[0];
  return error ? error.description : "Error desconocido";
};
