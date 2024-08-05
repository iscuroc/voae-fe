import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CambiarContrasena: React.FC = () => {
    useEffect(() => {
        document.title = "Cambiar Contraseña - UNAH COPAN";
      }, []);
      
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cambiar Contraseña</h2>
            <form>
                <div>
                    <label className="block text-gray-700">Contraseña Actual</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-lg"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700">Nueva Contraseña</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-lg"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={passwords.confirmNewPassword}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-lg"
                    />
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                    >
                        Cambiar Contraseña
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors shadow-md"
                    >
                        Regresar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CambiarContrasena;
