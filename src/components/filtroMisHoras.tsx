import React, { useState } from "react";

interface FiltroProps {
    aplicarFiltros: (fechaInicio: string, fechaFin: string, busqueda: string) => void;
}

const FiltroMH: React.FC<FiltroProps> = ({ aplicarFiltros }) => {
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");
    const [busqueda, setBusqueda] = useState<string>("");

    const handleFechaInicioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setFechaInicio(inputValue);
    };

    const handleFechaFinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setFechaFin(inputValue);
    };

    const handleBusquedaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(event.target.value);
    };

    const handleFiltrarClick = () => {
        aplicarFiltros(fechaInicio, fechaFin, busqueda);
    };

    return (
        <>
        
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <img
                src="https://voae.unah.edu.hn/assets/VOAE/paginas/home/_resampled/ResizedImageWzM3OSwxOTJd/Logo-oficial-VOAE.jpg"
                alt="VOAE Logo"
                className="w-48 h-28 md:mx-0 mx-auto md:mr-4"
            />
            <div className="md:col-span-1">
                    
                    
                    <label className="block text-sm font-bold "> Juan Perez lopez </label>
                    <label className="block text-sm font-bold "> 20242100777 </label>
                    <label className="block text-sm font-bold "> Ingenieria en Sistemas </label>
                      
                    </div>
                <div className="flex-1">
                    
                    <label className="block text-sm font-medium">Buscar</label>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="32"
                            height="32"
                            className="mr-2 text-gray-400"
                            fill="none"
                        >
                            <path
                                d="M17.5 17.5L22 22"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <input
                            className="flex h-10 w-full rounded-xl border border-black border-input bg-background px-3 py-2 text-sm"
                            placeholder="Nombre de actividad"
                            type="search"
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium">Fecha</label>
                    <div className="flex space-x-2">
                        <input
                            className="h-10 px-3 py-2 text-sm rounded-xl border border-input border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={fechaInicio}
                            onChange={handleFechaInicioChange}
                            placeholder="DD-MM-AAAA"
                            type="datetime-local"
                        />
                        <input
                            className="h-10 px-3 py-2 text-sm rounded-xl border border-input border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={fechaFin}
                            onChange={handleFechaFinChange}
                            placeholder="DD-MM-AAAA"
                            type="datetime-local"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col items-start md:items-center">
                    <button
                        className="h-10 px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={handleFiltrarClick}
                    >
                        Filtrar
                    </button>
                </div>
            </div>
        </>
    );
};

export default FiltroMH;
