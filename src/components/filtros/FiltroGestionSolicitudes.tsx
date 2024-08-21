import React, { useEffect, useState } from "react";
import { Carrera, obtenerTodasLasCarreras } from "../../api/servicios/carreras";

interface FiltroProps {
    aplicarFiltros: (carrera: string, ambito: string, fechaInicio: string, fechaFin: string, estado: string) => void;
}

const FiltroGS: React.FC<FiltroProps> = ({ aplicarFiltros }) => {
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [carrera, setCarrera] = useState<string>("");
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");
    const [ambito, setAmbito] = useState<string>("");
    const [estadoSolicitud, setEstadoSolicitud] = useState<string>("");
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

    const handleFechaInicioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setFechaInicio(inputValue);
    };

    const handleFechaFinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setFechaFin(inputValue);
    };

    const handleAmbitoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAmbito(event.target.value);
    };

    const handleEstadoSolicitudChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEstadoSolicitud(event.target.value);
    };

    const handleFiltrarClick = () => {
        aplicarFiltros(carrera, ambito, fechaInicio, fechaFin, estadoSolicitud);
        setShowResetButton(true);
    };

    const resetFilters = () => {
        setCarrera("");
        setFechaInicio("");
        setFechaFin("");
        setAmbito("");
        setEstadoSolicitud("");
        aplicarFiltros("", "", "", "", "");
        setShowResetButton(false);
        window.location.reload();

    };

    const areFiltersApplied = carrera || fechaInicio || fechaFin || ambito || estadoSolicitud;

    return (
        <>
            <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Carrera</label>
                    <select
                        className="flex h-10 w-full md:w-5/6 items-center rounded-xl border border-black border-input px-3 py-2 text-sm"
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
                    <label className="block text-sm font-medium">Fecha</label>
                    <div className="block md:flex md:space-x-2">
                        <input
                            className="h-10 px-3 py-2 w-full text-sm rounded-xl border border-input border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={fechaInicio}
                            onChange={handleFechaInicioChange}
                            placeholder="DD-MM-AAAA"
                            type="date"
                        />
                        <div className="text-center justify-center mt-1 hidden md:flex">-</div>

                        <input
                            className="h-10 px-3 py-2 w-full mt-4 md:mt-0 text-sm rounded-xl border border-input border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={fechaFin}
                            onChange={handleFechaFinChange}
                            placeholder="DD-MM-AAAA"
                            type="date"
                        />
                    </div>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Ámbito</label>
                    <select
                        className="flex h-10 w-full md:w-5/6 items-center rounded-xl border border-input border-black bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={ambito}
                        onChange={handleAmbitoChange}
                    >
                        <option value="">Seleccione Ámbito...</option>
                        <option value="Científico">Científico</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Social">Social</option>
                        <option value="Deportivo">Deportes</option>
                        <option value="Becas">Becas</option>
                    </select>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Estado-Solicitud</label>
                    <select
                        className="flex h-10 w-full md:w-5/6 items-center rounded-xl border border-input border-black bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={estadoSolicitud}
                        onChange={handleEstadoSolicitudChange}
                    >
                        <option value="">Seleccione Estado...</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aprobado">Aprobado</option>
                        <option value="Rechazado">Rechazado</option>
                    </select>
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

export default FiltroGS;
