import axiosInstance from "../axiosInstance";

export interface Career {
    id: number;
    name: string;
}

export interface Organization {
    id: number;
    name: string;
}

export interface User {
    id: number;
    names: string;
    lastnames: string;
    accountNumber: number;
    role: number;
    career: Career;
    organizations: Organization[];
}

export const ObtenerDatosUsuarioIniciado = async (): Promise<User[]> => {
    try {
        const response = await axiosInstance.get(`/users/me`);
        return Array.isArray(response.data.items) ? response.data.items : [];
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};