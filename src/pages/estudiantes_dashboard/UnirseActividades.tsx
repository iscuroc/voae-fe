import React, { useEffect } from 'react';

const UnirseActividad: React.FC = () => {
  useEffect(() => {
    document.title = "Detalle de Actividad - UNAH CUROC";
  }, []);

  const handleJoinActivity = () => {
    alert("Te has unido a la actividad");
    // Lógica para unirse a la actividad
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="my-2"></div>
      <div className=" h-full overflow-hidden flex items-center justify-center space-x-8">
        <div className="bg-blue-900 lg:w-4/5 md:w-6/12 w-full  mx-2 shadow-xl relative rounded-lg">
          <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Detalles de la Actividad</h2>
            <div className="flex flex-col lg:flex-row">
              <div className="overflow-y-auto max-h-96 rounded-lg border border-gray-200 bg-white shadow-md flex-grow" style={{ scrollbarWidth: 'thin' }}>
                <table className="w-full text-left border-collapse bg-white rounded-lg text-xs md:text-base" style={{ overflowX: 'auto' }}>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500 w-1/4">Nombre de la Actividad</td>
                      <td className="border px-4 py-2">Ejemplo de Actividad</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Objetivos</td>
                      <td className="border px-4 py-2">Descripción de los objetivos.</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Descripción</td>
                      <td className="border px-4 py-2">Esta es una descripción de ejemplo de la actividad.</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Carrera</td>
                      <td className="border px-4 py-2">Ingeniería</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Ámbito</td>
                      <td className="border px-4 py-2">Académico</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Coordinador</td>
                      <td className="border px-4 py-2">Dr. Juan Pérez</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Encargado</td>
                      <td className="border px-4 py-2">María García</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Horas Sociales Becados</td>
                      <td className="border px-4 py-2">20</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Horas Art. 140</td>
                      <td className="border px-4 py-2">10</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Cupos</td>
                      <td className="border px-4 py-2">30</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Cupos Disponibles</td>
                      <td className="border px-4 py-2">10</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Fecha Inicio</td>
                      <td className="border px-4 py-2">01/07/2024 4:00 pm</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Fecha Final</td>
                      <td className="border px-4 py-2">01/08/2024 6:00 pm</td>
                    </tr>
                   
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Estado</td>
                      <td className="border px-4 py-2">Activo</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 bg-yellow-500">Observaciones</td>
                      <td className="border px-4 py-2">Ninguna</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col justify-between ml-4 mt-4 lg:mt-0">
                <div className="mb-4">
                  <h2 className='text-white'>Seleccione las horas que desea</h2>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="horasVoae"
                      name="horas"
                      value="voae"
                      className="mr-2"
                    />
                    <label htmlFor="horasVoae" className="text-white">Horas VOAE</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="horasBeca"
                      name="horas"
                      value="beca"
                      className="mr-2"
                    />
                    <label htmlFor="horasBeca" className="text-white">Horas Beca</label>
                  </div>
                </div>
                <button
                  onClick={handleGoBack}
                  className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none mb-4"
                >
                  Volver
                </button>
                <button
                  onClick={handleJoinActivity}
                  className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 focus:outline-none"
                >
                  Unirse a la Actividad
                </button>
                <div className="mt-4">
                  <textarea
                    className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Ingrese sus observaciones aquí"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnirseActividad;
