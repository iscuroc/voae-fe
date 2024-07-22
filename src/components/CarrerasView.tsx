import React, { useEffect, useState } from 'react';
import { Carrera, obtenerTodasLasCarreras } from '../api/consultas';

const CarrerasView: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const resultado = await obtenerTodasLasCarreras();
        setCarreras(resultado);
      } catch (error) {
        setError('Error al obtener las carreras');
      } finally {
        setLoading(false);
      }
    };

    fetchCarreras();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Listado de Carreras</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Facultad</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.id}>
              <td>{carrera.id}</td>
              <td>{carrera.name}</td>
              <td>{carrera.faculty.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarrerasView;
