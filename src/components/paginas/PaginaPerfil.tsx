
import axiosInstance from '@/api/axiosInstance';
import { User } from '@/api/servicios/carreras';
import useAuth from '@/api/useAuth';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Perfil = () => {
    useEffect(() => {
        document.title = "Perfil - UNAH COPAN";
    }, []);

    const [user, setUser] = useState<User | null>(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);

    const { email } = useAuth(); 

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axiosInstance.get('/users/me');
                if (response.data) {
                    setUser(response.data); 
                } else {
                    setError('No se encontraron datos de usuario');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error al cargar la información del usuario.');
            } finally {
                setLoading(false);
            }
        };
        obtenerDatos();
    }, []);

    const obtenerFechaHoraActual = (): string => {
        const fecha = new Date();
        return fecha.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };

    const ultimaSesion = localStorage.getItem('ultimaSesion') || obtenerFechaHoraActual();
    localStorage.setItem('ultimaSesion', obtenerFechaHoraActual());

    if (loading) {
        return <p>Cargando...</p>; 
    }

    if (error) {
        return <p>{error}</p>; 
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
            <div className="flex items-center space-x-6">
                <div>
                    {user ? (
                        <>
                            <h1 className="text-3xl font-bold text-gray-800">{user.names} {user.lastnames}</h1>
                            <p className="text-gray-500">{email}</p>
                        </>
                    ) : (
                        <p>No se encontró información del usuario</p>
                    )}
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                    {user && (
                        <>
                            <p className="mt-4"><span>Nº Cuenta:</span> {user.accountNumber}</p>
                            <p className="mt-2"><span>Carrera:</span> {user.career}</p>
                            <p className="mt-2"><span>Última vez conectado:</span> {ultimaSesion}</p>
                        </>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Configuraciones de Cuenta</h2>
                    <NavLink
                        to={
                            location.pathname.includes('dashboard-coordinador')
                                ? "/dashboard-coordinador/cambiar-contrasena"
                                : location.pathname.includes('dashboard-estudiante')
                                    ? "/dashboard-estudiante/cambiar-contrasena"
                                    : "/dashboard-voae/cambiar-contrasena"
                        }
                        className="block mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md text-center"
                    >
                        Cambiar Contraseña
                    </NavLink>
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700"></h2>
            </div>
        </div>
    );
};

export default Perfil;
