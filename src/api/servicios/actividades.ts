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

export interface Activity {
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
    reviewObservations: string;
    organizers: Organizer[];
    supervisor: Person;
    coordinator: Person;
    requestedBy: Person;
    foreingCareers: ForeignCareer[];
    scopes: Scope[];
}

export const ObtenerActividadesPorEstado = async (status: number): Promise<Activity[]> => {
    try {
        const response = await axiosInstance.get(`/activities?status=${status}`);
        return Array.isArray(response.data.items) ? response.data.items : []; 
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};

export const ObtenerActividadesPorNombre = async (slug: string): Promise<Activity[]> => {
    try {
        const response = await axiosInstance.get(`/activities?slug=${slug}`);
        return Array.isArray(response.data.items) ? response.data.items : []; 
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};
