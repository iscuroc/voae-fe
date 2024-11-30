
import axiosInstance from "@/api/axiosInstance";
import type { MisActividades } from "@/api/servicios/actividades";
import { EtiquetasAmbitosActividad, estadoActividadMap, formatDate } from "@/api/servicios/enums";
import Skeleton from "@/components/Skeleton";
import { type ProColumns, ProDescriptions, ProTable } from "@ant-design/pro-components";
import { useEffect, useMemo, useState } from "react";
import FiltroMA from "../../components/filtros/filtroMisActividades";

export default function PaginaMisActividades() {
  useEffect(() => {
    document.title = "Mis Horas - UNAH CUROC";
  }, []);

  const [ filtrarData, setFiltrarData ] = useState<MisActividades[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ paginaInicial, setPaginaInicial ] = useState(1);
  const [ searchData, setSearchData ] = useState<MisActividades[]>([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/users/my-activities', {});
        setFiltrarData(response.data);
        setSearchData(response.data);
      } catch(error) {
        setError('Hay problemas de conexion con el Servidor');
      } finally {
        setLoading(false);
      }
    };
    obtenerDatos();
  }, []);

  const itemsPerPaginas = 10;

  const handlePaginasChange = (Paginas: number) => {
    setPaginaInicial(Paginas);
  };

  const paginatedData = searchData.slice((paginaInicial - 1) * itemsPerPaginas, paginaInicial * itemsPerPaginas);
  const aplicarFiltros = (ambito: string, fechaInicio: string, fechaFin: string, busqueda: string) => {
    console.log(ambito, fechaInicio, fechaFin, busqueda);

    const fechaInicioDate = fechaInicio ? new Date(fechaInicio.split('T')[ 0 ]) : null;
    const fechaFinDate = fechaFin ? new Date(fechaFin.split('T')[ 0 ]) : null;

    const filtrar = filtrarData.filter(item => {
      const inicioDate = new Date(item.startDate.split(' ')[ 0 ]);

      const cumpleAmbito = ambito === "" || item.activityScopes.some(s => EtiquetasAmbitosActividad[ s.scope ] === ambito);
      const cumpleFechaInicio = !fechaInicioDate || inicioDate >= fechaInicioDate;
      const cumpleFechaFin = !fechaFinDate || inicioDate <= fechaFinDate;
      const cumpleBusqueda = item.name.toLowerCase().includes(busqueda?.toLowerCase());

      return cumpleAmbito && cumpleFechaInicio && cumpleFechaFin && cumpleBusqueda;
    });

    setSearchData(filtrar);
    setPaginaInicial(1);
  };
  // Obtener todos los ámbitos y las horas para generar las columnas y filas

  const ambitosHorasMapped = useMemo(() => {
    const ambitosHoras: { [ ambito: string ]: number } = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    filtrarData.forEach(actividad => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      actividad.memberScopes.forEach(memberScopes => {
        const ambitoNombre = EtiquetasAmbitosActividad[ memberScopes.scope ] || `Ámbito ${memberScopes.scope}`;
        if(!ambitosHoras[ ambitoNombre ]) {
          ambitosHoras[ ambitoNombre ] = 0;
        }
        ambitosHoras[ ambitoNombre ] += memberScopes.hours;
      });
    });

    return ambitosHoras;

  }, [ filtrarData ]);

  if(loading) {
    return <Skeleton />;
  }

  if(error) {
    return <div className="text-2xl font-bold text-center mt-20">Error: {error}</div>;
  }

  const ambitos = Object.keys(ambitosHorasMapped);

  const columns: ProColumns<MisActividades>[] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Ámbitos',
      dataIndex: 'activityScopes',
      key: 'activityScopes',
      render: (_, record) => record.activityScopes.map(s => EtiquetasAmbitosActividad[ s.scope ] || s.scope).join(", "),
    },
    {
      title: 'Fecha Inicio',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_, record) => formatDate(record.startDate),
      width: 150,
    },
    {
      title: 'Fecha Final',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 150,
      render: (_, record) => formatDate(record.endDate),
    },
    {
      title: 'Estado',
      dataIndex: 'activityStatus',
      key: 'activityStatus',
      render: (_, record) => estadoActividadMap[ record.activityStatus ] || record.activityStatus,
    },
  ];

  return (
    <>
      <div className="container mx-auto p-2">

        <ProDescriptions
          title={<h2>Total de horas</h2>}
          dataSource={ambitosHorasMapped}
          columns={ambitos.map(ambito => ({
            title: ambito,
            dataIndex: ambito,
            key: ambito,
          }))}
        />
        <ProTable<MisActividades>
          headerTitle={<h2 className="text-center my-5 text-md font-bold">Actividades</h2>}
          toolbar={{ filter: (<FiltroMA aplicarFiltros={aplicarFiltros} />) }}
          ghost
          columns={columns}
          dataSource={paginatedData}
          rowKey="id"
          pagination={{
            current: paginaInicial,
            pageSize: itemsPerPaginas,
            total: filtrarData.length,
            onChange: handlePaginasChange,
          }}
          scroll={{ x: 768 }}
          search={false}
          options={false}
        />
      </div>
    </>
  );
}
