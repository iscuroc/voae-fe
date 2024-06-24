import { useEffect } from "react";

export default function Main() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Inicio - UNAH CUROC";
    }, []);

    return (
        <>
            <main className="flex-1">
                <section className="w-full flex justify-center items-center">
                    <img
                        src="https://dircom.unah.edu.hn/dmsdocument/7519-unah-curoc-horz-azul-png"
                        alt="Banner"
                        className="w-1/2 object-cover"
                    />
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-20">
                    <div className="flex flex-col items-center">
                        <label className="block text-center mb-4 font-bold">Sistema de horas VOAE</label>
                        <a href="" className="w-4/5 h-full">
                            <img
                                src="https://voae.unah.edu.hn/assets/VOAE/paginas/home/_resampled/ResizedImageWzM3OSwxOTJd/Logo-oficial-VOAE.jpg"
                                alt="Banner"
                                className="w-full h-full border-4 border-yellow-400 zoom transition-transform duration-300"
                            />
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="block text-center mb-4 font-bold">Sistema de graduaciones</label>
                        <a href="" className="w-4/5 h-full">

                            <img
                                src="https://res.cloudinary.com/dxc3qadsk/image/upload/v1719173347/Sistema_de_graduacion_kde8ie.png"
                                alt="Banner"
                                className="w-full h-full border-4 border-yellow-400 zoom transition-transform duration-300"
                            />
                        </a>
                    </div>
                </div>
                <div className="text-5xl font-bold text-center">
                    <h1 className="mt-5 mb-5">NOVEDADES</h1>
                    ..................
                </div>
            </main>
        </>
    )
}