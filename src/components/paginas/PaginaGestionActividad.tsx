import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Pagination from "../Pagination";
import Skeleton from "../Skeleton";
import FiltroGS from "../filtros/FiltroGestionSolicitudes";
import { ActividadEstado, ObtenerActividadesPorEstado} from "../../api/servicios/actividades";
import { EtiquetasÁmbitosActividad,  formatDate } from "../../api/servicios/enums";

const PaginaGestionActividad: React.FC = () => {
    
    const [filtrarData, setFiltrarData] = useState<ActividadEstado[]>([]); // Estado para datos filtrados
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga miestra trae los datos del backend
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const [paginaInicial, setPaginaInicial] = useState(1); // Página inicial para paginación
    const location = useLocation(); //(trae la url y ayuda redigir a ptr pagina dependiendo el path)
    // Obtener los datos
    useEffect(() => {
        const obtenerDatos = async () => {
            setLoading(true); // Inicia la carga
            try {
                const data = await ObtenerActividadesPorEstado(0); // El número es el estado que quieres filtrar
                console.log("Datos obtenidos de la API:", data); // Verifica todos los datos obtenidos
                setFiltrarData(data);
            } catch (error) {
                setError('Failed to fetch activities');
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };
        obtenerDatos();
    }, []);

   // Función para aplicar filtro
   const aplicarFiltros = (carrera: string, ambito: string, fechaInicio: string, fechaFin: string, busqueda: string) => {

    const fechaInicioDate = fechaInicio ? new Date(fechaInicio.split('T')[0]) : null;
    const fechaFinDate = fechaFin ? new Date(fechaFin.split('T')[0]) : null;

    const filtrar = filtrarData.filter(item => {
        const inicioDate = new Date(item.startDate.split('T')[0]);
        return (
            (carrera === "" || item.foreingCareers.some(fc => fc.name === carrera)) &&
            (ambito === "" || item.scopes.some(s => EtiquetasÁmbitosActividad[s.scope] === ambito)) &&
            (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
            (!fechaFinDate || inicioDate <= fechaFinDate) &&
            (busqueda === "" || item.name.toLowerCase().includes(busqueda.toLowerCase()))
        );
    });

    setFiltrarData(filtrar);
    setPaginaInicial(1); // Reiniciar la página actual al aplicar filtros
};

// Paginación
const itemsPerPage = 10;
const totalPaginas = Math.ceil(filtrarData.length / itemsPerPage); // Usar FiltrarData en lugar de initialData

const handlePageChange = (page: number) => {
    setPaginaInicial(page);
};

const paginatedData = filtrarData.slice((paginaInicial - 1) * itemsPerPage, paginaInicial * itemsPerPage); // Usar FiltrarData en lugar de initialData



if (loading) {
    return <Skeleton/>; // Muestra un mensaje de carga
}

if (error) {
    return <div>Error: {error}</div>; // Muestra un error si ocurre
}

    return (
        <div className="container mx-auto p-4">
            <div className="block md:flex items-center justify-center mb-4 mt-2">
                <FiltroGS aplicarFiltros={aplicarFiltros} />
            </div>

            <div className="rounded-xl">
                <div className="overflow-x-auto">
                    <table className="border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
                        <thead className="block md:table-header-group">
                            <tr className="border text-sm border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative bg-yellow-500 text-black">
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ubicación</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Entidad Organizadora</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Organizador</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ámbito</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Cupos</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Inicio</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Final</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group text-sm md:text-xs">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>{item.name}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>{item.location}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Entidad organizadora:</span>{item.organizers.map(fc => fc.career?.name || fc.organization?.name).join(", ")}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Encargado:</span>{item.coordinator.names}{item.coordinator.lastNames}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>{item.scopes.map(s => EtiquetasÁmbitosActividad[s.scope] || s.scope).join(", ")}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cupos:</span>{item.totalSpots}
                                    </td>
                                    
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha Inicio:</span>{formatDate(item.startDate)}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha Final:</span>{formatDate(item.endDate)}
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        <NavLink
                                            to={
                                                location.pathname.includes('dashboard-coordinador')
                                                    ? "/dashboard-coordinador/detalles-actividad/${item.slug}"
                                                    : location.pathname.includes('dashboard-estudiante')
                                                        ? "#"
                                                        : "/dashboard-voae/detalles-actividades/${item.slug}"
                                            }
                                            className="flex justify-center items-center font-bold group"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-black group-hover:text-yellow-500 transition-colors duration-200">
                                                <path d="M12 20h9V4H3v16h9" fill="none"/>
                                                <path d="M12 12l4 4M12 12l-4 4M12 12v9" fill="none"/>
                                            </svg>
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4">
                    <Pagination PaginaInicial={paginaInicial} TotalPaginas={totalPaginas} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
};

export default PaginaGestionActividad;
