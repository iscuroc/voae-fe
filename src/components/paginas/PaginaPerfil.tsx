import { User2Icon, Building2, Mail } from "lucide-react";
import { ObtenerDatosUsuarioIniciado, User } from "@/api/servicios/usuarios";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const Perfil = () => {
  useEffect(() => {
    document.title = "Perfil - UNAH COPAN";
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await ObtenerDatosUsuarioIniciado();
        if (response && typeof response === "object") {
          setUser(response);
        } else {
          setError("No se encontró información del usuario");
        }
      } catch (error) {
        setError("Error al cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };
    obtenerDatos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto gap-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center bg-gray-100">
            <User2Icon className="w-12 h-12 text-gray-600" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold">
            {user?.names} {user?.lastnames}
          </h1>
          <h2 >{user?.career.name}</h2>
        </div>
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>UNAH-CUROC</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl py-8">
          {[
            { label: "Académico-científicas", value: "5" },
            { label: "Sociales", value: "2" },
            { label: "Artístico-culturales", value: "12" },
            { label: "Deportivas", value: "7" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-3xl font-bold text-gray">
                {stat.value}
              </div>
              <div className="text-sm text-primary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Organizaciones</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Pumas en Acción",
              "Estudiantina",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-light rounded-full text-sm text-gray-dark hover:bg-gray-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
