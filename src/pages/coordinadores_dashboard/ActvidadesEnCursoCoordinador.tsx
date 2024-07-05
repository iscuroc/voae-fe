import React, { useEffect, useState } from "react";
import Filtro from "../../components/Filtros";
import Pagination from "../../components/Pagination";

const ActvidadesEnCursoCoordinador: React.FC = () => {
    useEffect(() => {
        document.title = "Estudiantes - UNAH CUROC";
    }, []);


    const initialData = [
        // Tu array de datos aquí
        { nombre: "Charla", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla1", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Social", carrera: "Desarrollo Local", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla1", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Social", carrera: "Desarrollo Local", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla1", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Social", carrera: "Desarrollo Local", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla2", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Administracion de Empresas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Administracion de Empresas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Administracion de Empresas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
        { nombre: "Charla3", imagen: 'https://edufcm.unah.edu.hn/assets/EDUFCM/paginas/actividad-deportiva-torneo-relampago-de-futbol/_resampled/ResizedImageWzYwMCw3NTBd/Torneo-de-Futbol.jpg', ubicacion: "Biblioteca", ambito: "Academico", carrera: "Administracion de Empresas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm" },
     
    ];
    const [filtrarData, setFiltrarData] = useState(initialData); // Estado para datos filtrados
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
            // Convertir las fechas de inicio y fin a objetos Date
            const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;

            // Convertir las fechas de los datos a objetos Date (asumiendo que están en "DD/MM/AAAA hh:mm")
            const inicioDate = new Date(item.inicio.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));

            return (
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
                                <div className="mt-auto">
                                    <a
                                        href="/dashboard-coordinador/detalles-actividad"
                                        className="block text-center bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                    >
                                        Ver
                                    </a>
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

export default ActvidadesEnCursoCoordinador;
