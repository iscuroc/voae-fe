import React, { useEffect } from "react";
import { FiSettings, FiEdit, FiPlusCircle, FiUsers, FiClock } from "react-icons/fi";
import DashboardButton from "../../components/DashboardButton";
import { voaeRoutes, VoaeRouteKeys } from "../../api/routesConfig";

const DashboardAdminVoae: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard - UNAH COPAN";
  }, []);

  const getIconByTitle = (title: VoaeRouteKeys) => {
    switch (title) {
      case "Gestion de Solicitudes":
        return <FiSettings size={32} />;
      case "Actividades":
        return <FiEdit size={32} />;
        case "Actividades Disponibles":
        return <FiClock size={32} />;
      case "Crear Actividad":
        return <FiPlusCircle size={32} />;
      case "Horas por Usuario":
        return <FiUsers size={32} />;
      // case "Gestión de Usuarios":
      //   return <FiUsers size={32} />;
      default:
        return null;
    }
  };

  return (
    <div className=" h-full flex">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard VOAE</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Object.keys(voaeRoutes) as VoaeRouteKeys[]).map((title) => (
            <DashboardButton key={title} title={title} icon={getIconByTitle(title)} route={voaeRoutes[title]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminVoae;
