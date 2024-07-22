// api/AuthContext.tsx
import { createContext, useState, ReactNode } from 'react';

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
  const [userRole, setUserRole] = useState<number | null>(Number(localStorage.getItem('userRole')));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));

  const login = (token: string, role: number, email: string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('email', email);
    localStorage.setItem('userRole', userRole !== null ? userRole.toString() : '');
    setAccessToken(token);
    setUserRole(role);
    setEmail(email);
  };
  
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');
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
