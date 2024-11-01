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
  return error
    ? error
    : ({
        description: "Ocurrió un error inesperado",
        code: "UNEXPECTED_ERROR",
        type: 1,
        isUnexpectedError: true,
      } as ErrorItem);
};

const errorDictionary: Record<string, string> = {
  "Email is already in use": "El correo institucional ya está en uso",
  "Account not found": "No se encontró la cuenta",
  "Authentication.InvalidToken": "El token de confirmación es inválido.",
  "Authentication.TokenExpired": "El token de confirmación ha expirado.",
  "Authentication.EmailAlreadyConfirmed":
    "El correo electrónico ya ha sido confirmado.",
  "Authentication.InvalidAccountNumber": "Número de cuenta inválido.",
  "Authentication.AccountNumberInUse":
    "Número de cuenta ya en uso o no valido, (si es empleado y su cuenta es de 4 digitos coloque un cero(0) al principio para completar los 5 digitos requeridos.",
};

export const getTranslatedError = (error?: ErrorItem) => {
  if (!error) return "";
  return errorDictionary[error.code] || error.description;
};
