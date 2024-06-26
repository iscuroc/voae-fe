import { useEffect, useState } from "react";
import FiltroMA from "../../components/filtroMisActividades";
import Pagination from "../../components/Pagination";

export default function PaginaMisActividades() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Mis Actividades - UNAH CUROC";
    }, []);

    const initialData = [
        // Tu array de datos aquí
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Arboles", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Discurso", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Caminata", ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Tarde de pelicula", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Deportivo", carrera: "Ingenieria en sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", final: "20/05/2022 7:00pm" },
       
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
    const aplicarFiltros = ( ambito: string, fechaInicio: string, fechaFin: string, busqueda: string) => {
        const filtrar = initialData.filter(item => {
            // Convertir las fechas de inicio y fin a objetos Date
            const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
            const fechaFinDate = fechaFin ? new Date(fechaFin) : null;
    
            // Convertir las fechas de los datos a objetos Date (asumiendo que están en "DD/MM/AAAA hh:mm")
            const inicioDate = new Date(item.inicio.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
            const finalDate = new Date(item.final.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
    
            return (
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
        <>
            <div className="container mx-auto p-2">
                <div className="block md:flex items-center justify-center mb-4 mt-2">

                    <FiltroMA aplicarFiltros={aplicarFiltros}/>
                </div>


                <div className="rounded-xl">
                    <div className="overflow-x-auto">
                        <table className=" border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
                            <thead className="block md:table-header-group">
                                <tr className="border  text-sm border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative bg-yellow-500 text-black ">
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ubicación</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ámbito</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Carrera</th>
                                    <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">Duración</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Inicio</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Final</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group text-sm md:text-xs">
                                {paginatedData.map((item, index) => (
                                    <tr key={index} className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>{item.nombre}
                                        </td>
                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>{item.ubicacion}                                        </td>
                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>{item.ambito}
                                        </td>
                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>{item.carrera}
                                        </td>

                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Duración:</span>{item.duracion}
                                        </td>
                                        <td className="p-1 md:border md:border-gray-500  block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Inicio:</span>{item.inicio}
                                        </td>
                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Final:</span>{item.final}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </div>
        </>
    )
}