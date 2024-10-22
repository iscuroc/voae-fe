/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/axiosInstance";
import {
  ActividadNombre,
  useObtenerActividadesPorNombre,
} from "@/api/servicios/actividades";
import useAuth from "@/api/useAuth";
import Alert from "@/components/Alert";
import { CustomPageContainer } from "@/components/CustomPageContainer";
import { MembersTable } from "@/components/paginas/MembersTable";
import RadioWithSubcategories from "@/components/RadioWithSubcategories";
import { ProDescriptions } from "@ant-design/pro-components";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ActivityScope,
  EtiquetasAmbitosActividad,
} from "../../api/servicios/enums";

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
  const { user } = useAuth();
  const handleGoBack = () => {
    window.history.back();
  };

  const [open, setOpen] = useState(false);
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(user);
  console.log(activity?.members);

  const imJoined = activity?.members?.some(
    (member) => member.account === member.account
  );
  return (
    <CustomPageContainer
      onBack={handleGoBack}
      title={"Detalles de actividad: " + activity?.name}
      extra={
        !imJoined &&
        activity && (
          <button
            onClick={() => setOpen(true)}
            className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 focus:outline-none"
          >
            Unirse a la Actividad
          </button>
        )
      }
    >
      <div className="space-x-8">
        <div className="mx-5 shadow-xl relative rounded-lg p-8">
          <ProDescriptions<ActividadNombre>
            loading={loading}
            dataSource={activity}
            columns={[
              {
                title: "Nombre de la Actividad",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Objetivos",
                dataIndex: "goals",
                key: "goals",
              },
              {
                title: "Descripción",
                dataIndex: "description",
                key: "description",
              },
              {
                title: "Carreras admitidas",
                dataIndex: "foreingCareers",
                key: "foreingCareers",
                render: (_careers, { careers }) => (
                  <ul>
                    {careers?.map((career) => (
                      <li key={career.id}>{career.name}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Ámbitos",
                dataIndex: "scopes",
                key: "scopes",
                render: (_scopes, { scopes }) => (
                  <ul>
                    {scopes?.map((scope) => (
                      <li key={scope.id}>
                        {EtiquetasAmbitosActividad[scope.scope] || scope.scope}{" "}
                        | {scope.hours} horas
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
                title: "Cupos",
                dataIndex: "totalSpots",
                key: "totalSpots",
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
          <MembersTable members={activity?.members} />
        </div>
      </div>
    </CustomPageContainer>
  );
};

export default UnirseActividad;
