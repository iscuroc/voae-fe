import React, { useEffect, useState } from "react";
import FiltroHVoae from "../FiltroHVoae";
import Pagination from "../Pagination";
import { NavLink } from "react-router-dom";

const GestionUsuarios: React.FC = () => {
    useEffect(() => {
        document.title = "Activdades Solicitadas - UNAH COPAN";
    }, []);

    
    const initialData = [
        // Tu array de datos aquí
        { nombre: "Jose Carlos", apellido: "Herrera Perez", numCuenta: "20201031872", carrera: "Ingeniería en Sistemas", email: "jcarloshp@unah.hn", rol: "estudiante" },
        { nombre: "Maria Carolina", apellido: "Guitierrez Moreno", numCuenta: "20201065478", carrera: "Ingeniería en Sistemas", email: "carloguim@unah.com.edu", rol: "docente" },
        { nombre: "Jose Maria", apellido: "Perez Zeras", numCuenta: "20876543872", carrera:"Administración de Empresas", email: "plpzeras@unah.hn", rol: "estudiante" },
    ];
    const [filtrarData, setFiltrarData] = useState(initialData); // Estado para datos filtrados
    const [PaginaInicial, setPaginaInicial] = useState(1);
    
    //funcion de paginacion
    const itemsPerPage = 10;
    const TotalPaginas = Math.ceil(filtrarData.length / itemsPerPage); // Usar FiltrarData en lugar de initialData

    const handlePageChange = (page: number) => {
        setPaginaInicial(page);
    };

    const paginatedData = filtrarData.slice((PaginaInicial - 1) * itemsPerPage, PaginaInicial * itemsPerPage); // Usar FiltrarData en lugar de initialData

     // Función para aplicar filtro
     const aplicarFiltros = (nombre:string, carrera: string) => {
           
        const filtrar = initialData.filter(item => {
    
            return (
                (nombre === "" || item.nombre === nombre) &&
                 (carrera === "" || item.carrera === carrera)

            );
        });
    
        setFiltrarData(filtrar);
        setPaginaInicial(1); // Reiniciar la página actual al aplicar filtros
    };
    
    return (
        <div className="container mx-auto p-4">
            <div className="block md:flex items-center justify-center mb-4 mt-2">
            <FiltroHVoae aplicarFiltros={aplicarFiltros} />
            </div>

            <div className="rounded-xl">
                <div className="overflow-x-auto">
                    <table className="border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
                        <thead className="block md:table-header-group">
                            <tr className="border text-sm border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative bg-yellow-500 text-black">
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Apellido</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Numero de Cuenta/Empleado</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Carrera</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Correo Institucional</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Rol</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Acción</th>
                                </tr>
                        </thead>
                        <tbody className="block md:table-row-group text-sm md:text-xs">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>{item.nombre}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Apellido:</span>{item.apellido}
                                    </td>
                                   <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Numero de Cuenta:</span>{item.numCuenta}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>{item.carrera}
                                    </td>
                                   <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Correo Institucional:</span>{item.email}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Rol:</span>{item.rol}
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                    <NavLink
                                        to={
                                           location.pathname.includes('dashboard-estudiante')
                                                    ? "#"
                                                    : "#"
                                        }
                                        className="flex justify-center items-center font-bold group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} className="group-hover:text-blue-500 hidden md:block">
                                        <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" stroke="currentColor" strokeWidth="1.5" />
                                        
                                            </svg>
                                            <span className="hover:text-blue-500 group-hover:text-blue-500 md:hidden">Ver detalles</span>
                                    </NavLink>
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

export default GestionUsuarios;

