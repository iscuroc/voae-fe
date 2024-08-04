
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Activity, ObtenerActividadesPorNombre } from '../../api/servicios/actividades';
import { EtiquetasÁmbitosActividad, formatDate } from '../../api/servicios/enums';


const PaginaGestionSolicitudesVOAE: React.FC = () => {
    useEffect(() => {
        document.title = "Coordinadores - UNAH CUROC"
    }, []);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { slug } = useParams<{ slug?: string }>();


    useEffect(() => {
        const obtenerDatos = async () => {
            setLoading(true); // Inicia la carga
            try {
                if (slug) { 
                    const data = await ObtenerActividadesPorNombre(slug);
                    if (Array.isArray(data)) {
                        setActivities(data);
                    } else {
                        setError('Unexpected data structure');
                    }
                } else {
                    setError('No name parameter provided');
                }
            } catch (error) {
                setError('Failed to fetch activities');
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };
        obtenerDatos();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>; // Muestra el mensaje de carga
    }

    if (error) {
        return <div>Error: {error}</div>; // Muestra el error si ocurre
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl">

                <h1 className="text-center text-2xl font-bold mb-4 ">Revisión de Solicitud</h1>

                <div className=" bg-blue-900 shadow-lg rounded-lg flex overflow-hidden mb-4">

                    <div className="w-2/3 p-6">
                        <h5 className="text-center text-2xl font-bold mb-4 text-white">Datos de la solicitud</h5>
                        <table className="table-auto border-collapse border border-gray-400">
                        {activities.map(actividad => (
    <tbody key={actividad.id}>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Nombre</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{actividad.name}</td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Objetivos</td>
            <td className="border-2 border-black px-4 py-2 bg-white">
                <ul className="list-disc pl-5">
                    {actividad.goals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                    ))}
                </ul>
            </td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Actividades Principales</td>
            <td className="border-2 border-black px-4 py-2 bg-white">
                <ul className="list-disc pl-5">
                    {actividad.mainActivities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Descripción</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{actividad.description}</td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Coordinador de actividad</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{actividad.coordinator.names} {actividad.coordinator.lastNames}</td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Supervisor</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{actividad.supervisor.names} {actividad.supervisor.lastNames}</td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Ubicacion</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{actividad.location}</td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Ambito</td>
            <td className="border-2 border-black px-4 py-2 bg-white">
                <ul className="list-disc pl-5">
                    {actividad.scopes.map((scope, index) => (
                        <li key={index}>
                            {EtiquetasÁmbitosActividad[scope.scope] || scope.scope} | {scope.hourAmount} horas
                        </li>
                    ))}
                </ul>
            </td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Carrera</td>
            <td className="border-2 border-black px-4 py-2 bg-white">
                <ul className="list-disc pl-5">
                    {actividad.foreingCareers.map((fc, index) => (
                        <li key={index}>{fc.name}</li>
                    ))}
                </ul>
            </td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Cupos</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{actividad.totalSpots}</td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Fecha de Inicio</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{formatDate(actividad.startDate)}</td>
        </tr>
        <tr>
            <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Fecha Final</td>
            <td className="border-2 border-black px-4 py-2 bg-white">{formatDate(actividad.endDate)}</td>
        </tr>
    </tbody>
))}

                        </table>

                    </div>

                    <div className="w-1/3 bg-blue-900 p-6 rounded-l-lg flex flex-col items-center justify-center">
                        <div className="mb-4">
                            <a
                                href=""
                                className="block text-center bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                            >
                                Aprobar
                            </a>
                        </div>
                        <div className="mb-4">
                            <a
                                href=""
                                className="block text-center bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                            >
                                Rechazar
                            </a>
                        </div>
                        <div className="mb-4">
                            <textarea
                                id="observations"
                                placeholder="Escribe tus observaciones aquí..."
                                maxLength={500}
                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                                rows={5}
                            />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default PaginaGestionSolicitudesVOAE;

