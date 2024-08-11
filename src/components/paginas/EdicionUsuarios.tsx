import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import FiltroHVoae from "../filtros/FiltroHVoae";

const GestionUsuarios: React.FC = () => {
    useEffect(() => {
        document.title = "Activdades Solicitadas - UNAH COPAN";
    }, []);

    const initialData = [
        { nombre: "Jose Carlos", apellido: "Herrera Perez", numCuenta: "20201031872", carrera: "Ingeniería en Sistemas", email: "jcarloshp@unah.hn", rol: "estudiante" },
        { nombre: "Maria Carolina", apellido: "Guitierrez Moreno", numCuenta: "20201065478", carrera: "Ingeniería en Sistemas", email: "carloguim@unah.com.edu", rol: "docente" },
        { nombre: "Jose Maria", apellido: "Perez Zeras", numCuenta: "20876543872", carrera: "Administración de Empresas", email: "plpzeras@unah.hn", rol: "estudiante" },
    ];

    const [filtrarData, setFiltrarData] = useState(initialData);
    const [PaginaInicial, setPaginaInicial] = useState(1);
    const [editIndex, setEditIndex] = useState<number | null>(null); // Estado para el índice de edición
    const [editData, setEditData] = useState({
        nombre: "",
        apellido: "",
        numCuenta: "",
        carrera: "",
        email: "",
        rol: ""
    });

    const itemsPerPage = 10;
    const TotalPaginas = Math.ceil(filtrarData.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setPaginaInicial(page);
    };

    const paginatedData = filtrarData.slice((PaginaInicial - 1) * itemsPerPage, PaginaInicial * itemsPerPage);

    const aplicarFiltros = (nombre: string, carrera: string) => {
        const filtrar = initialData.filter(item => {
            return (
                (nombre === "" || item.nombre === nombre) &&
                (carrera === "" || item.carrera === carrera)
            );
        });

        setFiltrarData(filtrar);
        setPaginaInicial(1);
    };

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditData(filtrarData[index]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSaveClick = () => {
        const updatedData = [...filtrarData];
        if (editIndex !== null) {
            updatedData[editIndex] = editData;
            setFiltrarData(updatedData);
            setEditIndex(null);
        }
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
                                    {editIndex === index ? (
                                        <>
                                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={editData.nombre}
                                                    onChange={handleInputChange}
                                                    className="w-full p-1 border"
                                                />
                                            </td>
                                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                                <input
                                                    type="text"
                                                    name="apellido"
                                                    value={editData.apellido}
                                                    onChange={handleInputChange}
                                                    className="w-full p-1 border"
                                                />
                                            </td>
                                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                                <input
                                                    type="text"
                                                    name="numCuenta"
                                                    value={editData.numCuenta}
                                                    onChange={handleInputChange}
                                                    className="w-full p-1 border"
                                                />
                                            </td>
                                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                                <input
                                                    type="text"
                                                    name="carrera"
                                                    value={editData.carrera}
                                                    onChange={handleInputChange}
                                                    className="w-full p-1 border"
                                                />
                                            </td>
                                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={editData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full p-1 border"
                                                />
                                            </td>
                                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                                <input
                                                    type="text"
                                                    name="rol"
                                                    value={editData.rol}
                                                    onChange={handleInputChange}
                                                    className="w-full p-1 border"
                                                />
                                            </td>
                                            <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                                <button onClick={handleSaveClick} className="p-1 bg-blue-500 text-white">Guardar</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
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
                                                <button onClick={() => handleEditClick(index)} className="p-1 bg-yellow-500 text-black">Editar</button>
                                            </td>
                                        </>
                                    )}
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
