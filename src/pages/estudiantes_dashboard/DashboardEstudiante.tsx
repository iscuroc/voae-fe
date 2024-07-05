import React, { useEffect } from "react";
import { FiBell, FiClock, FiLayers, FiFileText, FiAward, FiClipboard, FiPlusCircle } from "react-icons/fi";
import DashboardButton from "../../components/DashboardButton";
import { estudianteRoutes, EstudianteRouteKeys } from "../../api/routesConfig";

const DashboardEstudiante: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const getIconByTitle = (title: EstudianteRouteKeys) => {
    switch (title) {
      case "Mis Actividades":
        return <FiBell size={32} />;
      case "Actividades en Curso":
        return <FiClock size={32} />;
      case "Actividades Finalizadas":
        return <FiClock size={32} />;
      case "Actividades Solicitadas":
        return <FiLayers size={32} />;
      case "Crear Actividad":
        return <FiPlusCircle size={32} />;
      case "Novedades":
        return <FiFileText size={32} />;
      case "Mis Horas VOAE":
        return <FiAward size={32} />;
      case "Mis Certificados":
        return <FiClipboard size={32} />;
      default:
        return null;
    }
  };

  return (
    <div className=" h-full flex">
      <div className="flex-1 p-2 ml-5 mr-5">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Estudiantes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(estudianteRoutes).map((title) => (
            <DashboardButton
              key={title}
              title={title as EstudianteRouteKeys}
              icon={getIconByTitle(title as EstudianteRouteKeys)}
              route={estudianteRoutes[title as EstudianteRouteKeys]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardEstudiante;
