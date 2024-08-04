
export const EtiquetasEstadoActividad: { [key: number]: string } = {
    0: "Pendiente",
    1: "Rechazado",
    2: "Aprobado",
    3: "Publicado",
    4: "Cancelado",
    5: "En Progreso",
    6: "Completado"
};

export const EtiquetasÁmbitosActividad: { [key: number]: string } = {
    0: "Científico",
    1: "Cultural",
    2: "Social",
    3: "Deportes",
    4: "Becas"
};


export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};