import { Scope } from "@/components/paginas/CreateActivity/types";
import axiosInstance, { useAxios } from "../axiosInstance";
import { UpdateActivityRequest } from "./actividades";

export enum OrganizerType {
  Career = 0,
  Organization = 1,
}

export interface Organizer {
  type: OrganizerType;
  careerId?: number;
  organizationId?: number;
}

export type ActividadCrear = {
  name: string;
  description: string;
  foreignCareersIds: number[];
  startDate: string;
  endDate: string;
  goals: string[];
  scopes: Scope[];
  supervisorId: number;
  coordinatorId: number;
  totalSpots: number;
  location: string;
  mainActivities: string[];
  organizers: Organizer[];
};

export const crearActividad = async (actividad: ActividadCrear) => {
  try {
    const response = await axiosInstance.post("/activities", actividad);
    return response.data;
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    throw error;
  }
};

export const useCreateActivity = () => {
  return useAxios<ActividadCrear>(
    {
      url: "/activities",
      method: "post",
    },
    {
      manual: true,
    }
  );
};

export const updateActividad = async (
  actividad: UpdateActivityRequest & { id: number }
) => {
  const response = await axiosInstance.put(
    `/activities/${actividad.id}`,
    actividad
  );
  return response.data;
};
