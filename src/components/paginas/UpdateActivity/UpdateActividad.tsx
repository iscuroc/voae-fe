/* eslint-disable @typescript-eslint/no-explicit-any */
import { EtiquetasAmbitosActividad } from "@/api/servicios/enums";
import {
  Role,
  roleMapper,
  SimpleUserResponse,
  useGetUsersByRoles,
} from "@/api/servicios/usuarios";
import { CustomError, Pagination } from "@/api/types/common";
import { daysify } from "@/utils/formatDate";
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Badge, Button, Divider, Flex, Image } from "antd";
import { RefetchFunction } from "axios-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ActivityStatus,
  activityStatusMapper,
  AprobarActividad,
  obtenerActividadesPorNombre,
  RechazarActividad,
  UpdateActivityRequest,
} from "@/api/servicios/actividades";
import {
  Organizer,
  OrganizerType,
  updateActividad,
} from "@/api/servicios/actividadPost";
import { obtenerTodasLasCarreras } from "@/api/servicios/carreras";
import { obtenerLasOrganizaciones } from "@/api/servicios/organizaciones";
import { GetActivityBySlug } from "@/api/types/activityBySlug";
import useAuth from "@/api/useAuth";
import Alert from "@/components/Alert";
import { CustomPageContainer } from "@/components/CustomPageContainer";
import { PublishButton } from "@/components/PublishButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MembersTable } from "../MembersTable";
import { UpdateActivityFormValues } from "./update-activity.types";

const dateFormat = "DD/MM/YYYY HH:mm";

