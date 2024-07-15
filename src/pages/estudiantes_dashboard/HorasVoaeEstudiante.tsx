import React, { useMemo, useEffect } from 'react';
import InformacionEstudiante from '../../components/InformacionEstudiante';

const HorasVoaeEstudiante: React.FC = () => {
  useEffect(() => {
    document.title = "Horas Voae - UNAH CUROC";
  }, []);

  const initialData = useMemo(() => [
    { ambito: "Social", horas: 20 },
    { ambito: "Científico", horas: 15 },
    { ambito: "Cultural", horas: 10 },
    { ambito: "Deportivo", horas: 5 },
  ], []);

  const totalHoras = useMemo(() => {
    return initialData.reduce((acc, curr) => {
      acc[curr.ambito] = (acc[curr.ambito] || 0) + curr.horas;
      return acc;
    }, {} as Record<string, number>);
  }, [initialData]);

  return (
    <div className="container mx-auto p-6">
      <InformacionEstudiante />
      <div className="block md:flex items-center justify-center mb-8 mt-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">Mis Horas Voae</h1>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-4 font-bold text-left">Ámbito</th>
                <th className="p-4 font-bold text-left">Horas</th>
                <th className="p-4 font-bold text-center">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totalHoras).map(([ambito, horas], index) => (
                <tr
                  key={ambito}
                  className={`text-left hover:bg-gray-200 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-4 border-b border-gray-200">{ambito}</td>
                  <td className="p-4 border-b border-gray-200">{horas}</td>
                  <td className="p-4 border-b border-gray-200">
                    <a
                      href="/dashboard-estudiante/mis-actividades"
                      className="block text-center bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                    Ver </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HorasVoaeEstudiante;
