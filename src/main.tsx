import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import './index.css';
import Layout from './components/Layout';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* Puedes agregar rutas adicionales que no utilicen Layout aquí */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
