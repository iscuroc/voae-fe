
export default function Filtro() {


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
                        id="carrera"
                    >
                        <option value="">Seleccione Carrera...</option>
                        <option value="Ingenieria">Ingeniería en Sistemas</option>
                        <option value="agro">Ingeniería Agroindustrial</option>
                        <option value="local">Desarrollo Local</option>
                        <option value="empresas">Administración de Empresas</option>
                        <option value="comercio">Comercio Internacional</option>
                    </select>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Fecha</label>
                    <div className="flex space-x-2">
                        <input
                            className="h-10 px-3 py-2 text-sm rounded-xl border border-input border-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="fecha-inicio"
                            placeholder="DD-MM-AAAA"
                            type="date"
                        />
                        <span className="flex items-center text-gray-500">-</span>
                        <input
                            className="h-10 px-3 py-2 text-sm rounded-xl border border-input border-black bg-white "
                            id="fecha-fin"
                            placeholder="DD-MM-AAAA"
                            type="date"
                        />
                    </div>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium">Ámbito</label>
                    <select
                        className="flex h-10 w-full md:w-5/6 items-center rounded-xl border border-input border-black bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="ambito"
                    >
                        <option value="">Seleccione Ámbito...</option>
                        <option value="Académico">Académico</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Social">Social</option>
                        <option value="Deportivo">Deportivo</option>
                    </select>
                </div>
                <div className="md:col-span-1">
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
                            className="flex h-10 w-full rounded-xl border border-black border-input bg-background px-3 py-2 text-sm "
                            id="buscar"
                            placeholder="Nombre de actividad"
                            type="search"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end mt-6 md:mt-24 ml-0 md:ml-5">
                <button
                    className="h-10 px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Filtrar
                </button>
            </div>
        </>
    );
}
