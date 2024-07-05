import React, { useEffect, useState } from 'react';


const initialParticipants = [
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
    { cuenta: '20182100006', tipoHora: 'VOAE' , cantidad: '2'},
    { cuenta: '20182100007', tipoHora: 'Beca' , cantidad: '4'},
];

const CParticipantesActividad: React.FC = () => {
  const [participants] = useState(initialParticipants);

  useEffect(() => {
    document.title = "Participantes de la Actividad - UNAH CUROC";
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="px-4 lg:px-6 py-6"></div>
      <div className="bg-gray-100 h-screen overflow-hidden flex items-center justify-center space-x-8">
        <div className="bg-blue-900 lg:w-7/12 md:w-6/12 w-10/12 shadow-xl relative rounded-lg">
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Participantes de la Actividad</h2>
            <div className="flex flex-col lg:flex-row">
              <div className="overflow-y-auto max-h-96 rounded-lg border border-gray-200 bg-white shadow-md flex-grow" style={{ scrollbarWidth: 'thin' }}>
                <table className="w-full text-left border-collapse bg-white rounded-lg" style={{ overflowX: 'auto' }}>
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 bg-yellow-500">Número de Cuenta</th>
                      <th className="border px-4 py-2 bg-yellow-500">Tipo de Hora</th>
                      <th className="border px-4 py-2 bg-yellow-500">Cantidad Horas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{participant.cuenta}</td>
                        <td className="border px-4 py-2">{participant.tipoHora}</td>
                        <td className="border px-4 py-2">{participant.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col justify-between ml-4 mt-4 lg:mt-0">
                <button
                  onClick={handleGoBack}
                  className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none mb-4"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CParticipantesActividad;
