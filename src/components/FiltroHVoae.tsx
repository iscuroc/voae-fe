import React, { useState } from "react";

interface FiltroProps {
    aplicarFiltros: (carrera: string, nombre: string) => void;
}

const FiltroHVoae: React.FC<FiltroProps> = ({ aplicarFiltros }) => {
    const [carrera, setCarrera] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [showResetButton, setShowResetButton] = useState<boolean>(false);

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

    const areFiltersApplied = carrera || nombre ;

    return (
        <>
            <img
                src="https://voae.unah.edu.hn/assets/VOAE/paginas/home/_resampled/ResizedImageWzM3OSwxOTJd/Logo-oficial-VOAE.jpg"
                alt="VOAE Logo"
                className="w-48 h-28 md:mx-0 mx-auto md:mr-4"
            />

            <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Carrera</label>
                    <select
                        className="flex h-10 w-full md:w-5/6 items-center rounded-xl border border-black border-input px-3 py-2 text-sm"
                        value={carrera}
                        onChange={handleCarreraChange}
                    >
                        <option value="">Seleccione Carrera...</option>
                        <option value="Ingenieria en sistemas">Ingenieria en sistemas</option>
                        <option value="Ingeniería Agroindustrial">Ingeniería Agroindustrial</option>
                        <option value="Desarrollo Local">Desarrollo Local</option>
                        <option value="Administración de Empresas">Administración de Empresas</option>
                        <option value="Comercio Internacional">Comercio Internacional</option>
                    </select>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                        className="h-10 px-3 py-2 text-sm rounded-xl border border-input border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={nombre}
                        onChange={handleNombreChange}
                        placeholder="Nombre completo"
                        type="text"
                    />
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end mt-6 md:mt-24 ml-0 md:ml-5">
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
        </>
    );
};

export default FiltroHVoae;
