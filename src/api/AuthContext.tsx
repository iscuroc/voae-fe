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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);

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
