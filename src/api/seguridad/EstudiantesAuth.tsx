// components/EstudianteRoute.tsx
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../useAuth';

const EstudianteRoute = () => {
  const { accessToken, userRole } = useAuth();
  if (!accessToken || userRole !== 0) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default EstudianteRoute;
