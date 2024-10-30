/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/axiosInstance";
import {
  ActividadNombre,
  ActivityStatus,
  activityStatusMapper,
  useObtenerActividadesPorNombre,
} from "@/api/servicios/actividades";
import useAuth from "@/api/useAuth";
import Alert from "@/components/Alert";
import { CustomPageContainer } from "@/components/CustomPageContainer";
import { MembersTable } from "@/components/paginas/MembersTable";
import RadioWithSubcategories from "@/components/RadioWithSubcategories";
import { ProDescriptions } from "@ant-design/pro-components";
import { Badge, Button, Modal, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ActivityScope,
  EtiquetasAmbitosActividad,
} from "../../api/servicios/enums";
import { Role } from "@/api/servicios/usuarios";

const UnirseActividad: React.FC = () => {
  useEffect(() => {
    document.title = "Detalle de Actividad - UNAH CUROC";
  }, []);

  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [selectedScopes, setSubcategories] = useState<
    Record<ActivityScope, boolean>
  >({} as Record<ActivityScope, boolean>);

  const handleCheckboxChange = (value: {
    scope: ActivityScope;
    checked: boolean;
  }) => {
    if (value.scope === ActivityScope.Becas) {
      setSubcategories({
        [ActivityScope.Becas]: true,
      } as Record<ActivityScope, boolean>);
    } else {
      setSubcategories((prev) => ({
        ...prev,
        [value.scope]: value.checked,
        [ActivityScope.Becas]: false,
      }));
    }
  };

  if (!slug) {
    setError("No se proporcionó el parámetro de nombre");
  }

  const [{ data: activity, loading }] = useObtenerActividadesPorNombre(slug!);

  const handleJoinActivity = async () => {
    if (activity && selectedScopes !== null) {
      try {
        const scopes = Object.entries(selectedScopes)
          .filter((scope) => scope[1])
          .map((scope) => +scope[0]);
        await axiosInstance.put(`/activities/${activity.id}/join`, {
          scopes: scopes,
        });
        Alert({
          title: "Éxito",
          text: "Te has unido a la actividad con exito",
          icon: "success",
          callback: () => navigate(-1),
        });
        setOpen(false);
      } catch (error) {
        Alert({
          title: "Error",
          text: "Hubo un problema al unirse a la actividad",
          icon: "error",
        });
      }
    } else {
      Alert({
        title: "Advertencia",
        text: "Por favor selecciona un ámbito para unirte a la actividad.",
        icon: "warning",
      });
    }
  };
  const { userRole, user } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [open, setOpen] = useState(false);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const imJoined = activity?.members?.some(
    (member) => member.account === user?.accountNumber
  );

  return (
    <CustomPageContainer
      onBack={handleGoBack}
      ghost
      title={"Detalles de actividad: " + activity?.name}
      extra={
        activity &&
        !imJoined &&
        [ActivityStatus.Approved, ActivityStatus.Published].includes(
          activity?.activityStatus as ActivityStatus
        ) &&
        userRole === Role.STUDENT && (
          <Button
            onClick={() => setOpen(true)}
            className="bg-green-500 text-white"
          >
            Unirme a la Actividad
          </Button>
        )
      }
    >
      <ProDescriptions<ActividadNombre>
        // loading={loading}
        dataSource={activity}
        emptyText="No se encontró la actividad"
        bordered
        loading={loading}
        size="small"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
        columns={[
          {
            title: "Nombre de la Actividad",
            dataIndex: "name",
            key: "name",
            span: 1,
          },
          {
            title: "Objetivos",
            dataIndex: "goals",
            key: "goals",
            span: 2,
          },
          {
            title: "Estado",
            dataIndex: "activityStatus",
            render: (_activityStatus, { activityStatus }) => (
              <Badge
                status="processing"
                text={activityStatusMapper(activityStatus)}
              />
            ),
          },
          {
            title: "Descripción",
            dataIndex: "description",
            key: "description",
            span: 2,
          },
          {
            title: "Carreras admitidas",
            dataIndex: "foreingCareers",
            key: "foreingCareers",
            span: 2,
            render: (_careers, { foreingCareers }) => (
              <ul>
                {foreingCareers?.map((career) => (
                  <li key={career.id}>{career.name}</li>
                ))}
              </ul>
            ),
          },
          {
            title: "Ámbitos",
            dataIndex: "scopes",
            key: "scopes",
            span: 2,
            render: (_scopes, { scopes }) => (
              <ul>
                {scopes?.map((scope) => (
                  <li key={scope.id}>
                    {EtiquetasAmbitosActividad[scope.scope] || scope.scope} |{" "}
                    {scope.hours} horas
                  </li>
                ))}
              </ul>
            ),
          },
          {
            title: "Supervisor",
            dataIndex: "supervisor",
            key: "supervisor",
            renderText(text) {
              return `${text.names} ${text.lastnames}`;
            },
          },
          {
            title: "Encargado de Actividad",
            dataIndex: "coordinator",
            key: "coordinator",
            renderText(text) {
              return `${text.names} ${text.lastnames}`;
            },
          },
          {
            title: "Cupos disponibles",
            dataIndex: "totalSpots",
            render: (_dom, { members, totalSpots }) => {
              const joinedMembers = members?.length || 0;
              return (
                <Progress
                  percent={Math.round((joinedMembers / totalSpots) * 100)}
                  format={(percent) =>
                    `${joinedMembers}/${totalSpots} - ${percent}%`
                  }
                />
              );
            },
            span: 2,
          },
          {
            title: "Fecha Inicio",
            dataIndex: "startDate",
            key: "startDate",
            valueType: "dateTime",
            fieldProps: {
              format: "DD/MM/YYYY HH:mm",
            },
          },
          {
            title: "Fecha Final",
            dataIndex: "endDate",
            key: "endDate",
            valueType: "dateTime",
            fieldProps: {
              format: "DD/MM/YYYY HH:mm",
            },
          },
        ]}
      />
      {!imJoined && (
        <Modal
          open={open}
          onOk={handleJoinActivity}
          onCancel={() => setOpen(false)}
        >
          <div className="flex flex-col justify-between p-8">
            <>
              <div className="bg-white shadow-lg rounded-lg p-8 ">
                <h4 className="text-lg font-bold text-gray-800 mb-6">
                  Seleccione sus horas
                </h4>

                <RadioWithSubcategories
                  scopes={activity?.scopes}
                  selectedOption={selectedScopes}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            </>
          </div>
        </Modal>
      )}
      <MembersTable members={activity?.members} loading={loading} />
    </CustomPageContainer>
  );
};

export default UnirseActividad;
