// src/components/CalendarPage.tsx
import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiseñCalendario.css';
import { NavLink } from 'react-router-dom';

interface Actividad {
  fecha: Date;
  titulo: string;
  hora: string;
  id: number;
}

const actividades: Actividad[] = [
  { fecha: new Date(2024, 6, 7), titulo: 'Reunión de proyecto', hora: '10:00 AM', id: 1 },
  { fecha: new Date(2024, 6, 7), titulo: 'Taller de capacitación', hora: '2:00 PM', id: 2 },
  { fecha: new Date(2024, 6, 15), titulo: 'Entrega de informe', hora: '11:00 AM', id: 3 },
  { fecha: new Date(2024, 6, 20), titulo: 'Presentación', hora: '3:00 PM', id: 4 },
];

const Calendario: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<Actividad[]>([]);

  useEffect(() => {
    // titulo de la pestaña del navegador
    document.title = "Calendario - UNAH COPAN";
}, []);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    const selectedDate = value as Date;
    setDate(selectedDate);
    const dayActivities = actividades.filter(actividad =>
      actividad.fecha.toDateString() === selectedDate.toDateString()
    );
    setSelectedActivities(dayActivities);
  };

  const tileContent: CalendarProps['tileContent'] = ({ date }) => {
    const dayActivities = actividades.some(actividad =>
      actividad.fecha.toDateString() === date.toDateString()
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
          <h2 className="text-lg font-bold mb-2">Actividades para {date.toDateString()}</h2>
          <ul>
            {selectedActivities.map(activity => (
              <li key={activity.id} className="mb-2">
                <div className="block md:flex justify-between items-center border-4 border-yellow-500 p-2">
                  <div>
                    <p className="font-medium">{activity.titulo}</p>
                    <p className="text-sm text-gray-600">{activity.hora}</p>
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
