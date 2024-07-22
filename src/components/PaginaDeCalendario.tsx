import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiseñCalendario.css';
import { NavLink } from 'react-router-dom';
import { format, parseISO, isSameDay } from 'date-fns';

interface Actividad {
  fecha: Date; // Fecha completa con hora
  titulo: string;
  id: number;
}

// Usar la fecha en formato ISO directamente sin ajustar el huso horario
const actividades: Actividad[] = [
  { fecha: parseISO('2024-07-12T16:14:23'), titulo: 'Reunión de proyecto', id: 1 },
  { fecha: parseISO('2024-07-12T19:14:23'), titulo: 'Taller de capacitación',  id: 2 },
  { fecha: parseISO('2024-07-15T17:14:23'), titulo: 'Entrega de informe',  id: 3 },
  { fecha: parseISO('2024-07-20T16:14:23'), titulo: 'Presentación', id: 4 },
];

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd'); // Formatear solo la fecha

const Calendario: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<Actividad[]>([]);

  useEffect(() => {
    document.title = "Calendario - UNAH COPAN";
  }, []);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    const selectedDate = value as Date;
    setDate(selectedDate);
    const dayActivities = actividades.filter(actividad =>
      isSameDay(actividad.fecha, selectedDate)
    );
    setSelectedActivities(dayActivities);
  };

  const tileContent: CalendarProps['tileContent'] = ({ date }) => {
    const dayActivities = actividades.some(actividad =>
      isSameDay(actividad.fecha, date)
    );

    return dayActivities ? <span className="dot"></span> : null;
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 relative">
      <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg  w-full relative z-10">
        <Calendar
          onChange={handleDateChange}
          tileContent={tileContent}
          className="react-calendar"
        />
      </div>
      {date && selectedActivities.length > 0 && (
        <div className="activity-panel absolute top-0 left-0 right-0 mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg w-20 md:w-96 z-20">
          <h2 className="text-lg font-bold mb-2">Actividades para {formatDate(date)}</h2>
          <ul>
            {selectedActivities.map(activity => (
              <li key={activity.id} className="mb-2">
                <div className="block md:flex justify-between items-center border-4 border-yellow-500 p-2">
                  <div>
                    <p className="font-medium">{activity.titulo}</p>
                    <p className="text-sm text-gray-600">{format(activity.fecha, 'hh:mm a')}</p>
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
    </div>
  );
};

export default Calendario;
