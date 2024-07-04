import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const VoaeAuth: React.FC<Props> = ({ children }) => {
  const accessToken = localStorage.getItem('access_token');
  const userRole = Number(localStorage.getItem('user_role'));

  // Verificar si el token de acceso existe y si el rol es de voae
  if (!accessToken || userRole !== 2) {
    return <Navigate to="/login" />;
  }


  return <>{children}</>;
};

export default VoaeAuth;
