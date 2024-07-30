import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Perfil = () => {
    useEffect(() => {
        document.title = "Perfil - UNAH COPAN";
      }, []);

      interface User {
        nombre: string;
        correo: string;
        NºCuenta: string;
        carrera: string;
        ultima: string;
      }
      
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
      
        const [user] = useState<User>({
          nombre: 'Juan Perez',
          correo: 'jperez@unah.hn',
          NºCuenta: '20212100459',
          carrera: 'Ingeniería en Sistemas',
          ultima: ultimaSesion,
        });

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
            <div className="flex items-center space-x-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.nombre}</h1>
                    <p className="text-gray-500">{user.correo}</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                    <p className="mt-4"><strong>Nº Cuenta:</strong> {user.NºCuenta}</p>
                    <p className="mt-2"><strong>Carrera:</strong> {user.carrera}</p>
                    <p className="mt-2"><strong>Ultima vez conectado:</strong> {user.ultima}</p>
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
