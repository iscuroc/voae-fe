import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';

interface Participant {
  nombre: string;
  numero_cuenta: string;
  carrera_nombre: string;
}

const ListaDeComparacion: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  const [participants2, setParticipants2] = useState<Participant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [participantToDelete, setParticipantToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inscriptos, setInscriptos] = useState<Participant[]>([
    { nombre: "Alejandro Martínez", numero_cuenta: "20182100278", carrera_nombre: "Ingeniería Civil" },
    { nombre: "Carlos García", numero_cuenta: "20182100004", carrera_nombre: "Derecho" },
    { nombre: "Elena Ruiz", numero_cuenta: "20161001645", carrera_nombre: "Psicología" },
    { nombre: "Lucía Fernández", numero_cuenta: "20192100095", carrera_nombre: "Arquitectura" },
    { nombre: "María López", numero_cuenta: "20161001463", carrera_nombre: "Medicina" },
    { nombre: "Miguel Pérez", numero_cuenta: "20161001663", carrera_nombre: "Economía" },
    { nombre: "Sofía Rodríguez", numero_cuenta: "20161001633", carrera_nombre: "Ingeniería Química" },
  ]);

  useEffect(() => {
    document.title = "Participantes - UNAH COPAN";
    
    const fetchData = async () => {
      try {
        // console.log('Fetching data for slug:', slug);
        // const response = await axios.get(`/api/v1/lista-participacion/${slug}`);
        // console.log('Inscriptos data:', response.data);

        // setInscriptos([{
        //   nombre: response.data.nombre,
        //   numero_cuenta: response.data.numero_cuenta,
        //   carrera_nombre: response.data.carrera_nombre // Asegúrate de que este campo sea correcto
        // }]);
        
        const response2 = await axios.get(`https://lista-participacion.vercel.app/api/v1/lista-participacion/${slug}`);
        console.log('Participants2 data:', response2.data);

        setParticipants2(response2.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching participation data:', err);
        setError('Error al obtener los datos de participación.Recargue la pagina');
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const openModal = (numero_cuenta: string) => {
    setParticipantToDelete(numero_cuenta);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setParticipantToDelete(null);
  };

  const handleRemoveParticipant = () => {
    if (participantToDelete) {
      setInscriptos(inscriptos.filter(participant => participant.numero_cuenta !== participantToDelete));
      closeModal();
    }
  };

  const isInParticipants2 = (participant: Participant): boolean => {
    return participants2.some(p => p.numero_cuenta === participant.numero_cuenta);
  };

  if (loading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="my-1"></div>
      <h1 className='block text-center text-3xl font-semibold '>Comparación de listas: {slug}</h1>
      <div className="h-full mx-3 md:mx-6 overflow-hidden flex flex-col md:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-4">
        <div className="bg-blue-800 w-full md:w-3/5 shadow-xl relative rounded-lg">
          <div className="p-3 md:p-6">
            <h2 className="text-sm md:text-base font-bold mb-6 text-center text-white">Lista de Inscriptos</h2>
            <div className="overflow-y-auto max-h-96 rounded-lg border border-gray-200 bg-white shadow-md" style={{ scrollbarWidth: 'thin' }}>
              <table className="w-full text-left border-collapse text-xs md:text-sm bg-white rounded-lg" style={{ overflowX: 'auto' }}>
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-yellow-500">Nombre</th>
                    <th className="border px-4 py-2 bg-yellow-500">Número de Cuenta</th>
                    <th className="border px-4 py-2 bg-yellow-500">Carrera</th>
                    <th className="border px-4 py-2 bg-yellow-500 justify-center"><CiEdit className='w-3 h-3 text-center'/></th>
                  </tr>
                </thead>
                <tbody>
                  {inscriptos.map((participant, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? 'bg-gray-100' : ''} ${
                        !isInParticipants2(participant) ? 'bg-red-200' : ''
                      }`}
                    >
                      <td className="border px-4 py-2">{participant.nombre}</td>
                      <td className="border px-4 py-2">{participant.numero_cuenta}</td>
                      <td className="border px-4 py-2">{participant.carrera_nombre}</td>
                      <td className="border px-4 py-2">
                        {!isInParticipants2(participant) && (
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            aria-label='borrar elemento'
                            onClick={() => openModal(participant.numero_cuenta)}
                          >
                            <MdDeleteForever className='w-6 h-6 '/>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-500 w-full md:w-3/5 shadow-xl relative rounded-lg">
          <div className="p-3 md:p-6">
            <h2 className="text-sm md:text-base font-bold mb-6 text-center text-gray-900">Lista de Participantes</h2>
            <div className="overflow-y-auto max-h-96 rounded-lg border border-gray-200 bg-white shadow-md" style={{ scrollbarWidth: 'thin' }}>
              <table className="w-full text-left border-collapse text-xs md:text-sm bg-white rounded-lg" style={{ overflowX: 'auto' }}>
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-blue-900 text-white">Nombre</th>
                    <th className="border px-4 py-2 bg-blue-900 text-white">Número de Cuenta</th>
                    <th className="border px-4 py-2 bg-blue-900 text-white">Carrera</th>
                  </tr>
                </thead>
                <tbody>
                  {participants2.map((participant, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="border px-4 py-2">{participant.nombre}</td>
                      <td className="border px-4 py-2">{participant.numero_cuenta}</td>
                      <td className="border px-4 py-2">{participant.carrera_nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirmar Eliminación</h3>
            <p>¿Estás seguro que deseas eliminar este participante?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleRemoveParticipant}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListaDeComparacion;
