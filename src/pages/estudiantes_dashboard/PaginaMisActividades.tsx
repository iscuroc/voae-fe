import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import FiltroMA from "../../components/filtros/filtroMisActividades";
import { ActividadEstado, ObtenerActividadesPorEstado } from "@/api/servicios/actividades";
import { EtiquetasÁmbitosActividad, formatDate } from "@/api/servicios/enums";
import Skeleton from "@/components/Skeleton";

export default function PaginaMisActividades() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Mis Horas - UNAH CUROC";
    }, []);

    const initialData2 = useMemo(() => [
        { ambito: "Social", horas: 10 },
        { ambito: "Científico", horas: 15 },
        { ambito: "Cultural", horas: 8 },
        { ambito: "Deportivo", horas: 5 },
    ], []);

    const ambitos = useMemo(() => initialData2.map(item => item.ambito), [initialData2]);
    const horas = useMemo(() => initialData2.map(item => item.horas), [initialData2]);

    // const initialData = [
    //     { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", encargado: 'jose contreras', duracion: "2 horas", inicio: "2024-07-12 01:14:23", final: "20/05/2022 7:00pm" },
    //     { nombre: "Arboles", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingenieria en sistemas", encargado: 'jose contreras', duracion: "2 horas", inicio: "2024-07-11 01:14:23", final: "20/05/2022 7:00pm" },
    //     { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Social", carrera: "Ingenieria en sistemas", encargado: 'jose contreras', duracion: "2 horas", inicio: "2024-07-10 01:14:23", final: "20/05/2022 7:00pm" },
    //     { nombre: "Discurso", ubicacion: "Biblioteca", ambito: "Cultural", carrera: "Ingenieria en sistemas", encargado: 'jose contreras', duracion: "2 horas", inicio: "2024-07-09 01:14:23", final: "20/05/2022 7:00pm" },
    //     { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", encargado: 'jose contreras', duracion: "2 horas", inicio: "2024-07-08 01:14:23", final: "20/05/2022 7:00pm" },
    //     { nombre: "Charla", ubicacion: "Biblioteca", ambito: "Academico", carrera: "Ingenieria en sistemas", encargado: 'jose contreras', duracion: "2 horas", inicio: "2024-07-07 01:14:23", final: "20/05/2022 7:00pm" },
    // ];
    const [filtrarData, setFiltrarData] = useState<ActividadEstado[]>([]); // Estado para datos filtrados
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga miestra trae los datos del backend
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const [paginaInicial, setPaginaInicial] = useState(1); // Página inicial para paginación

    // obtener los datos
    useEffect(() => {
        const obtenerDatos = async () => {
            setLoading(true); // Inicia la carga
            try {
                const data = await ObtenerActividadesPorEstado(1); // el numero es el estado que queres filtrar en el pagina de enums.ts estan los numeros de los estados
                console.log('data:', data)

                setFiltrarData(data);
            } catch (error) {
                setError('Failed to fetch activities');
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };
        obtenerDatos();
    }, []);

    //funcion de paginacion
    const itemsPerPaginas = 10;
    const TotalPaginas = Math.ceil(filtrarData.length / itemsPerPaginas); // Usar FiltrarData en lugar de initialData

    const handlePaginasChange = (Paginas: number) => {
        setPaginaInicial(Paginas);
    };

    const paginatedData = filtrarData.slice((paginaInicial - 1) * itemsPerPaginas, paginaInicial * itemsPerPaginas); // Usar FiltrarData en lugar de initialData

    // Función para aplicar filtro
    const aplicarFiltros = (ambito: string, fechaInicio: string, fechaFin: string, busqueda: string) => {
        const fechaInicioDate = fechaInicio ? new Date(fechaInicio.split('T')[0]) : null; // Obtener solo la fecha
        const fechaFinDate = fechaFin ? new Date(fechaFin.split('T')[0]) : null; // Obtener solo la fecha

        const filtrar = filtrarData.filter(item => {
            const inicioDate = new Date(item.startDate.split(' ')[0]); // Obtener solo la fecha desde la cadena de inicio

            return (
                (ambito === "" || item.scopes.some(s => EtiquetasÁmbitosActividad[s.scope] === ambito)) &&
                (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
                (!fechaFinDate || inicioDate <= fechaFinDate) &&
                (busqueda === "" || item.name.toLowerCase().includes(busqueda.toLowerCase()))
            );
        });

        setFiltrarData(filtrar);
        setPaginaInicial(1); // Reiniciar la página actual al aplicar filtros
    };

    if (loading) {
        return <Skeleton />; // Muestra un mensaje de carga
    }

    if (error) {
        return <div>Error: {error}</div>; // Muestra un error si ocurre
    }


    return (
        <>
            <div className="container mx-auto p-2">
                <div className="block md:flex items-center justify-center mb-4 mt-2">

                    <FiltroMA aplicarFiltros={aplicarFiltros} />
                </div>

                <h2 className="text-center my-5 text-xl font-bold underline">Horas</h2>
                {/* tabla de horas */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white border border-gray-200">
                            <thead className="hidden md:table-header-group">
                                <tr className="bg-blue-900 text-white">
                                    <th className="p-4 font-bold text-left">Ámbito</th>
                                    {ambitos.map((ambito, index) => (
                                        <th key={index} className="p-4 font-bold text-left">{ambito}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ambitos.map((ambito, index) => (
                                    <tr key={index} className="md:hidden  text-white">
                                        <td className="p-4 bg-blue-900 font-bold text-left">{ambito}</td>
                                        <td className="p-4 text-black border-b border-gray-200">{horas[index]}</td>
                                    </tr>
                                ))}
                                <tr className="hidden md:table-row bg-white">
                                    <td className="p-4 font-bold text-left">Horas</td>
                                    {horas.map((hora, index) => (
                                        <td key={index} className="p-4 border-b border-gray-200">{hora}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* tabla de actividad */}
                <h2 className="text-center my-5 text-xl font-bold underline">Actividades</h2>
                <div className="rounded-xl">
                    <div className="overflow-x-auto">
                        <table className=" border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
                            <thead className="block md:table-header-group">
                                <tr className="border  text-sm border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative bg-yellow-500 text-black ">
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ubicación</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ámbito</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Entidad Encargada</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Encargado</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group text-sm md:text-xs">
                                {paginatedData.map((item, index) => (
                                    <tr key={index} className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                         <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>{item.name}
                                    </td>
                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>{item.location}                                        </td>
                                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbitos:</span>{item.scopes.map(s => EtiquetasÁmbitosActividad[s.scope] || s.scope).join(", ")}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Entidad organizadora:</span>{item.organizers.map(fc => fc.career?.name || fc.organization?.name).join(", ")}
                                    </td>
                                        <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Encargado:</span>{item.coordinator.names} {item.coordinator.lastNames}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha Inicio:</span>{formatDate(item.startDate)}
                                    </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination PaginaInicial={paginaInicial} TotalPaginas={TotalPaginas} onPageChange={handlePaginasChange} />

            </div>
        </>
    )
}