import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {   ActividadNombre, ObtenerActividadesPorNombre } from '../../api/servicios/actividades';
import {  EtiquetasÁmbitosActividad, formatDate } from '../../api/servicios/enums';

const PaginaGestionSolicitudesVOAE: React.FC = () => {
    useEffect(() => {
        document.title = "Coordinadores - UNAH CUROC"
    }, []);

    const [activity, setActivity] = useState<ActividadNombre | null>(null); // Handle a single object
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const { slug } = useParams<{ slug?: string }>();

    useEffect(() => {
        const obtenerDatos = async () => {
            setLoading(true);
            try {
                if (slug) {
                    const data = await ObtenerActividadesPorNombre(slug);
                    console.log('Datos obtenidos:', data); // Verify data structure
                    
                    if (data && typeof data === 'object' && !Array.isArray(data)) {
                        setActivity(data); // Set single activity object
                    } else {
                        setError('Data is not an object');
                    }
                } else {
                    setError('No name parameter provided');
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
                setError('Failed to fetch activities');
            } finally {
                setLoading(false);
            }
        };
        obtenerDatos();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!activity) {
        return <div>No activity data found</div>;
    }

   return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl">
                <h1 className="text-center text-2xl font-bold mb-4">Revisión de Solicitud</h1>
                <div className="bg-blue-900 shadow-lg rounded-lg flex overflow-hidden mb-4">
                    <div className="w-2/3 p-6">
                        <h5 className="text-center text-2xl font-bold mb-4 text-white">Datos de la solicitud</h5>
                        <table className="table-auto border-collapse border border-gray-400">
                            <tbody>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Nombre</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{activity.name}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Objetivos</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">
                                        <ul className="list-disc pl-5">
                                            {activity.goals.map((goal, index) => (
                                                <li key={index}>{goal}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Actividades Principales</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">
                                        <ul className="list-disc pl-5">
                                            {activity.mainActivities.map((activity, index) => (
                                                <li key={index}>{activity}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Descripción</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{activity.description}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Coordinador de actividad</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{activity.coordinator.names} {activity.coordinator.lastnames}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Supervisor</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{activity.supervisor.names} {activity.supervisor.lastnames}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Ubicacion</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{activity.location}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Ámbito</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">
                                        <ul className="list-disc pl-5">
                                            {activity.scopes.map((scope, index) => (
                                                <li key={index}>
                                                    {EtiquetasÁmbitosActividad[scope.scope] || scope.scope} | {scope.hours} horas
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Carreras admitidas</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">
                                        <ul className="list-disc pl-5">
                                            {activity.foreingCareers.map((career, index) => (
                                                <li key={index}>{career.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Cupos</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{activity.totalSpots}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Fecha de Inicio</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{formatDate(activity.startDate)}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Fecha Final</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{formatDate(activity.endDate)}</td>
                                </tr>
                            </tbody>
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
                                className="block text-center bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
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
