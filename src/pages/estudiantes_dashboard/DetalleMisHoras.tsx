import React, { useEffect, useState } from "react";
import FiltroMH from "../../components/filtroMisHoras";
import Pagination from "../../components/Pagination";

const DetallesHorasVoae: React.FC = () => {
    useEffect(() => {
        document.title = "Mis Horas - UNAH CUROC";
    }, []);

    
    const initialData = [
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingeniería en Sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", finalizo: "20/05/2022 7:00pm" },
        { nombre: "Arboles", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingeniería en Sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", finalizo: "20/05/2022 7:00pm" },
        { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingeniería en Sistemas", duracion: "2 horas", inicio: "20/05/2022 4:50pm", finalizo: "20/05/2022 7:00pm" },
       
    ];

    const [filteredData, setFilteredData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Paginación
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Función para aplicar filtros
    const aplicarFiltros = (fechaInicio: string, fechaFin: string, busqueda: string) => {
        const filtered = initialData.filter(item => {
            const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
            const fechaFinDate = fechaFin ? new Date(fechaFin) : null;
            const inicioDate = new Date(item.inicio.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
            const finalDate = new Date(item.finalizo.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));

            return (
                (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
                (!fechaFinDate || finalDate <= fechaFinDate) &&
                (busqueda === "" || item.nombre.toLowerCase().includes(busqueda.toLowerCase()))
            );
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Reiniciar página al aplicar filtros
    };

    // Cambio de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-center mb-4">
                <FiltroMH aplicarFiltros={aplicarFiltros} />
            </div>

            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full table-auto bg-white border border-gray-200">
                    <thead className="bg-yellow-500 text-black">
                        <tr>
                            <th className="px-4 py-2 text-left">Nombre</th>
                            <th className="px-4 py-2 text-left">Ubicación</th>
                            <th className="px-4 py-2 text-left">Ámbito</th>
                            <th className="px-4 py-2 text-left">Carrera</th>
                            <th className="px-4 py-2 text-left">Duración</th>
                            <th className="px-4 py-2 text-left">Inicio</th>
                            <th className="px-4 py-2 text-left">Final</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {paginatedData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-200 transition-colors duration-200 border border-gray-500">
                                <td className="px-4 py-2">{item.nombre}</td>
                                <td className="px-4 py-2">{item.ubicacion}</td>
                                <td className="px-4 py-2">{item.ambito}</td>
                                <td className="px-4 py-2">{item.carrera}</td>
                                <td className="px-4 py-2">{item.duracion}</td>
                                <td className="px-4 py-2">{item.inicio}</td>
                                <td className="px-4 py-2">{item.finalizo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default DetallesHorasVoae;
