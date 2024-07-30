import React, { useEffect, useState } from 'react';
import { Carrera, obtenerTodasLasCarreras } from '../api/consultas';
import FiltroMA from './filtroMisActividades';
import Pagination from './Pagination';

const CarrerasView: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtrarData, setFiltrarData] = useState<Carrera[]>([]);
  const [paginaInicial, setPaginaInicial] = useState(1);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const resultado = await obtenerTodasLasCarreras();
        setCarreras(resultado);
        setFiltrarData(resultado);
      } catch (error) {
        setError('Error al obtener las carreras');
      } finally {
        setLoading(false);
      }
    };

    fetchCarreras();
  }, []);

  const itemsPerPaginas = 2;
  const totalPaginas = Math.ceil(filtrarData.length / itemsPerPaginas);

  const handlePaginasChange = (pagina: number) => {
    setPaginaInicial(pagina);
  };

  const paginatedData = filtrarData.slice((paginaInicial - 1) * itemsPerPaginas, paginaInicial * itemsPerPaginas);

  const aplicarFiltros = (ambito: string, fechaInicio: string, fechaFin: string, busqueda: string) => {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : null;
    const fechaFinDate = fechaFin ? new Date(fechaFin) : null;

    const filtrar = carreras.filter(item => {
      const inicioDate = new Date(item.name);

      return (
        (ambito === "" || item.name === ambito) &&
        (!fechaInicioDate || inicioDate >= fechaInicioDate) &&
        (!fechaFinDate || inicioDate <= fechaFinDate) &&
        (busqueda === "" || item.name.toLowerCase().includes(busqueda.toLowerCase()))
      );
    });

    setFiltrarData(filtrar);
    setPaginaInicial(1);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-2">
      <div className="block md:flex items-center justify-center mb-4 mt-2">
        <FiltroMA aplicarFiltros={aplicarFiltros} />
      </div>

      <div className="rounded-xl">
        <div className="overflow-x-auto">
          <table className="border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
            <thead className="block md:table-header-group">
              <tr className="border text-sm border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative bg-yellow-500 text-black">
                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Id</th>
                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Facultad</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group text-sm md:text-xs">
              {paginatedData.map((carrera) => (
                <tr key={carrera.id}>
                  <td>{carrera.id}</td>
                  <td>{carrera.name}</td>
                  <td>{carrera.faculty.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination PaginaInicial={paginaInicial} TotalPaginas={totalPaginas} onPageChange={handlePaginasChange} />
    </div>
  );
};

export default CarrerasView;
