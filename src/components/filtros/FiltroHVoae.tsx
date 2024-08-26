import React, { useEffect, useState } from "react";
import { Carrera, obtenerTodasLasCarreras } from "../../api/servicios/carreras";

interface FiltroProps {
    aplicarFiltros: (carrera: string, nombre: string) => void;
}

const FiltroHVoae: React.FC<FiltroProps> = ({ aplicarFiltros }) => {
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [carrera, setCarrera] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [showResetButton, setShowResetButton] = useState<boolean>(false);

    // Cargar las carreras desde la API
    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const resultado = await obtenerTodasLasCarreras();
                setCarreras(resultado);
            } catch (error) {
                console.error('Error al cargar las carreras:', error);
            }
        };

        fetchCarreras();
    }, []);

    const handleCarreraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCarrera(event.target.value);
    };

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };




    const handleFiltrarClick = () => {
        aplicarFiltros(carrera, nombre);
        setShowResetButton(true);
    };

    const resetFilters = () => {
        setCarrera("");
        setNombre("");
        aplicarFiltros("", "");
        setShowResetButton(false);
    };

    const areFiltersApplied = carrera || nombre;

    return (
        <>

            <div className="w-full md:w-3/5 flex gap-4">
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Carrera</label>
                    <select
                        className="flex h-10 w-full  items-center rounded-xl border border-black border-input px-3 py-2 text-sm"
                        value={carrera}
                        onChange={handleCarreraChange}
                    >
                        <option value="">Seleccione Carrera...</option>
                        {carreras.map(carrera => (
                            <option key={carrera.id} value={carrera.name}>
                                {carrera.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Numero de cuenta</label>
                    <input
                        className="h-10 px-3 py-2 text-sm rounded-xl border border-input border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={nombre}
                        onChange={handleNombreChange}
                        placeholder="Ingrese el numero de cuenta"
                        type="text"
                    />
                </div>
                <div className="w-full md:w-auto flex items-end">
                    <button
                        className="h-10 px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-2"
                        onClick={handleFiltrarClick}
                    >
                        Filtrar
                    </button>
                    {showResetButton && (
                        <button
                            className={`h-10 px-6 py-2 text-sm font-medium text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${areFiltersApplied ? "bg-red-500 hover:bg-red-400 focus:ring-red-500" : "bg-gray-400 cursor-not-allowed"}`}
                            onClick={resetFilters}
                            disabled={!areFiltersApplied}
                        >
                            Resetear
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default FiltroHVoae;
