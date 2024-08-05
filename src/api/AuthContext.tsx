// api/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from 'react';

export interface AuthContextType {
  accessToken: string | null;
  userRole: number | null;
  email: string | null;
  login: (token: string, role: number, email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [userRole, setUserRole] = useState<number | null>(() => {
    const role = localStorage.getItem('userRole');
    return role ? Number(role) : null;
  });
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

  useEffect(() => {
    if (userRole !== null) {
      localStorage.setItem('userRole', userRole.toString());
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  }, [email]);

  const login = (token: string, role: number, email: string) => {
    setAccessToken(token);
    setUserRole(role);
    setEmail(email);
  };

  const logout = () => {
    setAccessToken(null);
    setUserRole(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, userRole, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
