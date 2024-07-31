import { useEffect } from "react";

export default function Main() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Inicio - UNAH COPAN";
    }, []);

    return (
        <>
            <main className="flex-1">
                
                <div className="text-base md:text-4xl font-bold text-center">
                    <h1 className="mt-5 mb-5">NOVEDADES</h1>
                    ..................
                </div>
            </main>
        </>
    )
}