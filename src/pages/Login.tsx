import React, { useEffect } from 'react';
import logo1 from '../assets/logo.png';
import logo2 from '../assets/logo2.jpeg';
import Header from '../components/Header';

const Login: React.FC = () => {
    useEffect(() => {
        document.title = "Login - UNAH CUROC";
    }, []);

    return (
        <>
            <Header/>
            <div className="ml-5 mr-5 h-full md:mt-20 md:mb-11 bg-white overflow-hidden flex items-center justify-center">
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
                        <form className="p-1">
                            <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                                    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                                </svg>
                                <input
                                    type="text"
                                    id="username"
                                    className="bg-gray-200 pl-12 py-2 md:py-4 text-sm focus:outline-none w-full rounded-md shadow-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Número de cuenta"
                                />
                            </div>
                            <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                                    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <button className="bg-gradient-to-b from-blue-800 to-blue-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-md shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Login
                            </button>
                        </form>

                        <div className="flex flex-col items-center space-y-2">
                            <a href="/dashboard-estudiante/main" className="text-sm hover:underline bg-blue-500 text-white py-2 px-4 rounded">Dashboard Estudiantes</a>
                            <a href="/dashboard-voae/main" className="text-sm hover:underline bg-green-500 text-white py-2 px-4 rounded">Dashboard Coor VOAE</a>
                            <a href="/dashboard-coordinador/main" className="text-sm hover:underline bg-red-500 text-white py-2 px-4 rounded">Dashboard Coordinadores</a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
