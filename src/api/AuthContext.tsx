// api/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from "react";
import { ObtenerDatosUsuarioIniciado, Role, User } from "./servicios/usuarios";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  accessToken: string | null;
  userRole?: number | null | Role;
  email?: string | null;
  login: (token: string, role: number, email: string) => void;
  logout: () => void;
  loading: boolean;
  user?: User;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const [email, setEmail] = useState<string | null>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      ObtenerDatosUsuarioIniciado()
        .then((user) => {
          if (!user) {
            logout();
            return;
          }
          setUser(user);
          setEmail(user.email);

          if (user.role === Role.STUDENT) {
            navigate("/dashboard-estudiante/main");
          } else if (user.role === Role.TEACHER) {
            navigate("/dashboard-coordinador/main");
          } else if (user.role === Role.VOAE) {
            navigate("/dashboard-voae/main");
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      localStorage.removeItem("accessToken");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const login = (token: string, _: number, email: string) => {
    setAccessToken(token);
    setEmail(email);
    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setAccessToken(null);
    setEmail(null);
    console.log("logout");

    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userRole: user?.role,
        email,
        login,
        logout,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
