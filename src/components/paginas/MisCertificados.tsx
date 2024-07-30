import React, { useState } from 'react';

const MisCertificados = () => {
  const [nombre, setNombre] = useState('');
 
  const [inicio, setInicio] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    console.log('Solicitud enviada:', { 
      nombre,inicio, fechaFinalizacion, 
     
    });
    // Limpiar los campos después del envío
    setNombre('');

    setInicio('');
    setFechaFinalizacion('');
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl">

        <h1 className="text-center text-2xl font-bold mb-4">Mis Certificados VOAE</h1>

        <div className="bg-yellow-500 shadow-lg rounded-lg flex overflow-hidden mb-4">
          <div className="w-1/3 bg-blue-900 p-6 rounded-l-lg flex flex-col items-center">
            <label className="block text-white text-sm font-bold mb-[2.5rem]" htmlFor="nombre">
              Nombre de la actividad:
            </label>
              
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="inicio">
              Inicio:
            </label>
            <label className="block text-white text-sm font-bold mb-[2rem]" htmlFor="fechaFinalizacion">
              Fecha de Finalización:
            </label>

          </div>
          <div className="w-2/3 p-6">
            <form onSubmit={handleSubmit} className="space-y-4" id="solicitudForm">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder='Ingrese un nombre'
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              
              
             
              <div className="mb-5">
                <input
                  type="datetime-local"
                  id="inicio"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="datetime-local"
                  id="fechaFinalizacion"
                  value={fechaFinalizacion}
                  onChange={(e) => setFechaFinalizacion(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
             
             
              
              
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Ver Cerificado
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisCertificados;

