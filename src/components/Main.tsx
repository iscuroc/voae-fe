import React, { useEffect } from "react";

const Main: React.FC = () => {
  useEffect(() => {
    document.title = "Inicio - UNAH COPAN";
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col items-center w-full">
        <h1 className="mt-8 mb-5 md:text-4xl font-bold tracking-tight text-gray-900">
          Áreas del Articulo 140
        </h1>


        {/* Contenedor de las áreas en formato de cards */}
        <div className="flex flex-wrap justify-around gap-6 w-full pt-6 pb-6">

          {/* Card Académica */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-center text-gray-900">Académica</h3>
            <div className="flex justify-center mt-4">
              <img
                src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/academica.png"
                width={150}
                height={150}
                alt="Área Académica"
              />
            </div>
          </div>

          {/* Card Cultural/Artístico */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-center text-gray-900">Cultural/Artístico</h3>
            <div className="flex justify-center mt-4">
              <img
                src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/artistica.png"
                width={150}
                height={150}
                alt="Área Cultural/Artístico"
              />
            </div>
          </div>

          {/* Card Sociales */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-center text-gray-900">Sociales</h3>
            <div className="flex justify-center mt-4">
              <img
                src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/sociales.png"
                width={150}
                height={150}
                alt="Área Sociales"
              />
            </div>
          </div>

          {/* Card Deportiva */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-72">
            <h3 className="text-2xl font-bold text-center text-gray-900">Deportiva</h3>
            <div className="flex justify-center mt-4">
              <img
                src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/deportiva.png"
                width={150}
                height={150}
                alt="Área Deportiva"
              />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center ">En colaboración</h1>
        <div className="flex flex-wrap justify-center gap-4 w-full pt-6">
          <div>
            <img
              src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/logos-IS.png"
              width={200}
              height={200}
            />
          </div>
          <div>
            <img
              src="https://pub-9272dcfd138340a5ab886ccb8308ed78.r2.dev/assets/logo-VOAE.png"
              width={300}
              height={300}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
