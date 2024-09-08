import { Carrera, obtenerTodasLasCarreras } from '@/api/servicios/carreras';
import logo1 from '@/assets/logo.avif';
import logo2 from '@/assets/logo2.avif';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Alert from '../Alert';

const ListaDeParticipante: React.FC = () => {
    const { slug } = useParams<{ slug?: string }>();
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [nombre, setNombre] = useState('');
    const [numeroCuenta, setNumeroCuenta] = useState('');
    const [carreraId, setCarreraId] = useState<number | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const obtenerCarreras = async () => {
            try {
                const response = await obtenerTodasLasCarreras();
                setCarreras(response);
            } catch (error) {
                console.error('Error fetching careers:', error);
            }
        };

        obtenerCarreras();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('https://lista-participacion.vercel.app/api/v1/lista-participacion', {
                nombre,
                slug_actividad: slug,
                numero_cuenta: numeroCuenta,
                carrera_id: carreraId
            });
            Alert({
                title: 'Éxito',
                text: 'Actividad aprobada con éxito',
                icon: 'success',
                callback: () => window.location.reload(),
            });
            // Limpiar el formulario después de enviar
            setNombre('');
            setNumeroCuenta('');
            setCarreraId(undefined);
        } catch (error) {
            console.error('Error creating participation:', error);
            setError('Error al crear la participación');
        }
    };

    return (
        <div className="ml-5 mr-5 h-full mb-10 md:mt-24 md:mb-24 bg-white overflow-hidden flex items-center justify-center">
            <div className="flex flex-col md:flex-row w-full h-full items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Imágenes */}
                <div className="flex items-center justify-center">
                    <img src={logo1} alt="Logo 1" className="w-48 h-32 mr-7 md:mr-0 mt-5 md:mt-0 md:w-80 md:h-52" />
                </div>
                <div className="hidden md:flex items-center justify-center">
                    <img src={logo2} alt="Logo 2" className="w-48 h-32 md:w-80 md:h-52" />
                </div>
                {/* Formulario de Registro */}
                <div className="bg-yellow-500 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 shadow-2xl rounded-lg p-4 sm:p-4">
                    <form className="flex flex-col space-y-4 p-1" onSubmit={handleSubmit}>
                        <h2 className=" font-medium text-center">Formulario de participación</h2>
                        <h2 className=" font-medium text-center">{slug}</h2>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="names" className="text-sm font-medium">Nombre</label>
                            <input
                                type="text"
                                id="names"
                                value={nombre}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                                className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="Nombre"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="accountNumber" className="text-sm font-medium">Número de cuenta</label>
                            <input
                                type="text"
                                id="accountNumber"
                                value={numeroCuenta}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNumeroCuenta(e.target.value)}
                                className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="Número de cuenta"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="careerId" className="text-sm font-medium">Carrera</label>
                            <select
                                id="careerId"
                                value={carreraId}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCarreraId(Number(e.target.value))}
                                className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                required
                            >
                                <option value="">Selecciona una carrera</option>
                                {carreras.map(carrera => (
                                    <option key={carrera.id} value={carrera.id}>
                                        {carrera.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-b from-blue-800 to-blue-900 text-white p-2 rounded-md shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ListaDeParticipante;
