import React, { useEffect } from 'react';


const PaginaGestionSolicitudesVOAE: React.FC = () => {
    useEffect(() => {
        document.title = "Coordinadores - UNAH CUROC"
    }, []);

    const initialData = {
        nombre: 'Conferencia',
        objetivos: 'Brecha existente en la ciberseguridad en Honduras',
        actividadesPrincipales: "Exposiciones",
        descripcion: "El conferencista Carlos Perez, expondrá en la biblioteca de CUROC sobre los desafios de la ciberseguridad",
        ambito: "Cientifico",
        carrera: "Ingeniería en Sistemas",
        cupos: "60",
        fechaInicio: "08/08/2024 6:00pm",
        fechaFinal: "08/08/2024 8:00pm"
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl">

                <h1 className="text-center text-2xl font-bold mb-4 ">Revisión de Solicitudes</h1>

                <div className=" bg-blue-900 shadow-lg rounded-lg flex overflow-hidden mb-4">

                    <div className="w-2/3 p-6">
                        <h5 className="text-center text-2xl font-bold mb-4 text-white">Datos de la solicitud</h5>
                        <table className="table-auto border-collapse border border-gray-400">
                            <tbody>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Nombre</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.nombre}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Objetivos</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.objetivos}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Actividades Principales</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.actividadesPrincipales}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Descripción</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.descripcion}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Ambito</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.ambito}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Carrera</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.carrera}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Cupos</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.cupos}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Fecha de Inicio</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.fechaInicio}</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black px-4 py-2 font-bold bg-yellow-500">Fecha Final</td>
                                    <td className="border-2 border-black px-4 py-2 bg-white">{initialData.fechaFinal}</td>
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

