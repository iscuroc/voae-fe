import axiosInstance, { useAxios } from "../axiosInstance";
import { Pagination } from "../types/Pagination";

export interface Career {
  id: number;
  name: string;
}

export interface Organization {
  id: number;
  name: string;
}

export enum Role {
  STUDENT = 0,
  TEACHER = 1,
  VOAE = 2,
}

export const roleMapper = (role: Role | number) => {
  const roles: Record<Role | number, string> = {
    [Role.STUDENT]: "Estudiante",
    [Role.TEACHER]: "Docente",
    [Role.VOAE]: "VOAE",
  };

  return roles[role] || "Desconocido";
};

export interface User {
  id: number;
  names: string;
  lastnames: string;
  accountNumber: number;
  role: number;
  email: string;
  career: Career;
  organizations: Organization[];
}

export type SimpleUserResponse = {
  id: number;
  names: string;
  email: string;
  role: number;
  careerName: string;
};

export const ObtenerDatosUsuarioIniciado = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get(`/users/me`);
    return response.data ? response.data : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const useGetUsersByRoles = () => {
  return useAxios<Pagination<SimpleUserResponse>>(
    {
      url: "/users/by-role",
      method: "GET",
    },
    {
      manual: true,
      useCache: false,
    }
  );
};
