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
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Divider } from "antd";
import { RefetchFunction } from "axios-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { obtenerActividadesPorNombre, UpdateActivityRequest } from "@/api/servicios/actividades";
import {
  Organizer,
  OrganizerType,
  updateActividad,
} from "@/api/servicios/actividadPost";
import { obtenerTodasLasCarreras } from "@/api/servicios/carreras";
import { obtenerLasOrganizaciones } from "@/api/servicios/organizaciones";
import { useQuery } from "@tanstack/react-query";
import { UpdateActivityFormValues } from "./update-activity.types";
import { Scope } from "../CreateActivity/types";

const dateFormat = "DD/MM/YYYY HH:mm";

const ActualizarActividad = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [form] = ProForm.useForm();

  const { data, isPending } = useQuery({
    queryKey: ["Activity"],
    queryFn: obtenerActividadesPorNombre,
  });

  const handleSubmit = async (values: UpdateActivityRequest) => {
    const formatedStartDate = daysify(
      values.startDate,
      dateFormat
    ).toISOString();
    const formatedEndDate = daysify(values.endDate, dateFormat).toISOString();

    try {
      await updateActividad(1, {
        ...values,
        startDate: formatedStartDate,
        endDate: formatedEndDate,
      });
      toast.success("La actividad se actualizó con éxito.");
      navigate("/actividades");
    } catch (e) {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">
          Actualizar Actividad
        </h1>
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
                scope: +scope.scope,
                hours: scope.hours,
              })) as Scope[],
            } as UpdateActivityRequest;
            await handleSubmit(dto);
          }}
          dateFormatter={"string"}
          submitter={{
            searchConfig: {
              submitText: "Actualizar Actividad",
              resetText: "Limpiar",
            },
            resetButtonProps: {
              disabled: isLoading,
            },
          }}
          loading={isPending}
          form={form}
        >
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
              { min: 4, message: "Debe tener al menos 4 caracteres de largo" },
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
              { min: 4, message: "Debe tener al menos 4 caracteres de largo" },
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
              disabled: selectedScopes.length === 5,
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
                      { type: "number", min: 1, message: "Debe ser mayor a 0" },
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
            rules={[{ required: true }]}
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
            rules={[{ required: true }]}
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
      </div>
    </div>
  );
};

export default ActualizarActividad;
