import axiosInstance, { useAxios } from "../axiosInstance";

export enum OrganizerType {
  Career = 0,
  Organization = 1,
}
export interface Scope {
  scope: number;
  hours: number;
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
  id: number,
  actividad: ActividadCrear
) => {
  try {
    const response = await axiosInstance.put(`/activities/${id}`, actividad);
    return response.data;
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    throw error;
  }
};
