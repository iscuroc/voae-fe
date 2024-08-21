import { EtiquetasÁmbitosActividad, EtiquetasEstadoActividad, formatDate } from "../../api/servicios/enums";
import { ActividadEstado, ObtenerActividadesSolicitadas} from "../../api/servicios/actividades";
import FiltroGS from "../filtros/FiltroGestionSolicitudes";
import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Pagination from "../Pagination";
import Skeleton from "../Skeleton";



const ActividadesSolicitadas: React.FC = () => {
    useEffect(() => {
        document.title = "Activdades Solicitadas - UNAH COPAN";
    }, []);

/*
    const initialData = [
        // Tu array de datos aquí
        { nombre: "Actividad 1", coordinador: "Odair Sauceda", carrera: "Ingenieria en sistemas", ambito: "Academico", inicio: "2024-07-12 01:14:23", final: "20/06/2025 7:00pm", estado: "Pendiente" },
        { nombre: "Actividad 2", coordinador: "Odair Sauceda", carrera: "Ingenieria en sistemas", ambito: "Social", inicio: "2024-07-10 01:14:23", final: "20/06/2025 7:00pm", estado: "Aprobado" },
        { nombre: "Actividad 3", coordinador: "Odair Sauceda", carrera: "Ingenieria en sistemas", ambito: "Academico", inicio: "2024-07-05 01:14:23", final: "20/06/2025 7:00pm", estado: "Rechazado" },

    ];
*/

    const [filtrarData, setFiltrarData] = useState<ActividadEstado[]>([]); // Estado para datos filtrados
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga miestra trae los datos del backend
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const [paginaInicial, setPaginaInicial] = useState(1); // Página inicial para paginación
    const location = useLocation(); //(trae la url y ayuda redigir a ptr pagina dependiendo el path)

/*
    //funcion de paginacion
    const itemsPerPage = 10;
    const TotalPaginas = Math.ceil(filtrarData.length / itemsPerPage); // Usar FiltrarData en lugar de initialData

    const handlePageChange = (page: number) => {
        setPaginaInicial(page);
    };

    const paginatedData = filtrarData.slice((PaginaInicial - 1) * itemsPerPage, PaginaInicial * itemsPerPage); // Usar FiltrarData en lugar de initialData
*/

    // obtener los datos
    useEffect(() => {
        const obtenerDatos = async () => {
            setLoading(true); // Inicia la carga
            try {
                const data = await ObtenerActividadesSolicitadas(0); // el numero es el estado que queres filtrar en el pagina de enums.ts estan los numeros de los estados
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
    const aplicarFiltros = (carrera: string, ambito: string, fechaInicio: string, fechaFin: string, estado: string) => {
        const fechaInicioDate = fechaInicio ? new Date(fechaInicio.split('T')[0]) : null; // Obtener solo la fecha
        const fechaFinDate = fechaFin ? new Date(fechaFin.split('T')[0]) : null; // Obtener solo la fecha

        const filtrar = filtrarData.filter(item => {
            const inicioDate = new Date(item.startDate.split('T')[0]);

            return (
                (carrera === "" || item.foreingCareers.some(fc => fc.name === carrera)) &&
                (ambito === "" || item.scopes.some(s => EtiquetasÁmbitosActividad[s.scope] === ambito)) &&
                (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
                (!fechaFinDate || inicioDate <= fechaFinDate) &&
                (estado === "" || EtiquetasEstadoActividad[item.activityStatus] === estado)
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
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Coordinador</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Carrera</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ámbito</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Fecha Inicio</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Fecha Final</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Estado</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Observaciones</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Revision</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group text-sm md:text-xs">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>{item.name}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Coordinador:</span>{item.coordinator.names} {item.coordinator.lastNames}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>{item.organizers.map(fc => fc.career?.name)}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>{item.scopes.map(s => EtiquetasÁmbitosActividad[s.scope] || s.scope).join(", ")}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha Inicio:</span>{formatDate(item.startDate)}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha Final:</span>{formatDate(item.endDate)}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Estado:</span>{EtiquetasEstadoActividad[item.activityStatus] || item.activityStatus}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Observaciones:</span>{item.reviewObservations}
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        
                                                <NavLink
                                                    to={
                                                        location.pathname.includes('dashboard-coordinador')
                                                            ? "#"
                                                            : location.pathname.includes('dashboard-estudiante')
                                                                ? `/dashboard-estudiante/actualizar-actividad/${item.slug}`
                                                                : "/dashboard-voae/gestion-solicitud"
                                                    }
                                                    className="flex justify-center items-center font-bold group"                                                    
                                                >
                                                    <MdOutlineRemoveRedEye className="group-hover:text-blue-500 hidden md:block h-7 w-7" />
                                                    <FaEdit className="w-5 h-5 text-red-600 group-hover:text-blue-500" />
                                                    <span className="hover:text-blue-500 group-hover:text-blue-500 md:hidden">Revisión</span>
                                                </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <Pagination PaginaInicial={paginaInicial} TotalPaginas={totalPaginas} onPageChange={handlePageChange} />
        </div>
    );
};

export default ActividadesSolicitadas;

