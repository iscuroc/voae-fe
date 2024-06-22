import { useEffect } from "react";

export default function Header() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Login - UNAH CUROC";
      }, []);
    
    return (
        <>
            <div className="px-4 lg:px-6 py-6">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                
            </div>
        </>
    )
}