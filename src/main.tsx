import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import './index.css';
import Login from './pages/Login';
import PaginaVOAE from './pages/PaginaVOAE';
import Layout from './components/Layout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <BrowserRouter>
      <Routes>
        {/* Rutas que utilizan el Layout por defecto */}
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="pvoae" element={<PaginaVOAE />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  </>
);
