import { useEffect } from "react";

export default function About() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Acerca de - UNAH CUROC";
      }, []);
      
    return (
        <>
            <div className="px-4 lg:px-6 py-6">
                <h1 className="text-2xl font-bold mb-4">Acerca de</h1>
                <p className="text-lg">
                    Bienvenidos a la página de Unah Curoc. Aquí encontrarás información sobre nuestra misión y visión.
                </p>
                <a href="/pvoae" className="bg-blue-500 text-2xl text center">Ir a Pagina Voae</a>
            </div>
        </>
    )
}