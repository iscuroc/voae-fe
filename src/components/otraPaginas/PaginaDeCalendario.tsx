import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiseñCalendario.css';
import { NavLink } from 'react-router-dom';
import { format, parseISO, isSameDay } from 'date-fns';
import { ActividadEstado, ObtenerActividadesPorEstado } from '../../api/servicios/actividades';
import { FiLoader } from 'react-icons/fi';

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd'); // Formatear solo la fecha

const Calendario: React.FC = () => {
  useEffect(() => {
    document.title = "Calendario - UNAH COPAN";
  }, []);

  const [date, setDate] = useState<Date | null>(null);
  const [showPanel, setShowPanel] = useState<boolean>(false); 
  const [actividades, setActividades] = useState<ActividadEstado[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<ActividadEstado[]>([]); // Agregado para almacenar las actividades del día seleccionado
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [, setError] = useState<string | null>(null); 

  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true); // Iniciar carga
      try {
        const data = await ObtenerActividadesPorEstado(0); 
        setActividades(data);
      } catch (error) {
        setError('Failed to fetch activities');
      } finally {
        setLoading(false); // Finalizar carga
      }
    };
    obtenerDatos();
  }, []);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    const selectedDate = value as Date;
    setDate(selectedDate);
    const dayActivities = actividades.filter(actividad =>
      isSameDay(parseISO(actividad.startDate), selectedDate) // Ajustar según el formato de fecha recibido
    );
    setSelectedActivities(dayActivities);
    setShowPanel(dayActivities.length > 0); // Mostrar el panel si hay actividades
  };

  const tileContent: CalendarProps['tileContent'] = ({ date }) => {
    const dayActivities = actividades.some(actividad =>
      isSameDay(parseISO(actividad.startDate), date) // Ajustar según el formato de fecha recibido
    );

    return dayActivities ? <span className="dot"></span> : null;
  };

  const handleClosePanel = () => {
    setShowPanel(false);
  };

  return (
    <div className="flex justify-center items-center h-full  relative">
      {loading ? (
        <div className=" inset-0 flex items-center justify-center  z-50">
        <FiLoader className="w-16 mt-60 h-16 border-4 border-t-4 border-solid rounded-full  border-t-transparent animate-spin" />
      </div>
      ) : (
        <>
          <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg w-full relative z-10">
            <Calendar
              onChange={handleDateChange}
              tileContent={tileContent}
              className="react-calendar"
            />
          </div>
          {showPanel && (
            <div className="activity-panel absolute top-0 left-0 right-0 mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg w-20 md:w-96 z-20">
              <button
                className="absolute top-1 right-2 text-gray-500 font-bold underline hover:text-gray-700"
                onClick={handleClosePanel}
              >
                Cerrar
              </button>
              <h2 className="text-sm md:text-lg font-bold mb-2">Actividades para el {formatDate(date!)}</h2>
              <ul>
                {selectedActivities.map(activity => (
                  <li key={activity.id} className="mb-2">
                    <div className="block md:flex justify-between items-center border-4 border-yellow-500 p-2">
                      <div>
                        <p className="font-medium">{activity.name}</p> {/* Usar name en lugar de titulo */}
                        <p className="text-sm text-gray-600">{format(parseISO(activity.startDate), 'hh:mm a')}</p> {/* Usar startDate */}
                      </div>
                      <NavLink
                        to={
                          location.pathname.includes('dashboard-coordinador')
                            ? "/dashboard-coordinador/detalles-actividad"
                            : location.pathname.includes('dashboard-estudiante')
                              ? "/dashboard-estudiante/unirse-actividad"
                              : "/dashboard-voae/detalles-actividades"
                        }
                        className="px-4 py-2 text-sm text-blue-500 hover:underline flex items-center"
                      >
                        Ver detalles
                      </NavLink>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Calendario;
