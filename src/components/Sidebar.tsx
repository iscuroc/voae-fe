import React from "react";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiNut } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-blue-900 text-white h-screen w-44 hidden md:flex text-sm bottom-0 fixed"> {/* Ajustar top */}
      {/* Opciones de navegación */}
      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <a className="flex items-center justify-center" href="/">
              <img src="https://res.cloudinary.com/dxc3qadsk/image/upload/v1719073675/curoc-removebg-preview_f5xnoe.png" alt="logo unah" className="w-11 h-11" />
              <span className="text-sm font-bold text-white ml-2">UNAH CUROC</span>
            </a>
          </li>
          {location.pathname.includes('dashboard-coordinador') && (
            <>
              <li>
              <NavLink
                  to="/dashboard-coordinador/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
          <NavLink
              to="/perfil"
              className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              <CiUser className="h-6 w-6 mr-2" />
              Perfil
            </NavLink>
          </li>
              <li>
                <NavLink
                  to="/dashboard-coordinador/calendario"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <FaRegCalendarAlt className="h-6 w-6 mr-2" />
                  Calendario
                </NavLink>
              </li>
            </>
          )}
          {location.pathname.includes('dashboard-estudiante') && (
            <>
              <li>
                <NavLink
                  to="/dashboard-estudiante/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/perfil"
                className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <CiUser className="h-6 w-6 mr-2" />
                  Perfil
                </NavLink>
          </li>
              <li>
                <NavLink
                  to="/dashboard-estudiante/calendario"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <FaRegCalendarAlt className="h-6 w-6 mr-2" />
                  Calendario
                </NavLink>
              </li>
              
            </>
          )}
          {location.pathname.includes('dashboard-voae') && (
            <>
              <li>
                <NavLink
                  to="/dashboard-voae/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/perfil"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <CiUser className="h-6 w-6 mr-2" />
                  Perfil
                </NavLink>
          </li>
              <li>
                <NavLink
                  to="/dashboard-voae/calendario"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <FaRegCalendarAlt className="h-6 w-6 mr-2" />
                  Calendario
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/notificaciones"
              className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              <IoNotificationsOutline className="h-6 w-6 mr-2" />
              Notificaciones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/configuracion"
              className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              <PiNut className="h-6 w-6 mr-2" />
              Configuración
            </NavLink>
          </li>
          <li>
            <button
              
              className={`flex items-center py-3 px-6 hover:bg-red-700`}
            >
              <CiLogout className="h-6 w-6 mr-2" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
