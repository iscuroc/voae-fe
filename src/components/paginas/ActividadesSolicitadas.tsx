import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit } from "react-icons/fa";
import FiltroGS from "../filtros/FiltroGestionSolicitudes";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const ActividadesSolicitadas: React.FC = () => {
    useEffect(() => {
        document.title = "Activdades Solicitadas - UNAH COPAN";
    }, []);


    const initialData = [
        // Tu array de datos aquí
        { nombre: "Actividad 1", coordinador: "Odair Sauceda", carrera: "Ingenieria en sistemas", ambito: "Academico", inicio: "2024-07-12 01:14:23", final: "20/06/2025 7:00pm", estado: "Pendiente" },
        { nombre: "Actividad 2", coordinador: "Odair Sauceda", carrera: "Ingenieria en sistemas", ambito: "Social", inicio: "2024-07-10 01:14:23", final: "20/06/2025 7:00pm", estado: "Aprobado" },
        { nombre: "Actividad 3", coordinador: "Odair Sauceda", carrera: "Ingenieria en sistemas", ambito: "Academico", inicio: "2024-07-05 01:14:23", final: "20/06/2025 7:00pm", estado: "Rechazado" },

    ];


    const [filtrarData, setFiltrarData] = useState(initialData);
    const [PaginaInicial, setPaginaInicial] = useState(1);
    const location = useLocation();

    //funcion de paginacion
    const itemsPerPage = 10;
    const TotalPaginas = Math.ceil(filtrarData.length / itemsPerPage); // Usar FiltrarData en lugar de initialData

    const handlePageChange = (page: number) => {
        setPaginaInicial(page);
    };

    const paginatedData = filtrarData.slice((PaginaInicial - 1) * itemsPerPage, PaginaInicial * itemsPerPage); // Usar FiltrarData en lugar de initialData

    // Función para aplicar filtro
    const aplicarFiltros = (carrera: string, ambito: string, fechaInicio: string, fechaFin: string, estado: string) => {
        const fechaInicioDate = fechaInicio ? new Date(fechaInicio.split('T')[0]) : null; // Obtener solo la fecha
        const fechaFinDate = fechaFin ? new Date(fechaFin.split('T')[0]) : null; // Obtener solo la fecha

        const filtrar = initialData.filter(item => {
            const inicioDate = new Date(item.inicio.split(' ')[0]); // Obtener solo la fecha desde la cadena de inicio

            return (
                (carrera === "" || item.carrera === carrera) &&
                (ambito === "" || item.ambito === ambito) &&
                (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
                (!fechaFinDate || inicioDate <= fechaFinDate) &&
                (estado === "" || item.estado === estado)
            );
        });

        setFiltrarData(filtrar);
        setPaginaInicial(1); // Reiniciar la página actual al aplicar filtros
    };

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
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Estudiante:</span>{item.nombre}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Coordinador:</span>{item.coordinador}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>{item.carrera}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>{item.ambito}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha Inicio:</span>{item.inicio}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha Final:</span>{item.final}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Estado:</span>{item.estado}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Estado:</span>{item.estado}
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        {item.estado === "Rechazado" ? (
                                            <>
                                                <NavLink
                                                    to={
                                                        location.pathname.includes('dashboard-coordinador')
                                                            ? "#"
                                                            : location.pathname.includes('dashboard-estudiante')
                                                                ? `/dashboard-estudiante/actualizar-actividad/${item.inicio}`
                                                                : "/dashboard-voae/gestion-solicitud"
                                                    }
                                                    className="flex justify-center items-center font-bold group"
                                                >
                                                    <FaEdit className="w-5 h-5 text-red-600 group-hover:text-blue-500" />
                                                    <span className="hover:text-blue-500 group-hover:text-blue-500 md:hidden">Ver detalles</span>
                                                </NavLink>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink
                                                    to={
                                                        location.pathname.includes('dashboard-coordinador')
                                                            ? "#"
                                                            : location.pathname.includes('dashboard-estudiante')
                                                                ? `/dashboard-estudiante/detalles-actividad/${item.final}`
                                                                : "/dashboard-voae/gestion-solicitud"
                                                    }
                                                    className="flex justify-center items-center font-bold group"
                                                >
                                            <MdOutlineRemoveRedEye className="group-hover:text-blue-500 hidden md:block h-7 w-7" />

                                                    <span className="hover:text-blue-500 group-hover:text-blue-500 md:hidden">Ver detalles</span>
                                                </NavLink>
                                            </>
                                        )}
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination PaginaInicial={PaginaInicial} TotalPaginas={TotalPaginas} onPageChange={handlePageChange} />
        </div>
    );
};

export default ActividadesSolicitadas;

