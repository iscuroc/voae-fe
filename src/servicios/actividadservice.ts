import axiosInstance from '../../src/api/axiosInstance';

export interface Scope {
    scope: number;
    hours: number;
}

export interface Actividad {
    name: string;
    description: string;
    mainCareerId: number;
    availableCareers: number[];
    startDate: string;
    endDate: string;
    goals: string;
    scopes: Scope[];
    careerTeacherId: number;
    careerStudentId: number;
    totalSpots: number;
    location: string;
    mainActivities: string[];
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
