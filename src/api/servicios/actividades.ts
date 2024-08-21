import axiosInstance from "../axiosInstance";

export interface Organizer {
    career: {
        id: number;
        name: string;
    };
    organization: {
        id: number;
        name: string;
    };
}

export interface Person {
    id: number;
    names: string;
    lastNames: string;
    role: number;
}

export interface ForeignCareer {
    id: number;
    name: string;
}

export interface Scope {
    id: number;
    hourAmount: number;
    scope: number;
}

export interface ActividadEstado {
    id: number;
    slug: string;
    name: string;
    description: string;
    location: string;
    mainActivities: string[];
    goals: string[];
    startDate: string;
    endDate: string;
    totalSpots: number;
    bannerLink: string;
    lastRequestedAt: string;
    activityStatus: number;
    lastReviewedAt: string;
    reviewObservations: string[];
    organizers: Organizer[];
    supervisor: Person;
    coordinator: Person;
    requestedBy: Person;
    foreingCareers: ForeignCareer[];
    scopes: Scope[];
}

export const ObtenerActividadesPorEstado = async (status: number): Promise<ActividadEstado[]> => {
    try {
        const response = await axiosInstance.get(`/activities?status=${status}`);
        return Array.isArray(response.data.items) ? response.data.items : [];
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};

export const ObtenerActividadesSolicitadas = async (status: number): Promise<ActividadEstado[]> => {
    try {
        const response = await axiosInstance.get(`/activities?status=${status}`);
        return Array.isArray(response.data.items) ? response.data.items : [];
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};

interface Coordinator {
    id: number;
    names: string;
    lastnames: string;
    role: number;
}

export interface Scope2 {
    id: number;
    hours: number;
    scope: number;
}

export interface ActividadNombre {
    id: number;
    name: string;
    goals: string[];
    mainActivities: string[];
    description: string;
    coordinator: Coordinator;
    supervisor: Coordinator;
    location: string;
    scopes: Scope2[];
    foreingCareers: ForeignCareer[];
    totalSpots: number;
    startDate: string;
    endDate: string;
}


export const ObtenerActividadesPorNombre = async (slug: string): Promise<ActividadNombre[]> => {
    try {
        const response = await axiosInstance.get(`/activities/by-slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener actividades:', error);
        throw error;
    }
};

export const AprobarActividad = async (id: number, reviewerObservation: string): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/activities/${id}/approve`, {
            reviewerObservation,
        });
        return response.data;
    } catch (error) {
        console.error('Error al aprobar la actividad:', error);
        throw error;
    }
};

export const RechazarActividad = async (id: number, reviewerObservation: string): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/activities/${id}/reject`, {
            reviewerObservation,
        });
        return response.data;
    } catch (error) {
        console.error('Error al aprobar la actividad:', error);
        throw error;
    }
};
