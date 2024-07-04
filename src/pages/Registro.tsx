import React, { useEffect } from 'react';
import logo1 from '../assets/logo.png';
import logo2 from '../assets/logo2.jpeg';
import Header from '../components/Header';

const Registro: React.FC = () => {
    useEffect(() => {
        document.title = "Registro - UNAH CUROC";
    }, []);

    return (
        <>
            <Header/>
            <div className="flex items-center justify-center h-full mt-11 md:mt-32 ">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">

                    {/* Imágenes */}
                    <div className="flex items-center justify-center">
                        <img src={logo1} alt="Logo 1" className="w-48 h-32 mr-7 md:mr-0 mt-5 md:mt-0 md:w-80 md:h-52" />
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                        <img src={logo2} alt="Logo 2" className="w-48 h-32 md:w-80 md:h-52" />
                    </div>

                    {/* Formulario de Registro */}
                    <div className="bg-yellow-500 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 shadow-2xl rounded-lg p-4 sm:p-4">
                        <form className="p-1">

                         <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15h2v2h-2v-2zm0-8h2v6h-2V9z" />
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Correo Institucional"
                                />
                            </div>
                        
                            <button className="bg-gradient-to-b from-blue-800 to-blue-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-md shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Regístrate
                            </button>
                        </form>

                        <div className="flex flex-col items-center space-y-2 mt-5">
                            <a href="/login" className="text-sm text-blue-900 hover:underline">¿Ya tienes una cuenta? Iniciar Sesión</a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Registro;
