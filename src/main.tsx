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
import PaginaVOAE from './pages/voae_dashboard/PaginaVOAE';
import PaginaEstudiantes from './pages/estudiantes_dashboard/PaginaEstudiantes';
import ActividadesFinalizada from './pages/estudiantes_dashboard/ActividadesFinalizada';
import ActividadesFinalizadaVoae from './pages/voae_dashboard/ActividadesFinalizadaVoae';
import ActividadesFinalizadaCoordinador from './pages/coordinadores_dashboard/ActividadesFinalizadaCoordinador';
import ParticipantesActividad from './pages/estudiantes_dashboard/ParticipantesActividad';
import CParticipantesActividad from './pages/coordinadores_dashboard/CParticipantesActividad';
import VParticipantesActividad from './pages/voae_dashboard/VParticipantesActividad';
import PaginaCoordinadores from './pages/coordinadores_dashboard/PaginaCoordinadores';
import DashboardCoordinador from './pages/coordinadores_dashboard/DashboardCoordinador';
import DashboardEstudiante from './pages/estudiantes_dashboard/DashboardEstudiante';
import DashboardAdminVoae from './pages/voae_dashboard/DashboardAdminVoae';
import PaginaMisActividades from './pages/estudiantes_dashboard/PaginaMisActividades';
import GestionActividadesVoae from './pages/voae_dashboard/GestionActividades';
import GestionActividadesCoordinador from './pages/coordinadores_dashboard/GestionActividades';
import DetalleActividadEstudiante from './pages/estudiantes_dashboard/DetallesActividades';



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
          <Route path="dashboard-estudiante/pestudiantes" element={<PaginaEstudiantes />} />
          <Route path="dashboard-estudiante/act-finalizadas" element={<ActividadesFinalizada />} />
          <Route path="dashboard-voae/act-finalizadas" element={<ActividadesFinalizadaVoae />} />
          <Route path="dashboard-coordinador/act-finalizadas" element={<ActividadesFinalizadaCoordinador />} />
          <Route path="dashboard-estudiante/act-finalizadas/participantes-actividad" element={<ParticipantesActividad />} />
          <Route path="dashboard-coordinador/act-finalizadas/cparticipantes-actividad" element={<CParticipantesActividad />} />
          <Route path="dashboard-voae/act-finalizadas/vparticipantes-actividad" element={<VParticipantesActividad />} />
          <Route path="dashboard-estudiante/mis-actividades" element={<PaginaMisActividades />} />
          <Route path="dashboard-coordinador/main" element={<DashboardCoordinador />} />
          <Route path="dashboard-coordinador/pcoordinadores" element={<PaginaCoordinadores />} />
          <Route path="dashboard-voae/main" element={<DashboardAdminVoae />} />
          <Route path="dashboard-voae/pvoae" element={<PaginaVOAE />} />
          <Route path="dashboard-voae/pvoae/cvgestion-actividades" element={<GestionActividadesVoae />} />
          <Route path="/dashboard-coordinador/pcoordinadores/cgestion-actividades" element={<GestionActividadesCoordinador />} />
          <Route path="/dashboard-estudiante/pestudiante/detalle-actividad" element={<DetalleActividadEstudiante />} />
          
        </Route>

      </Routes>
    </BrowserRouter>
  </>
);
