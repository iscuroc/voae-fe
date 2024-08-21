import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import FiltroHVoae from "../filtros/FiltroHVoae";
const HorasVOAE: React.FC = () => {
    useEffect(() => {
        document.title = "Horas VOAE - UNAH COPAN";
    }, []);

    const initialData = [
        // Array de datos iniciales
        { nombre: "Jose Contreras ", cuenta: "20182100278", correo: "jcontrerasr@unah.hn", carrera: "Ingenieria en sistemas", cientifico: 10, social: 5, deportivas: 3, cultural: 2, totalHoras: 20 },
        { nombre: "Jimmy Albert", cuenta: "20192100095", correo: "jimmya@unah.hn", carrera: "Ingenieria en sistemas", cientifico: 8, social: 7, deportivas: 4, cultural: 15, totalHoras: 34 },
        { nombre: "Lendy Abigail", cuenta: "20161001633", correo: "lendy.a@unah.hn", carrera: "Ingenieria en sistemas", cientifico: 6, social: 9, deportivas: 5, cultural: 8, totalHoras: 28 },
    ];
    
    const [filtrarData, setFiltrarData] = useState(initialData);
    const [paginaInicial, setPaginaInicial] = useState(1);

    // Configuración de la paginación
    const itemsPerPage = 10;
    const totalPaginas = Math.ceil(filtrarData.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setPaginaInicial(page);
    };

    const paginatedData = filtrarData.slice((paginaInicial - 1) * itemsPerPage, paginaInicial * itemsPerPage);

    // Función para aplicar filtro
    const aplicarFiltros = (carrera: string, correo: string) => {
        const filtrar = initialData.filter(item =>
            (carrera === "" || item.carrera === carrera) &&
            (correo === "" || item.cuenta.includes(correo))
        );

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
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre Completo</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Número de Cuenta</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Correo Institucional</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Carrera</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Científico</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Social</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Deportivas</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Cultural</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Total Horas</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group text-sm md:text-xs">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre Completo:</span>{item.nombre}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Número de Cuenta:</span>{item.cuenta}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Correo Institucional:</span>{item.correo}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>{item.carrera}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Científico:</span>{item.cientifico}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Social:</span>{item.social}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Deportivas:</span>{item.deportivas}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cultural:</span>{item.cultural}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Total Horas:</span>{item.totalHoras}
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

export default HorasVOAE;
