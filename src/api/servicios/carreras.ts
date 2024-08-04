import axiosInstance from "../axiosInstance";


export interface Carrera {
    id: number;
    name: string;
    faculty: {
        id: number;
        name: string;
    };
}

export const obtenerTodasLasCarreras = async (): Promise<Carrera[]> => {
    const response = await axiosInstance.get('/careers');
    return response.data;
};