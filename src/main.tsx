import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import './index.css';
import Registro from './pages/Registro';
import DetalleRegistro from './pages/DetalleRegistro';
import Layout from './layouts/Layout';
import Layout_Login from './layouts/Layout_Login';
import DashboardCoordinador from './pages/coordinadores_dashboard/DashboardCoordinador';
import DashboardEstudiante from './pages/estudiantes_dashboard/DashboardEstudiante';
import DashboardAdminVoae from './pages/voae_dashboard/DashboardAdminVoae';
import PaginaMisActividades from './pages/estudiantes_dashboard/PaginaMisActividades';
import UnirseActividad from './pages/estudiantes_dashboard/UnirseActividades';
import HorasVoaeEstudiante from './pages/estudiantes_dashboard/HorasVoaeEstudiante';
import NovedadesAdmin from './pages/voae_dashboard/NovedadesAdmin';
import EditarPerfil from './components/EditarPerfil';
import CambiarContrasena from './components/CambiarContrasena';
import Calendario from './components/PaginaDeCalendario';
import PaginaGestionSolicitudesVOAE from './pages/voae_dashboard/PaginaAprobarSolicitudesVOAE';
import { AuthProvider } from './api/AuthContext';
import Login from './pages/Login';
import ActvidadesFinalizada from './components/paginas/ActividadesFinalizada';
import ActvidadesEnCurso from './components/paginas/ActvidadesEnCurso';
import CrearActividad from './components/paginas/CrearActividad';
import DetallesActividad from './components/paginas/DetallesActividad';
import GestionSolicitudes from './components/paginas/GestionSolicitudes';
import PaginaGestionActividad from './components/paginas/PaginaGestionActividad';
import Perfil from './components/paginas/PaginaPerfil';
import ParticipantesActividad from './components/paginas/ParticipantesActividad';
import MisCertificados from './components/paginas/MisCertificados';
import HorasVOAE from './components/paginas/HorasVoae';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <AuthProvider>

      <BrowserRouter>
        <Routes>
          {/* Rutas que utilizan el Layout por defecto */}
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />
            <Route path="confirm-email" element={<DetalleRegistro />} />
          </Route>
          {/* Rutas que utilizan el Layout de Login */}
          <Route path="/" element={<Layout_Login />}>
            
            {/* Dashboard de estudiantes */}
            {/* <Route path="/" element={<EstudianteRoute />}> */}
            <Route path="dashboard-estudiante/main" element={<DashboardEstudiante />} />
            <Route path="dashboard-estudiante/actividades-solicitadas" element={<GestionSolicitudes />} />
            <Route path="dashboard-estudiante/actividades-en-curso" element={<ActvidadesEnCurso />} />
            <Route path="dashboard-estudiante/act-finalizadas" element={<ActvidadesFinalizada />} />
            <Route path="dashboard-estudiante/act-finalizadas/participantes-actividad" element={<ParticipantesActividad />} />
            <Route path="dashboard-estudiante/mis-actividades" element={<PaginaMisActividades />} />
            <Route path="dashboard-estudiante/unirse-actividad" element={<UnirseActividad />} />
            <Route path="dashboard-estudiante/mis-horas-voae" element={<HorasVoaeEstudiante />} />
            <Route path="dashboard-estudiante/mis-certificados" element={<MisCertificados />} />
            <Route path="dashboard-estudiante/crear-actividad" element={<CrearActividad />} />
            <Route path="dashboard-estudiante/calendario" element={<Calendario />} />
            <Route path="dashboard-estudiante/perfil" element={<Perfil />} />
            <Route path="dashboard-estudiante/editar-perfil" element={<EditarPerfil />} />
            <Route path="dashboard-estudiante/cambiar-contrasena" element={<CambiarContrasena />} />
            <Route path="dashboard-estudiante/detalles-actividad" element={<DetallesActividad />} />
            
            {/* </Route> */}

            {/* Dashboard de coordinadores */}
            <Route path="dashboard-coordinador/act-finalizadas" element={<ActvidadesFinalizada />} />
            <Route path="dashboard-coordinador/act-finalizadas/cparticipantes-actividad" element={<ParticipantesActividad />} />
            <Route path="dashboard-coordinador/main" element={<DashboardCoordinador />} />
            <Route path="dashboard-coordinador/detalles-actividad" element={<DetallesActividad />} />
            <Route path="dashboard-coordinador/actividad-en-curso" element={<ActvidadesEnCurso />} />
            <Route path="dashboard-coordinador/gestion-actividad" element={<PaginaGestionActividad />} />
            <Route path="dashboard-coordinador/crear-actividad" element={<CrearActividad />} />
            <Route path="dashboard-coordinador/calendario" element={<Calendario />} />
            <Route path="dashboard-coordinador/perfil" element={<Perfil />} />
            <Route path="dashboard-coordinador/editar-perfil" element={<EditarPerfil />} />
            <Route path="dashboard-coordinador/cambiar-contrasena" element={<CambiarContrasena />} />
            <Route path="dashboard-coordinador/horas-voae" element={<HorasVOAE/>} />

            {/* Dashboard de voae */}
            <Route path="dashboard-voae/act-finalizadas/vparticipantes-actividad" element={<ParticipantesActividad />} />
            <Route path="dashboard-voae/act-finalizadas" element={<ActvidadesFinalizada />} />
            <Route path="dashboard-voae/main" element={<DashboardAdminVoae />} />
            <Route path="dashboard-voae/actividad-en-curso" element={<ActvidadesEnCurso />} />
            <Route path="dashboard-voae/gestion-actividad" element={<PaginaGestionActividad />} />
            <Route path="dashboard-voae/detalles-actividades" element={<DetallesActividad />} />
            <Route path="dashboard-voae/novedades-admin" element={<NovedadesAdmin />} />
            <Route path="dashboard-voae/crear-actividad" element={<CrearActividad />} />
            <Route path="dashboard-voae/calendario" element={<Calendario />} />
            <Route path="dashboard-voae/gestionar-solicitud" element={<GestionSolicitudes />} />
            <Route path="dashboard-voae/gestion-solicitud" element={<PaginaGestionSolicitudesVOAE />} />
            <Route path="dashboard-voae/perfil" element={<Perfil />} />
            <Route path="dashboard-voae/editar-perfil" element={<EditarPerfil />} />
            <Route path="dashboard-voae/cambiar-contrasena" element={<CambiarContrasena />} />
            <Route path="dashboard-voae/horas-voae" element={<HorasVOAE />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
);
