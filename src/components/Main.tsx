import React, { useEffect } from "react";

const Main: React.FC = () => {
  useEffect(() => {
    document.title = "Inicio - UNAH COPAN";
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col items-center w-full">
        
          <h1 className="mt-8 mb-5 md:text-4xl font-extrabold tracking-tight text-gray-900">
            Áreas del Articulo 140
          </h1>
      
        <div className="flex flex-wrap justify-around gap-2 w-full pt-6">
          <div className="p-4">
            <h3 className="text-2xl font-bold text-center ">Académica</h3>
            <img 
            src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/academica.png"
            width={200}
            height={200}
            />
          </div>
          <div className="p-4">
            <h3 className="text-2xl font-bold text-center ">
              Cultural/Artistico
            </h3>
            <img 
            src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/artistica.png"
            width={200}
            height={200}
            />
          </div>
          <div className="p-4">
            <h3 className="text-2xl font-bold text-center ">Sociales</h3>
            <img 
            src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/sociales.png"
            width={200}
            height={200}
            />
          </div>
          <div className="p-4">
            <h3 className="text-2xl font-bold text-center ">Deportiva</h3>
            <img 
            src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/deportiva.png"
            width={200}
            height={200}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
