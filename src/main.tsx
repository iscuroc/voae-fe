import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import './index.css';
import Login from './pages/Login';
import Layout from './components/layouts/Layout';
import Layout_Login from './components/layouts/Layout_Login';
import PaginaVOAE from './pages/voae_dashboard/PaginaVOAE';
import PaginaEstudiantes from './pages/estudiantes_dashboard/PaginaEstudiantes';
import PaginaCoordinadores from './pages/coordinadores_dashboard/PaginaCoordinadores';
import DashboardCoordinador from './pages/coordinadores_dashboard/DashboardCoordinador';
import DashboardEstudiante from './pages/estudiantes_dashboard/DashboardEstudiante';
import DashboardAdminVoae from './pages/voae_dashboard/DashboardAdminVoae';
import PaginaMisActividades from './pages/estudiantes_dashboard/PaginaMisActividades';

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
        {/* Rutas que utilizan el Layout de Login */}
        <Route path="/" element={<Layout_Login />}>
          <Route path="dashboard-estudiante/main" element={<DashboardEstudiante />} />
          <Route path="dashboard-estudiante/pestudiantes" element={<PaginaEstudiantes />} />
          <Route path="dashboard-estudiante/mis-actividades" element={<PaginaMisActividades />} />
          <Route path="dashboard-coordinador/main" element={<DashboardCoordinador />} />
          <Route path="dashboard-coordinador/pcoordinadores" element={<PaginaCoordinadores />} />
          <Route path="dashboard-voae/main" element={<DashboardAdminVoae />} />
          <Route path="dashboard-voae/pvoae" element={<PaginaVOAE />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </>
);