const ActualizarActividad = () => {
  const { slug } = useParams<{ slug: string }>();

  const navigate = useNavigate();
  const [form] = ProForm.useForm<UpdateActivityFormValues>();
  const { userRole, user } = useAuth();
  const { data, isPending } = useQuery<GetActivityBySlug>({
    queryKey: ["Activity", slug],
    queryFn: obtenerActividadesPorNombre,
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateActividad,
    mutationKey: ["Activity", slug],
    onError(error) {
      console.log(error);
    },
  });

  const { mutateAsync: aproveActivity } = useMutation({
    mutationFn: AprobarActividad,
    mutationKey: ["Activity", slug],
  });

  const handleSubmit = async (values: UpdateActivityRequest) => {
    console.log(values);

    const formatedStartDate =
      typeof values.startDate === "string"
        ? daysify(values.startDate).toISOString()
        : daysify(values.startDate, dateFormat).toISOString();

    const formatedEndDate =
      typeof values.endDate === "string"
        ? daysify(values.endDate).toISOString()
        : daysify(values.endDate, dateFormat).toISOString();

    try {
      await mutateAsync({
        ...values,
        startDate: formatedStartDate,
        endDate: formatedEndDate,
        id: data?.id as number,
      });

      toast.success("La actividad se actualizó con éxito.");
    } catch (e) {
      console.log(e);

      const error = e as CustomError;
      if (
        error.response.status === 409 &&
        error.response.data.errors.at(0)?.code ===
          "Activity.ActivityNameAlreadyExists"
      ) {
        toast.error(
          "Ya existe una actividad con este nombre, por favor elija otro."
        );
      }

      if (
        error.response.status === 400 &&
        error.response.data.errors.at(0)?.code ===
          "Activity.ActivityNameAlreadyExists"
      ) {
        toast.error(
          "Ya existe una actividad con este nombre, por favor elija otro."
        );
      }
    }
  };

  const [isLoadingAprobar, setIsLoadingAprobar] = useState(false);
  const [isLoadingRechazar, setIsLoadingRechazar] = useState(false);

  const [isRejectedAprove, setIsRejectedAprove] = useState({
    isRejected: false,
    isAprove: false,
  });

  const botonAprobar = async (observation: string) => {
    if (data) {
      setIsLoadingAprobar(true); // Mostrar el loading
      try {
        await aproveActivity({
          id: data.id,
          reviewerObservation: observation,
        });
        Alert({
          title: "Éxito",
          text: "Actividad aprobada con éxito",
          icon: "success",
        });
        setIsRejectedAprove({ isRejected: false, isAprove: false });
      } catch (error) {
        Alert({
          title: "Advertencia",
          text: "Debe colocar una Observación para aprobar la actividad",
          icon: "warning",
        });
      } finally {
        setIsLoadingAprobar(false); // Ocultar el loading
      }
    }
  };

  const botonRechazar = async (observation: string) => {
    if (data) {
      setIsLoadingRechazar(true); // Mostrar el loading
      try {
        await RechazarActividad(data.id, observation);
        Alert({
          title: "Éxito",
          text: "Actividad rechazada con éxito",
          icon: "success",
          callback: () => navigate(-1),
        });
        setIsRejectedAprove({ isRejected: false, isAprove: false });
      } catch (error) {
        Alert({
          title: "Advertencia",
          text: "Debe ingresar una Observación para rechazar la actividad",
          icon: "warning",
        });
      } finally {
        setIsLoadingRechazar(false);
      }
    }
  };

  const selectedScopes = (ProForm.useWatch("scopes", form) ?? []) as {
    scope: number;
    hours: number;
  }[];

  const getAvailableScopes = (index: number) =>
    Object.entries(EtiquetasAmbitosActividad)
      .map(([value, label]) => ({ value: +value, label }))
      .filter(
        ({ value }) =>
          !selectedScopes.some(
            (selectedScope, i) => selectedScope.scope === value && index !== i
          )
      );

  const [, getUsersByRoles] = useGetUsersByRoles();

  const fetchUsersByRoles = async (
    roles: Role[],
    keyWords: string,
    fetchFunc: RefetchFunction<any, Pagination<SimpleUserResponse>>
  ) => {
    const { data } = await fetchFunc({
      params: {
        Query: keyWords,
        ...roles.reduce(
          (acc, role, index) => ({ ...acc, [`Role[${index}]`]: role }),
          {}
        ),
        PageNumber: 1,
        PageSize: 20,
      },
    });
    return data.items.map((user) => ({
      value: user.id,
      label: `${user.names} / ${
        user.careerName ?? "Sin carrera"
      } / ${roleMapper(user.role)}`,
    }));
  };

  useEffect(() => {
    if (!isPending) {
      form.setFieldsValue({
        ...data,
        foreignCareersIds: data?.foreingCareers.map((fc) => fc.id),
        goals: data?.goals.map((goal) => ({ goal })),
        mainActivities: data?.mainActivities.map((activity) => ({ activity })),
        supervisorId: {
          value: data?.supervisor.id,
          label: `${data?.supervisor.names} /${roleMapper(
            data?.supervisor.role
          )}`,
        },
        coordinatorId: {
          value: data?.coordinator.id,
          label: `${data?.coordinator.names} ${data?.coordinator.lastnames}`,
        },
        careerId: data?.organizers
          ?.filter((o) => o?.career)
          .map((organizer) => organizer?.career?.id),
        organizationId: data?.organizers
          .filter((o) => o?.organization)
          ?.map((organizer) => organizer?.organization?.id),
        description: data?.description,
        scopes: data?.scopes.map((scope) => ({
          scope: scope.scope,
          hours: scope.hours,
        })),
      });
    }
  }, [data, form, isPending]);

  const statusToModify = [
    ActivityStatus.Published,
    ActivityStatus.Completed,
    ActivityStatus.InProgress,
    ActivityStatus.Approved,
  ];

  const isDisabled =
    statusToModify.includes(data?.activityStatus as ActivityStatus) ||
    user?.id !== data?.requestedBy?.id;

  const [tab, setTab] = useState("Actividad");

  return (
    <CustomPageContainer
      tabList={[
        {
          tab: "Actividad",
          key: "Actividad",
        },
        {
          tab: "Participantes",
          key: "aprticipantes",
        },
      ]}
      tabActiveKey={tab}
      onTabChange={(key) => setTab(key)}
      title={"Actualizar Actividad"}
      extra={[
        <>
          {data?.activityStatus &&
          statusToModify.includes(data?.activityStatus as ActivityStatus) ? (
            <PublishButton
              activityOwnerId={data?.requestedBy?.id}
              activityId={data?.id}
              hasBanner={!!data.bannerLink}
            />
          ) : null}
        </>,
        <Badge
          status="processing"
          text={activityStatusMapper(data?.activityStatus)}
        />,
        <Flex align="flex-end" gap={8} justify="center">
          {userRole === Role.VOAE &&
            data?.activityStatus === ActivityStatus.Pending && (
              <div className="mb-4">
                <Button
                  onClick={() => {
                    setIsRejectedAprove({ isRejected: false, isAprove: true });
                  }}
                  disabled={isLoadingAprobar}
                >
                  {isLoadingAprobar ? "Cargando..." : "Aprobar"}
                </Button>
              </div>
            )}

          {userRole === Role.VOAE &&
            data?.activityStatus === ActivityStatus.Pending && (
              <div className="mb-4">
                <Button
                  onClick={() => {
                    setIsRejectedAprove({ isRejected: true, isAprove: false });
                  }}
                  danger
                  disabled={isLoadingRechazar}
                >
                  {isLoadingRechazar ? "Cargando..." : "Rechazar"}
                </Button>
              </div>
            )}
        </Flex>,
      ]}
      loading={isPending}
    >
      {tab === "Actividad" && (
        <ProForm<UpdateActivityFormValues>
          onFinish={async (values) => {
            const careers: Organizer[] = values.careerId.map((careerId) => ({
              careerId,
              type: OrganizerType.Career,
            }));

            const organizations: Organizer[] = values.organizationId.map(
              (organizationId) => ({
                organizationId,
                type: OrganizerType.Organization,
              })
            );

            const dto = {
              ...values,
              supervisorId: values.supervisorId.value,
              coordinatorId: values.coordinatorId.value,
              foreignCareersIds: values.foreignCareersIds,
              goals: values.goals.map((goal) => goal.goal),
              mainActivities: values.mainActivities.map(
                (activity) => activity.activity
              ),
              organizers: [...careers, ...organizations],
              scopes: values.scopes.map((scope) => ({
                scope: scope.scope,
                hours: scope.hours,
              })),
            } as UpdateActivityRequest;
            await handleSubmit(dto);
          }}
          // dateFormatter={false}
          submitter={{
            searchConfig: {
              submitText: "Actualizar Actividad",
              resetText: "Limpiar",
            },
            resetButtonProps: {
              disabled: isPending,
            },
            render(_props, dom) {
              if (isDisabled) {
                return null;
              }
              return dom;
            },
          }}
          loading={isPending}
          form={form}
          disabled={isDisabled}
         >
          <Image width={200} src={data?.bannerLink} className="mb-4" />
          <ProFormText
            name="name"
            label="Nombre Actividad"
            placeholder="Ingrese el nombre de la actividad"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          />
          <ProFormTextArea
            name="description"
            label="Descripción"
            placeholder="Describa la actividad"
            rules={[
              { required: true, message: "La descripción es obligatoria" },
              {
                min: 4,
                message: "Debe tener al menos 4 caracteres de largo",
              },
            ]}
          />
          <ProFormSelect
            name="foreignCareersIds"
            label="Carreras admitidas"
            mode="multiple"
            request={async () => {
              const response = await obtenerTodasLasCarreras();
              return response.map((carrera) => ({
                value: carrera.id,
                label: carrera.name,
              }));
            }}
            rules={[
              { required: true, message: "Debe seleccionar al menos una" },
            ]}
            placeholder="Seleccione las carreras"
          />
          <ProFormGroup>
            <ProFormDatePicker
              name="startDate"
              label="Fecha de inicio"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar la fecha de inicio",
                },
                {
                  type: "date",
                  validator: async (_, value) => {
                    const v =
                      typeof value === "string" ? daysify(value) : value;
                    console.log(v, value);

                    const isBefore = v.isBefore(daysify());

                    if (isBefore) {
                      throw new Error(
                        "La fecha de inicio debe ser después de la fecha actual"
                      );
                    }
                  },
                },
              ]}
              fieldProps={{
                format: (value) => (value ? value.format(dateFormat) : ""),
                showTime: true,
              }}
            />

            <ProFormDatePicker
              name="endDate"
              label="Fecha de finalización"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar la fecha de finalización",
                },
                {
                  validator: async (_, value) => {
                    const v =
                      typeof value === "string" ? daysify(value) : value;

                    const isBefore = v.isAfter(
                      daysify(form.getFieldValue("startDate"))
                    );

                    if (!isBefore) {
                      throw new Error(
                        "La fecha de finalización debe ser después de la fecha de inicio"
                      );
                    }
                  },
                },
              ]}
              fieldProps={{
                format: (value) => (value ? value.format(dateFormat) : ""),
                showTime: true,
              }}
            />
          </ProFormGroup>
          <ProFormList
            name="goals"
            label="Objetivos"
            creatorButtonProps={{
              position: "bottom",
              creatorButtonText: "Agregar Objetivo",
            }}
            rules={[
              {
                required: true,
                message: "Debe agregar al menos un objetivo",
                validator: async (_, value) => {
                  if (value.length === 0) {
                    return Promise.reject(
                      new Error("Debe agregar al menos un objetivo")
                    );
                  }
                },
              },
            ]}
          >
            <ProFormText
              name="goal"
              placeholder="Ingrese un objetivo"
              rules={[{ required: true }]}
            />
          </ProFormList>
          <ProFormDigit
            name="totalSpots"
            label="Cupos Totales"
            placeholder="Ingrese el número de cupos"
            min={1}
            rules={[{ required: true }]}
          />
          <ProFormText
            name="location"
            label="Ubicación"
            placeholder="Ingrese la ubicación"
            rules={[
              { required: true },
              {
                min: 4,
                message: "Debe tener al menos 4 caracteres de largo",
              },
            ]}
          />
          <ProFormList
            name="mainActivities"
            label="Actividades Principales"
            creatorButtonProps={{
              position: "bottom",
              creatorButtonText: "Agregar Actividad",
            }}
            rules={[
              {
                required: true,
                message: "Debe agregar al menos una actividad",
                validator: async (_, value) => {
                  if (value.length === 0) {
                    return Promise.reject(
                      new Error("Debe agregar al menos una actividad")
                    );
                  }
                },
              },
            ]}
          >
            <ProFormText
              name="activity"
              placeholder="Ingrese una actividad"
              rules={[{ required: true }]}
            />
          </ProFormList>
          <ProFormList
            name="scopes"
            label="Ámbitos"
            creatorButtonProps={{
              position: "bottom",
              creatorButtonText: "Agregar Ámbito",
              disabled: selectedScopes.length === 5 || isDisabled,
            }}
            deleteIconProps={{ tooltipText: "Eliminar" }}
            copyIconProps={{ tooltipText: "Copiar" }}
            rules={[
              {
                required: true,
                message: "Debe agregar al menos un ámbito",
                validator: async (_, value) => {
                  if (value.length === 0) {
                    return Promise.reject(
                      new Error("Debe agregar al menos un ámbito")
                    );
                  }
                },
              },
            ]}
          >
            {(_, index) => {
              const availableScopes = getAvailableScopes(index);

              return (
                <ProFormGroup>
                  <ProFormSelect
                    name={"scope"}
                    label="Ámbito"
                    options={availableScopes}
                    placeholder="Seleccione el ámbito"
                    rules={[{ required: true }]}
                    width="md"
                  />
                  <ProFormDigit
                    name={"hours"}
                    label="Horas"
                    placeholder="Ingrese el número de horas"
                    min={1}
                    rules={[
                      { required: true },
                      {
                        type: "number",
                        min: 1,
                        message: "Debe ser mayor a 0",
                      },
                    ]}
                    width="sm"
                  />
                </ProFormGroup>
              );
            }}
          </ProFormList>
          <Divider>Organizadores</Divider>
          <ProFormSelect
            name="careerId"
            label="Carrera"
            request={async () => {
              const response = await obtenerTodasLasCarreras();
              return response.map((carrera) => ({
                value: carrera.id,
                label: carrera.name,
              }));
            }}
            mode="multiple"
            placeholder="Seleccione una carrera"
            rules={[
              {
                //es requerida si no se ah seleccionado una organizacion
                validator: async (_, value) => {
                  const organizationId = form.getFieldValue("organizationId");
                  if (organizationId.length === 0 && value.length === 0) {
                    return Promise.reject(
                      new Error("Debe seleccionar al menos una carrera")
                    );
                  }
                },
              },
            ]}
          />
          <ProFormSelect
            name="organizationId"
            label="Organización"
            request={async () => {
              const response = await obtenerLasOrganizaciones();
              return response.map((org) => ({
                value: org.id,
                label: org.name,
              }));
            }}
            mode="multiple"
            placeholder="Seleccione una organización"
            rules={[
              {
                validator: async (_, value) => {
                  const careerId = form.getFieldValue("careerId");
                  if (careerId.length === 0 && value.length === 0) {
                    return Promise.reject(
                      new Error("Debe seleccionar al menos una organización")
                    );
                  }
                },
              },
            ]}
          />
          <ProFormSelect.SearchSelect
            name="supervisorId"
            label="Catedrático (Supervisor)"
            request={async ({ keyWords }) =>
              fetchUsersByRoles(
                [Role.TEACHER, Role.VOAE],
                keyWords,
                getUsersByRoles
              )
            }
            debounceTime={500}
            mode="single"
            help="Puede buscar por nombre o correo"
            placeholder="Seleccione un catedrático"
            rules={[{ required: true }]}
          />
          <ProFormSelect.SearchSelect
            name="coordinatorId"
            mode="single"
            help="Puede buscar por nombre o correo"
            label="Encargado de la Actividad (Estudiante/Coordinador)"
            request={async ({ keyWords }) =>
              fetchUsersByRoles([Role.STUDENT], keyWords, getUsersByRoles)
            }
            valuePropName="value"
            debounceTime={500}
            placeholder="Seleccione un encargado"
            rules={[{ required: true, message: "El encargado es obligatorio" }]}
          />
        </ProForm>
      )}
      {tab === "aprticipantes" && <MembersTable members={data?.members} />}
      <ModalForm
        open={isRejectedAprove.isAprove || isRejectedAprove.isRejected}
        onFinish={async ({ observation }) => {
          if (isRejectedAprove.isAprove) {
            await botonAprobar(observation);
          } else {
            await botonRechazar(observation);
          }
        }}
        modalProps={{
          destroyOnClose: true,
          onCancel: () =>
            setIsRejectedAprove({ isRejected: false, isAprove: false }),
          title: isRejectedAprove.isAprove
            ? "Aprobar Actividad"
            : "Rechazar Actividad",
        }}
      >
        <ProFormTextArea name="observation" label="Observación" />
      </ModalForm>
    </CustomPageContainer>
  );
};

export default ActualizarActividad;
