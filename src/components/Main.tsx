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
                <div className="Text-5xl text-center font-bold">Inicio .......... mas informacion</div>
                <div className="Text-5xl text-center font-bold">Inicio .......... mas informacion</div>
                <div className="Text-5xl text-center font-bold">Inicio .......... mas informacion</div>
            </main>
        </>
    )
}