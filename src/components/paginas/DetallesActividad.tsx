import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActividadNombre, ObtenerActividadesPorNombre } from '../../api/servicios/actividades';
import { EtiquetasÁmbitosActividad, formatDate } from '../../api/servicios/enums';
import Loading from '../Loading';

const DetallesActividad: React.FC = () => {
  useEffect(() => {
    document.title = "Detalle de Actividad - UNAH COPAN";
  }, []);

  const [activity, setActivity] = useState<ActividadNombre | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true);
      try {
        if (slug) {
          const data = await ObtenerActividadesPorNombre(slug);

          if (data && typeof data === 'object' && !Array.isArray(data)) {
            setActivity(data); // Set single activity object
          } else {
            setError('Data is not an object');
          }
        } else {
          setError('No name parameter provided');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities');
      } finally {
        setLoading(false);
      }
    };
    obtenerDatos();
  }, [slug]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activity) {
    return <div>No activity data found</div>;
  }

  const participants = [
    { nombre: "Juan Pérez", numerocuenta: "20182100006", carrera: "Ingenieria en sistemas", observaciones: "Estaré pendiente" },
    { nombre: "María García", numerocuenta: "20182100007", carrera: "Ingenieria en sistemas", observaciones: "" },
    { nombre: "Luis Rodríguez", numerocuenta: "20182100008", carrera: "Ingenieria en sistemas", observaciones: "Estaré presente" },
    { nombre: "Mario Pineda", numerocuenta: "20182100009", carrera: "Administracion de empresas", observaciones: "Llegaré un poco tarde" },
    { nombre: "Julia Lopez", numerocuenta: "20182100010", carrera: "Administracion de empresas", observaciones: "" },
    { nombre: "Carlos Martínez", numerocuenta: "20182100011", carrera: "Administracion de empresas", observaciones: "Participaré con entusiasmo" },
    { nombre: "Ana Sánchez", numerocuenta: "20182100012", carrera: "Ingenieria en sistemas", observaciones: "" },
    { nombre: "Pedro Morales", numerocuenta: "20182100013", carrera: "Ingenieria en sistemas", observaciones: "Estaré allí" },
    { nombre: "Sofía Ramírez", numerocuenta: "20182100014", carrera: "Comercio Internacional", observaciones: "" },
    { nombre: "Diego Gómez", numerocuenta: "20182100015", carrera: "Comercio Internacional", observaciones: "Confirmo mi asistencia" },
    { nombre: "Laura Díaz", numerocuenta: "20182100016", carrera: "Ingenieria en sistemas", observaciones: "" },
    { nombre: "Javier Cruz", numerocuenta: "20182100017", carrera: "Comercio Internacional", observaciones: "Estaré disponible" },
    { nombre: "Valentina Torres", numerocuenta: "20182100018", carrera: "Comercio Internacional", observaciones: "" },
    { nombre: "Roberto Herrera", numerocuenta: "20182100019", carrera: "Administracion de empresas", observaciones: "Llego temprano" },
    { nombre: "Fernanda Medina", numerocuenta: "20182100020", carrera: "Comercio Internacional", observaciones: "" },
    { nombre: "Miguel Castro", numerocuenta: "20182100021", carrera: "Ingenieria en sistemas", observaciones: "Voy con todo" },
    { nombre: "Paula Ortega", numerocuenta: "20182100022", carrera: "Desarrrollo Local", observaciones: "" },
    { nombre: "Gabriel Guzmán", numerocuenta: "20182100023", carrera: "Desarrrollo Local", observaciones: "Estaré presente" },
    { nombre: "Daniela Vargas", numerocuenta: "20182100024", carrera: "Desarrrollo Local", observaciones: "" },
    { nombre: "Ricardo Mendoza", numerocuenta: "20182100025", carrera: "Ingenieria en sistemas", observaciones: "Voy con amigos" },

  ];

  return (
    <>
      <div className="my-3"></div>
      <div className="h-full mx-3 md:mx-6 overflow-hidden flex flex-col md:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-4">
        <div className="bg-blue-900 w-full md:w-2/3 shadow-xl relative rounded-lg ">
          <div className="p-3 md:p-6">
            <h2 className="text-base md:text-2xl font-bold mb-6 text-center text-white">Detalles de la Actividad</h2>
            <div className="overflow-y-auto max-h-96 rounded-lg border shadow-md" style={{ scrollbarWidth: 'thin' }}>
              <table className="w-full text-left text-xs md:text-sm border-collapse bg-white rounded-lg" style={{ overflowX: 'auto' }}>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500 w-1/4">Nombre de la Actividad</td>
                    <td className="border px-4 py-2">{activity.name}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Ubicaxion</td>
                    <td className="border px-4 py-2">{activity.location}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Descripción</td>
                    <td className="border px-4 py-2">{activity.description}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Ámbito</td>

                    <ul className="list-disc pl-5">
                      {activity.scopes.map((scope, index) => (
                        <li key={index}>
                          {EtiquetasÁmbitosActividad[scope.scope] || scope.scope} | {scope.hours} horas
                        </li>
                      ))}
                    </ul>

                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">supervisor</td>
                    <td className="border px-4 py-2">{activity.supervisor.names} {activity.supervisor.lastnames}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Coordinador</td>
                    <td className="border px-4 py-2">{activity.coordinator.names} {activity.coordinator.lastnames}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Objetivos</td>

                    <ul className="list-disc pl-5">
                      {activity.goals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                      ))}
                    </ul>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Acticidades Principales</td>
                    <ul className="list-disc pl-5">
                      {activity.mainActivities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </tr>

                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Carrera</td>

                    <ul className="list-disc pl-5">
                      {activity.foreingCareers.map((career, index) => (
                        <li key={index}>{career.name}</li>
                      ))}
                    </ul>

                  </tr>

                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Cupos</td>
                    <td className="border px-4 py-2">{activity.totalSpots}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Fecha Inicio</td>
                    <td className="border px-4 py-2">{formatDate(activity.startDate)}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 bg-yellow-500">Fecha Final</td>
                    <td className="border px-4 py-2">{formatDate(activity.endDate)}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500 w-full md:w-3/5 shadow-xl relative rounded-lg">
          <div className="p-3 md:p-6">
            <h2 className="text-base md:text-2xl font-bold mb-6 text-center text-gray-900">Lista de Participantes Inscriptos</h2>
            <div className="overflow-y-auto max-h-96 rounded-lg border border-gray-200 bg-white shadow-md" style={{ scrollbarWidth: 'thin' }}>
              <table className="w-full text-left border-collapse text-xs md:text-sm bg-white rounded-lg" style={{ overflowX: 'auto' }}>
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-blue-900 text-white">Nombre</th>
                    <th className="border px-4 py-2 bg-blue-900 text-white">Número de Cuenta</th>
                    <th className="border px-4 py-2 bg-blue-900 text-white">Correo institucional</th>
                    <th className="border px-4 py-2 bg-blue-900 text-white">carrera</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="border px-4 py-2">{participant.nombre}</td>
                      <td className="border px-4 py-2">{participant.numerocuenta}</td>
                      <td className="border px-4 py-2">{participant.nombre.toLowerCase().replace(" ", ".")}@unah.hn</td>
                      <td className="border px-4 py-2">{participant.carrera}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default DetallesActividad;
