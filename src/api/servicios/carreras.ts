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

export interface UserCarrera {
    id: number;
    names: string;
    lastnames: string;
    email: string;
    accountNumber: number;
    careerID: number;
  }

  export const obtenerEstudiantesPorCarreras = async (carreraId: number, query: string): Promise<UserCarrera[]> => {
    const response = await axiosInstance.get(`/careers/${carreraId}/students`, {
        params: { query }
    });
    return response.data;
};

// Función para obtener profesores filtrados por carrera y texto de consulta
export const obtenerProfesorPorCarreras = async (carreraId: number, query: string): Promise<UserCarrera[]> => {
    const response = await axiosInstance.get(`/careers/${carreraId}/teachers`, {
        params: { query }
    });
    return response.data;
};

