import axiosInstance from "../axiosInstance";
import { Role } from "./usuarios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  role: Role;
  email: string;
};

export const loginAction = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginRequest, LoginResponse>(
    "/auth/login",
    data
  );
  return response;
};

export const registerAction = async (email: string) => {
  const response = await axiosInstance.post("/auth/register", { email });

  return response;
};

export const forgotPasswordAction = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email,
  });

  return response;
};
