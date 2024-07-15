import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const [user] = useState({
        nombre: 'Juan Perez',
        correo: 'jperez@unah.hn',
        foto: 'https://via.placeholder.com/150', 
        NºCuenta: '20212100459',
        telefono: '87456321',
        fechaNacimiento: '24-05-2000',
        carrera: 'Ingeniería en Sistemas',
    });

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/editar-perfil');
    };

    const handleEditPassword = () => {
        navigate('/cambiar-contrasena');
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
            <div className="flex items-center space-x-6">
                <img src={user.foto} alt="Foto de perfil" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.nombre}</h1>
                    <p className="text-gray-500">{user.correo}</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                    <p className="mt-4"><strong>Nº Cuenta:</strong> {user.NºCuenta}</p>
                    <p className="mt-2"><strong>Teléfono:</strong> {user.telefono}</p>
                    <p className="mt-2"><strong>Fecha de Nacimiento:</strong> {user.fechaNacimiento}</p>
                    <p className="mt-2"><strong>Carrera:</strong> {user.carrera}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Configuraciones de Cuenta</h2>
                    <button onClick={handleEditProfile} className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md">Editar Perfil</button>
                    <button onClick={handleEditPassword} className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md">Cambiar Contraseña</button>
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700"></h2>
            </div>
        </div>
    );
};

export default Perfil;
