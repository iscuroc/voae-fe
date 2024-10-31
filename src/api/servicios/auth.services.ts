import axiosInstance from "../axiosInstance";
import { Role } from "./usuarios";

export type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
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
