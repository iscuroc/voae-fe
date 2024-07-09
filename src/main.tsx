import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import './index.css';
import Login from './pages/Login';
import Registro from './pages/Registro';
import DetalleRegistro from './pages/DetalleRegistro';
import Layout from './components/layouts/Layout';
import Layout_Login from './components/layouts/Layout_Login';
import ActividadesFinalizada from './pages/estudiantes_dashboard/ActividadesFinalizada';
import ActividadesFinalizadaVoae from './pages/voae_dashboard/ActividadesFinalizadaVoae';
import ActividadesFinalizadaCoordinador from './pages/coordinadores_dashboard/ActividadesFinalizadaCoordinador';
import ParticipantesActividad from './pages/estudiantes_dashboard/ParticipantesActividad';
import CParticipantesActividad from './pages/coordinadores_dashboard/CParticipantesActividad';
import VParticipantesActividad from './pages/voae_dashboard/VParticipantesActividad';
import DashboardCoordinador from './pages/coordinadores_dashboard/DashboardCoordinador';
import DashboardEstudiante from './pages/estudiantes_dashboard/DashboardEstudiante';
import DashboardAdminVoae from './pages/voae_dashboard/DashboardAdminVoae';
import PaginaMisActividades from './pages/estudiantes_dashboard/PaginaMisActividades';
import ActvidadesEnCursoCoordinador from './pages/coordinadores_dashboard/ActvidadesEnCursoCoordinador';
import PaginaGestionCoordinadores from './pages/coordinadores_dashboard/PaginaGestionCoorinadores';
import CDetallesActividad from './pages/coordinadores_dashboard/CDetallesActividad';
import ActvidadesEnCursoEstudiantes from './pages/estudiantes_dashboard/ActvidadesEnCursoEstudiantes';
import ActividadesSolicitadasEstudiantes from './pages/estudiantes_dashboard/ActividadesSolicitadasEstudiantes';
import UnirseActividad from './pages/estudiantes_dashboard/UnirseActividades';
import ActvidadesEnCursoVoae from './pages/voae_dashboard/ActvidadesEnCursoVoae';
import DetallesActividadesVoae from './pages/voae_dashboard/VDetallesActvidad';
import PaginaGestionVOAE from './pages/voae_dashboard/PaginaGestionVOAE';
import HorasVoaeEstudiante from './pages/estudiantes_dashboard/HorasVoaeEstudiante';
import DetalleHorasVoaeEstudiante from './pages/estudiantes_dashboard/DetalleMisHoras';
import NovedadesAdmin from './pages/voae_dashboard/NovedadesAdmin';
import CrearActividad from './pages/estudiantes_dashboard/CrearActividad';
import CrearActividadVoae from './pages/voae_dashboard/CrearActividadVoae';
import CrearActividadCoordinador from './pages/coordinadores_dashboard/CrearActividadCoordinador';
import Calendario from './components/PaginaDeCalendar';




const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <BrowserRouter>
      <Routes>
        {/* Rutas que utilizan el Layout por defecto */}
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/detalle-registro" element={<DetalleRegistro />} />
       
        {/* Rutas que utilizan el Layout de Login */}
        <Route path="/" element={<Layout_Login />}>
          <Route path="dashboard-estudiante/main" element={<DashboardEstudiante />} />
          <Route path="dashboard-estudiante/actividades-solicitadas" element={<ActividadesSolicitadasEstudiantes />} />
          <Route path="dashboard-estudiante/actividades-en-curso" element={<ActvidadesEnCursoEstudiantes />} />
          <Route path="dashboard-estudiante/act-finalizadas" element={<ActividadesFinalizada />} />
          <Route path="dashboard-estudiante/act-finalizadas/participantes-actividad" element={<ParticipantesActividad />} />
          <Route path="dashboard-estudiante/mis-actividades" element={<PaginaMisActividades />} />
          <Route path="dashboard-estudiante/unirse-actividad" element={<UnirseActividad />} />
          <Route path="dashboard-estudiante/mis-horas-voae" element={ <HorasVoaeEstudiante />} />
          <Route path="dashboard-estudiante/mis-horas-voae/detalle-mis-horas" element={ <DetalleHorasVoaeEstudiante />} />
          <Route path="dashboard-estudiante/crear-actividad" element={<CrearActividad />} />
          <Route path="dashboard-estudiante/calendario" element={<Calendario />} />

          <Route path="dashboard-coordinador/act-finalizadas" element={<ActividadesFinalizadaCoordinador />} />
          <Route path="dashboard-coordinador/act-finalizadas/cparticipantes-actividad" element={<CParticipantesActividad />} />
          <Route path="dashboard-coordinador/main" element={<DashboardCoordinador />} />
          <Route path="dashboard-coordinador/detalles-actividad" element={<CDetallesActividad />} />
          <Route path="dashboard-coordinador/actividad-en-curso" element={<ActvidadesEnCursoCoordinador />} />
          <Route path="dashboard-coordinador/gestion-actividad" element={<PaginaGestionCoordinadores />} />
          <Route path="dashboard-coordinador/crear-actividad" element={<CrearActividadCoordinador />} />
          <Route path="dashboard-coordinador/calendario" element={<Calendario />} />

          <Route path="dashboard-voae/act-finalizadas/vparticipantes-actividad" element={<VParticipantesActividad />} />
          <Route path="dashboard-voae/act-finalizadas" element={<ActividadesFinalizadaVoae />} />
          <Route path="dashboard-voae/main" element={<DashboardAdminVoae />} />
          <Route path="dashboard-voae/actividad-en-curso" element={<ActvidadesEnCursoVoae />} />
          <Route path="dashboard-voae/gestion-actividad" element={<PaginaGestionVOAE />} />
          <Route path="dashboard-voae/detalles-actividades" element={<DetallesActividadesVoae />} />
          <Route path="dashboard-voae/novedades-admin" element={<NovedadesAdmin />} />
          <Route path="dashboard-voae/crear-actividad" element={<CrearActividadVoae />} />
          <Route path="dashboard-voae/calendario" element={<Calendario />} />

          
        </Route>

      </Routes>
    </BrowserRouter>
  </>
);
