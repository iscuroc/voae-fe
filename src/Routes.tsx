import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import Main from "./components/Main";

import { AuthProvider } from "./api/AuthContext";
import CambiarContrasena from "./components/otraPaginas/CambiarContrasena";
import Calendario from "./components/otraPaginas/PaginaDeCalendario";
import SubirImagen from "./components/otraPaginas/SubirImagen";
import ActividadesSolicitadas from "./components/paginas/ActividadesSolicitadas";
import ActvidadesEnCurso from "./components/paginas/ActvidadesEnCurso";
import CrearActividad from "./components/paginas/CreateActivity/CrearActividad";
import GestionSolicitudes from "./components/paginas/GestionSolicitudes";
import HorasVOAE from "./components/paginas/HorasVoae";
import PaginaGestionActividad from "./components/paginas/PaginaGestionActividad";
import Perfil from "./components/paginas/PaginaPerfil";
import UpdateActividad from "./components/paginas/UpdateActivity/UpdateActividad";
import Layout from "./layouts/UnautorizeLayout";
import Layout_Login from "./layouts/AuthLayout";
import About from "./pages/About";
import DetalleRegistro from "./pages/auth/DetalleRegistro";
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import DashboardEstudiante from "./pages/estudiantes_dashboard/DashboardEstudiante";
import PaginaMisActividades from "./pages/estudiantes_dashboard/PaginaMisActividades";
import UnirseActividad from "./pages/estudiantes_dashboard/UnirseActividades";
import NovedadesAdmin from "./pages/voae_dashboard/NovedadesAdmin";
import ActualizarActividad from "./components/paginas/UpdateActivity/UpdateActividad";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        // AuthProvider wraps all routes to provide authentication context to the entire app
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      }
    >
      {/* Rutas que utilizan el Layout por defecto */}
      <Route path="/" element={<Layout />}>
        {/* Página principal */}
        <Route index element={<Main />} />
        {/* Rutas de información general y autenticación */}
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="confirmar-cuenta" element={<DetalleRegistro />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="restablecer-contrasena" element={<ResetPassword />} />
      </Route>

      {/* Rutas que utilizan el Layout de Login */}
      <Route path="/" element={<Layout_Login />}>
        {/* Rutas unificadas para estudiantes, coordinadores y VOAE */}
        {/* Rutas comunes para todos los usuarios */}
        <Route path="dashboard" element={<DashboardEstudiante />} />

        <Route
          path="actividades-solicitadas"
          element={<ActividadesSolicitadas />}
        />
        <Route path="actividades-en-curso" element={<ActvidadesEnCurso />} />
        <Route path="crear-actividad" element={<CrearActividad />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="cambiar-contrasena" element={<CambiarContrasena />} />
        <Route path="gestion-actividad" element={<PaginaGestionActividad />} />
        <Route path="novedades-admin" element={<NovedadesAdmin />} />
        <Route path="gestionar-solicitud" element={<GestionSolicitudes />} />
        <Route
          path="solicitudes/:slug"
          element={<UpdateActividad />}
        />
        <Route path="horas-estudiantes" element={<HorasVOAE />} />
        <Route path="mis-actividades" element={<PaginaMisActividades />} />
        {/* Ruta con parámetro dinámico 'slug' para ver detalles de una actividad */}
        <Route
          path="detalles-actividad/:slug"
          element={<ActualizarActividad />}
        />
        {/* Ruta con parámetro dinámico 'id' para actualizar una actividad */}
        <Route path="actualizar-actividad/:id" element={<UpdateActividad />} />
        {/* Ruta con parámetro dinámico 'id' para subir imagen de una actividad */}
        <Route path="subir-imagen/:id" element={<SubirImagen />} />
        {/* Ruta con parámetro dinámico 'slug' para unirse a una actividad (solo estudiantes) */}
        <Route
          path="unirse-actividad/:slug"
          element={<UnirseActividad />}
        />
      </Route>
    </Route>
  )
);
