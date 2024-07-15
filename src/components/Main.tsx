import { useEffect } from "react";
import logo1 from '../assets/logo.png';
import logo2 from '../assets/logo2.jpeg';

export default function Main() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Inicio - UNAH COPAN";
    }, []);

    return (
        <>
            <main className="flex-1">
                <section className="w-full flex justify-center items-center">
                    <img
                        src={logo1}
                        alt="Banner"
                        className="w-4/5 md:w-1/2 object-cover"
                    />
                </section>
                <div className=" gap-3 mb-20">
                    <div className="flex flex-col items-center">
                        <label className="block text-center mb-4 font-bold">Sistema de horas VOAE</label>
                        <a href="/login" className="w-4/5 md:w-2/5 h-full">
                            <img
                                src={logo2}
                                alt="Banner"
                                className="w-full h-full border-4 border-yellow-400 zoom transition-transform duration-300"
                            />
                        </a>
                    </div>
                </div>
                <div className="text-base md:text-4xl font-bold text-center">
                    <h1 className="mt-5 mb-5">NOVEDADES</h1>
                    ..................
                </div>
            </main>
        </>
    )
}