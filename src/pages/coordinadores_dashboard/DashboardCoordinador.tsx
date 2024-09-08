import React, { useEffect } from "react";
import { FiPlusCircle, FiClock, FiEdit, FiLayers } from "react-icons/fi";
import DashboardButton from "../../components/DashboardButton";
import { coordinadorRoutes, CoordinadorRouteKeys } from "../../api/routesConfig";

const DashboardCoordinador: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard - UNAH COPAN";
  }, []);

  const getIconByTitle = (title: CoordinadorRouteKeys) => {
    switch (title) {
      case "Crear Actividad":
        return <FiPlusCircle size={32} />;
      case "Actividades Disponibles":
        return <FiClock size={32} />;
      case "Gestion de Actividades":
        return <FiEdit size={32} />;
      // case "Horas por Estudiante":
      //   return <FiUsers size={32} />;
        case "Actividades Solicitadas":
        return <FiLayers size={32} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Profesores</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(coordinadorRoutes).map((title) => (
            <DashboardButton
              key={title}
              title={title as CoordinadorRouteKeys}
              icon={getIconByTitle(title as CoordinadorRouteKeys)}
              route={coordinadorRoutes[title as CoordinadorRouteKeys]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCoordinador;
