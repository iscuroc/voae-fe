import axiosInstance from "../axiosInstance";

export interface Scope {
    scope: number;
    hours: number;
}

interface Organizer {
    type: number;
    careerId: number | null;
    organizationId: number | null;
  }

export interface Actividad {
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
    supervisorText?: string;  // Agregar esta línea
    coordinatorText?: string; // Agregar esta línea
}

export const crearActividad = async (actividad: Actividad) => {
    try {
        const response = await axiosInstance.post('/activities', actividad);
        return response.data;
    } catch (error) {
        console.error('Error al crear la actividad:', error);
        throw error;
    }
};
