import React, { useEffect, useState } from "react";
import Filtro from "./Filtros";
import Pagination from "./Pagination";
import { NavLink } from "react-router-dom";

const ActvidadesEnCurso: React.FC = () => {
    useEffect(() => {
        document.title = "Actividades en Curso - UNAH COPAN";

    }, []);
    const initialData = [
        // Tu array de datos aquí
        { nombre: "Charla", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingeniería en Sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla1", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Social", carrera: "Licenciatura en Desarrollo Local", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'Aprobado' },
        { nombre: "Charla1", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Social", carrera: "Licenciatura en Desarrollo Local", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla1", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Social", carrera: "Técnico en Producción Agrícola", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'Finalizado' },
        { nombre: "Charla", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingeniería en Sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingeniería Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Técnico en Administración de Empresas Cafetaleras", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingeniería Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingeniería en Sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingeniería Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Licenciatura en Administración de Empresas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'Finalziado' },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Licenciatura en Comercio Internacional", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'Aprobado' },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Licenciatura en Administración de Empresas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Licenciatura en Administración de Empresas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", estado: 'En Curso' },
    ];

    const [filtrarData, setFiltrarData] = useState(initialData.filter(item => item.estado === 'En Curso')); // Estado para datos filtrados
    const [currentPage, setCurrentPage] = useState(1);

    //funcion de paginacion
    const itemsPerPage = 12;
    const totalPages = Math.ceil(filtrarData.length / itemsPerPage); // Usar FiltrarData en lugar de initialData

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = filtrarData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Usar FiltrarData en lugar de initialData

    // Función para aplicar filtro
    const aplicarFiltros = (carrera: string, ambito: string, fechaInicio: string, busqueda: string) => {
        const filtrar = initialData.filter(item => {
            // Convertir las fechas de inicio a objetos Date
            const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;

            // Convertir las fechas de los datos a objetos Date (asumiendo que están en "DD/MM/AAAA hh:mm")
            const inicioDate = new Date(item.inicio.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));

            return (
                item.estado === 'En Curso' && // Filtrar solo actividades en curso
                (carrera === "" || item.carrera === carrera) &&
                (ambito === "" || item.ambito === ambito) &&
                (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
                (busqueda === "" || item.nombre.toLowerCase().includes(busqueda.toLowerCase()))
            );
        });
        setFiltrarData(filtrar);
        setCurrentPage(1); // Reiniciar la página actual al aplicar filtros
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="block md:flex items-center justify-center mb-4 mt-2">
                    <Filtro aplicarFiltros={aplicarFiltros} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {paginatedData.map((item, index) => (
                        <div key={index} className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white border border-gray-200">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow text-gray-700">
                                <h2 className="text-lg font-bold mb-2">{item.nombre}</h2>
                                <p className=" mb-1"><span className="font-bold">Ubicación:</span> {item.ubicacion}</p>
                                <p className=" mb-1"><span className="font-bold">Ámbito:</span> {item.ambito}</p>
                                <p className=" mb-1"><span className="font-bold">Carrera:</span> {item.carrera}</p>
                                <p className=" mb-1"><span className="font-bold">Cupos disponibles:</span> {item.cupos}</p>
                                <p className=" mb-1"><span className="font-bold">Duración:</span> {item.duracion}</p>
                                <p className=" mb-1"><span className="font-bold">Inicio:</span> {item.inicio}</p>
                                <p className=" mb-1"><span className="font-bold">Estado:</span> {item.estado}</p>
                                <div className="mt-auto">
                                    <NavLink
                                        to={
                                            location.pathname.includes('dashboard-coordinador')
                                                ? "/dashboard-coordinador/detalles-actividad"
                                                : location.pathname.includes('dashboard-estudiante')
                                                    ? "/dashboard-estudiante/unirse-actividad"
                                                    : "/dashboard-voae/detalles-actividades"
                                        }
                                        className="block text-center bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                    >
                                        Ver detalles
                                    </NavLink>
                                  
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </>
    );
};

export default ActvidadesEnCurso;
