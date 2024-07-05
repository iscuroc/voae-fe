import React, { useEffect, useState } from "react";
import Filtro from "../../components/Filtros";
import Pagination from "../../components/Pagination";

const PaginaGestionVOAE: React.FC = () => {
    useEffect(() => {
        document.title = "VOAE - UNAH CUROC";
    }, []);

    const initialData = [
        // Tu array de datos aquí
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla2", ubicacion: "Biblioteca", ambito: "Social", carrera: "Comercio Internacional", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla2", ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/06/2024 4:50pm", final: "27/06/2024 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla3", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla3", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/06/2024 4:50pm", final: "27/06/2024 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Comercio Internacional", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla4", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla4", ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingeniería Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/06/2024 4:50pm", final: "27/06/2024 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingeniería Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingeniería Agroindustrial", cupos: 20, duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        
    ];

    const [filtrarData, setFiltrarData] = useState(initialData); // Estado para datos filtrados
    const [currentPage, setCurrentPage] = useState(1);
    
    //funcion de paginacion
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filtrarData.length / itemsPerPage); // Usar FiltrarData en lugar de initialData

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = filtrarData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Usar FiltrarData en lugar de initialData

    // Función para aplicar filtro
    const aplicarFiltros = (carrera: string, ambito: string, fechaInicio: string, fechaFin: string, busqueda: string) => {
        const filtrar = initialData.filter(item => {
            // Convertir las fechas de inicio y fin a objetos Date
            const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
            const fechaFinDate = fechaFin ? new Date(fechaFin) : null;
    
            // Convertir las fechas de los datos a objetos Date (asumiendo que están en "DD/MM/AAAA hh:mm")
            const inicioDate = new Date(item.inicio.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
            const finalDate = new Date(item.final.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
    
            return (
                (carrera === "" || item.carrera === carrera) &&
                (ambito === "" || item.ambito === ambito) &&
                (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
                (!fechaFinDate || finalDate <= fechaFinDate) &&
                (busqueda === "" || item.nombre.toLowerCase().includes(busqueda.toLowerCase()))
            );
        });
        setFiltrarData(filtrar);
        setCurrentPage(1); // Reiniciar la página actual al aplicar filtros
    };
    
    return (
        <div className="container mx-auto p-4">
            <div className="block md:flex items-center justify-center mb-4 mt-2">
            <Filtro aplicarFiltros={aplicarFiltros} />
            </div>

            <div className="rounded-xl">
                <div className="overflow-x-auto">
                    <table className="border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
                        <thead className="block md:table-header-group">
                            <tr className="border text-sm border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative bg-yellow-500 text-black">
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ubicación</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ámbito</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Carrera</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Cupos</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Duración</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Inicio</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Final</th>
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
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>{item.ubicacion}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>{item.ambito}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>{item.carrera}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cupos:</span>{item.cupos}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Duración:</span>{item.duracion}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Inicio:</span>{item.inicio}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Final:</span>{item.final}
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        <a href="/dashboard-voae/detalles-actividades" className="flex justify-center items-center font-bold group"  title="Ver">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} className="group-hover:text-blue-500 hidden md:block">
                                                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            <span className=" hover:text-blue-500 group-hover:text-blue-500 md:hidden">Ver detalles</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default PaginaGestionVOAE;
