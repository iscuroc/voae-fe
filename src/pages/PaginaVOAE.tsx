import { useEffect } from "react";
import Filtro from "../components/Filtros";

export default function PaginaVOAE() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "VOAE - UNAH CUROC";
    }, []);

    return (
        <>
            <div className="container mx-auto p-4">
                {/* <a className="bg-yellow-200 hover:bg-blue-700 text-black font-bold py-1 px-2 border rounded-xl mt-12">Gestionar actividades</a> */}
                {/* <h2 className=" font-bold text-2xl">Pagina VOAE</h2> */}
                <div className="block md:flex items-center justify-center mb-4 mt-2">

                    <Filtro />
                </div>


                <div className="rounded-xl">
                    <div className="overflow-x-auto">
                        <table className=" border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
                            <thead className="block md:table-header-group">
                                <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative bg-yellow-500 text-black ">
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ubicación</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Ámbito</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Carrera</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Cupos</th>
                                    <th className=" p-2  font-bold md:border md:border-grey-500 text-left block md:table-cell">Duración</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Inicio</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Final</th>
                                    <th className=" p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Accion</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group text-base md:text-sm ">
                                
                                <tr className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>Charla
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>Biblioteca
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>Cultural
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>Ingenieria en sistemas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cupos:</span>20
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Duración:</span>2 horas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500  block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Inicio:</span>20/05/2022 4:50pm
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Final:</span>20/05/2022 7:00pm
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        <a href="" className="flex justify-center items-center font-bold group">
                                            {/* <!-- SVG visible en pantallas grandes --> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} className="group-hover:text-blue-500 hidden md:block">
                                                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            {/* <!-- Texto visible en pantallas pequeñas --> */}
                                            <span className=" bg-blue-600 rounded-md md:hidden text-white p-2 w-full group-hover:text-blue-500">VER</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>Charla
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>Biblioteca
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>Cultural
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>Ingenieria en sistemas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cupos:</span>20
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Duración:</span>2 horas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500  block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Inicio:</span>20/05/2022 4:50pm
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Final:</span>20/05/2022 7:00pm
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        <a href="" className="flex justify-center items-center font-bold group">
                                            {/* <!-- SVG visible en pantallas grandes --> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} className="group-hover:text-blue-500 hidden md:block">
                                                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            {/* <!-- Texto visible en pantallas pequeñas --> */}
                                            <span className=" bg-blue-600 rounded-md md:hidden text-white p-2 w-full group-hover:text-blue-500">VER</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>Charla
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>Biblioteca
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>Cultural
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>Ingenieria en sistemas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cupos:</span>20
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Duración:</span>2 horas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500  block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Inicio:</span>20/05/2022 4:50pm
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Final:</span>20/05/2022 7:00pm
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        <a href="" className="flex justify-center items-center font-bold group">
                                            {/* <!-- SVG visible en pantallas grandes --> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} className="group-hover:text-blue-500 hidden md:block">
                                                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            {/* <!-- Texto visible en pantallas pequeñas --> */}
                                            <span className=" bg-blue-600 rounded-md md:hidden text-white p-2 w-full group-hover:text-blue-500">VER</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>Charla
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>Biblioteca
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>Cultural
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>Ingenieria en sistemas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cupos:</span>20
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Duración:</span>2 horas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500  block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Inicio:</span>20/05/2022 4:50pm
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Final:</span>20/05/2022 7:00pm
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        <a href="" className="flex justify-center items-center font-bold group">
                                            {/* <!-- SVG visible en pantallas grandes --> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} className="group-hover:text-blue-500 hidden md:block">
                                                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            {/* <!-- Texto visible en pantallas pequeñas --> */}
                                            <span className=" bg-blue-600 rounded-md md:hidden text-white p-2 w-full group-hover:text-blue-500">VER</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-yellow-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Nombre:</span>Charla
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ubicación:</span>Biblioteca
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Ámbito:</span>Cultural
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Carrera:</span>Ingenieria en sistemas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cupos:</span>20
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Duración:</span>2 horas
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500  block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Inicio:</span>20/05/2022 4:50pm
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Final:</span>20/05/2022 7:00pm
                                    </td>
                                    <td className="p-1 md:border text-center md:border-gray-500 block md:table-cell relative">
                                        <a href="" className="flex justify-center items-center font-bold group">
                                            {/* <!-- SVG visible en pantallas grandes --> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#000000"} fill={"none"} className="group-hover:text-blue-500 hidden md:block">
                                                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            {/* <!-- Texto visible en pantallas pequeñas --> */}
                                            <span className=" bg-blue-600 rounded-md md:hidden text-white p-2 w-full group-hover:text-blue-500">VER</span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}