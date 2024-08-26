import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { useParams } from 'react-router-dom';

interface Participant {
  nombre: string;
  numerocuenta: string;
  carrera: string;
}

const ListaDeComparacion: React.FC = () => {
  useEffect(() => {
    document.title = "Detalle de Actividad - UNAH COPAN";
  }, []);
  const { slug } = useParams<{ slug?: string }>();

  // Usamos el estado para manejar la lista de inscriptos y permitir eliminarlos temporalmente
  const [inscriptos, setInscriptos] = useState<Participant[]>([
    { nombre: "Alejandro Martínez", numerocuenta: "20182100278", carrera: "Ingeniería Civil" },
    { nombre: "Carlos García", numerocuenta: "20182100004", carrera: "Derecho" },
    { nombre: "Elena Ruiz", numerocuenta: "20161001645", carrera: "Psicología" },
    { nombre: "Lucía Fernández", numerocuenta: "20192100095", carrera: "Arquitectura" },
    { nombre: "María López", numerocuenta: "20161001463", carrera: "Medicina" },
    { nombre: "Miguel Pérez", numerocuenta: "20161001663", carrera: "Economía" },
    { nombre: "Sofía Rodríguez", numerocuenta: "20161001633", carrera: "Ingeniería Química" },
  ]);
  
  const participants2: Participant[] = [
    { nombre: "Alejandro Martínez", numerocuenta: "20182100278", carrera: "Ingeniería Civil" },
    { nombre: "Carlos García", numerocuenta: "20182100004", carrera: "Derecho" },
    { nombre: "Lucía Fernández", numerocuenta: "20192100095", carrera: "Arquitectura" },
    { nombre: "Miguel Pérez", numerocuenta: "20161001663", carrera: "Economía" },
  ];

  // Estado para controlar el modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [participantToDelete, setParticipantToDelete] = useState<string | null>(null);

  // Función para verificar si un participante está en la lista de participants2
  const isInParticipants2 = (participant: Participant): boolean => {
    return participants2.some(p => p.numerocuenta === participant.numerocuenta);
  };

  // Función para mostrar el modal de confirmación
  const openModal = (numerocuenta: string) => {
    setParticipantToDelete(numerocuenta);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setParticipantToDelete(null);
  };

  // Función para eliminar un participante de la lista temporalmente
  const handleRemoveParticipant = () => {
    if (participantToDelete) {
      setInscriptos(inscriptos.filter(participant => participant.numerocuenta !== participantToDelete));
      closeModal();
    }
  };
 
  return (
    <>
      <div className="my-1"></div>
        <h1 className='block text-center text-3xl  font-semibold '>Comparacion de listas: {slug}</h1>
      <div className="h-full mx-3 md:mx-6  overflow-hidden flex flex-col md:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-4">
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
                      <td className="border px-4 py-2">{participant.numerocuenta}</td>
                      <td className="border px-4 py-2">{participant.carrera}</td>
                      <td className="border px-4 py-2">
                        {!isInParticipants2(participant) && (
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            aria-label='borrar elemento'
                            onClick={() => openModal(participant.numerocuenta)}
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
                      <td className="border px-4 py-2">{participant.numerocuenta}</td>
                      <td className="border px-4 py-2">{participant.carrera}</td>
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
