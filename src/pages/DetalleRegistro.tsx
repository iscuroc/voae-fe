import React, { useEffect } from 'react';
import logo1 from '../assets/logo.png';
import logo2 from '../assets/logo2.jpeg';
import Header from '../components/Header';

const DetallesRegistro: React.FC = () => {
    useEffect(() => {
        document.title = "Registro - UNAH COPAN";
    }, []);

    return (
        <>
            <Header />
            <div className="ml-5 mr-5 h-full  md:mt-5 bg-white overflow-hidden flex items-center justify-center">
                <div className="flex flex-col md:flex-row w-full h-full items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                    {/* Imágenes */}
                    <div className="flex items-center justify-center">
                        <img src={logo1} alt="Logo 1" className="w-48 h-32 mr-7 md:mr-0 mt-5 md:mt-0 md:w-80 md:h-52" />
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                        <img src={logo2} alt="Logo 2" className="w-48 h-32 md:w-80 md:h-52" />
                    </div>
                    {/* Formulario de Login */}
                    <div className="bg-yellow-500 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 shadow-2xl rounded-lg p-4 sm:p-4">
                        <form className="grid grid-cols-2 gap-2 p-1">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="firstName" className="text-sm font-medium">Nombre</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="lastName" className="text-sm font-medium">Apellidos</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Apellidos"
                                />
                            </div>
                            <div className="flex flex-col col-span-2 mb-4">
                                <label htmlFor="email" className="text-sm font-medium">Correo Institucional</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Correo Institucional"
                                />
                            </div>
                            <div className="flex flex-col col-span-2 mb-4">
                                <label htmlFor="username" className="text-sm font-medium">Número de cuenta</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Número de cuenta"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Confirmar Contraseña"
                                />
                            </div>
                            <div className="col-span-2">
                                <button className="bg-gradient-to-b from-blue-800 to-blue-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-md shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Regístrate
                                </button>
                            </div>
                        </form>
                        {/* <div className="flex flex-col items-center space-y-2 mt-4">
                            <a href="/login" className="text-sm text-blue-900 hover:underline">¿Ya tienes una cuenta? Iniciar Sesión</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetallesRegistro;
