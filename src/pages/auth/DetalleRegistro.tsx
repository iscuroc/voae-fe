/* eslint-disable @typescript-eslint/ban-ts-comment */
import axiosInstance from "@/api/axiosInstance";
import { obtenerTodasLasCarreras } from "@/api/servicios/carreras";
import { obtenerLasOrganizaciones } from "@/api/servicios/organizaciones";
import { LoginBase } from "@/components/auth/login-base";
import {
  PasswordInfo,
  PasswordInputComponent,
  validateStrongPassword,
} from "@/components/auth/password-input-component";
import {
  getErrorData,
  getFirstErrorDescription,
  getTranslatedError,
} from "@/utils/errors.util";
import { showAlert } from "@/utils/show-error-toast";
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, message, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  names: string;
  lastnames: string;
  accountNumber: string;
  password: string;
  passwordConfirmation: string;
  emailConfirmationToken: string;
  careerId: number | string;
  organizationIds: number[];
}

const DetallesRegistro: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: organizations, isPending: loadingOrganizations } = useQuery({
    queryKey: ["organizaciones"],
    queryFn: obtenerLasOrganizaciones,
  });

  const { data: carreers, isPending: loadingCarreers } = useQuery({
    queryKey: ["carreras"],
    queryFn: obtenerTodasLasCarreras,
  });

  useEffect(() => {
    document.title = "Registro - UNAH COPAN";
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      form.setFieldValue("emailConfirmationToken", token);
    }
  }, []);

  const { mutateAsync: confirmAccountMutation, isPending: loadingConfirm } =
    useMutation({
      mutationFn: async (values: FormData) => {
        console.log(values);

        await axiosInstance.post("/auth/confirm", values);
      },
      onSuccess() {
        message.success(
          "Registro exitoso. Verifica tu bandeja de entrada o SPAM."
        );
        navigate("/login");
      },
      onError(error) {
        const errorMessage = getFirstErrorDescription(
          getErrorData(error)?.errors
        );

        showAlert(getTranslatedError(errorMessage), {
          type: "error",
        });
      },
    });

  return (
    <LoginBase>
      <ProForm
        title="Detalles de Registro"
        form={form}
        className="w-[400px] p-8"
        onFinish={(data) => {
          console.log(data);
          console.log(form.getFieldsError());

          confirmAccountMutation(data);
        }}
        submitter={{
          submitButtonProps: {
            className: "w-full",
            size: "middle",
            loading: loadingConfirm,
          },
          searchConfig: {
            submitText: "Finalizar Registro",
          },
          render(_props, dom) {
            return dom.pop();
          },
        }}
      >
        <Typography.Title level={3}>Detalles de Registro</Typography.Title>
        <ProFormText
          name="emailConfirmationToken"
          label="Token de confirmación"
          placeholder="Token de confirmación"
          hidden
        />
        <ProFormText
          name="names"
          label="Nombre"
          placeholder="Nombre"
          rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
        />
        <ProFormText
          name="lastnames"
          label="Apellidos"
          placeholder="Apellidos"
          rules={[
            { required: true, message: "Por favor ingrese sus apellidos" },
          ]}
        />
        <ProFormDigit
          name="accountNumber"
          label="Número de cuenta"
          placeholder="Número de cuenta"
          fieldProps={{
            controls: false,
          }}
          rules={[
            {
              required: true,
              message: "Por favor ingrese su número de cuenta",
            },
          ]}
        />
        <ProFormSelect
          name="careerId"
          label="Carrera"
          placeholder="Selecciona una carrera"
          options={carreers?.map((c) => ({ label: c.name, value: c.id }))}
          fieldProps={{
            dropdownStyle: {
              width: "430px",
            },
            loading: loadingCarreers,
          }}
          rules={[
            {
              validator(_rule, value) {
                const organizations =
                  form.getFieldValue("organizationIds")?.length;

                if (!organizations && !value) {
                  return Promise.reject(
                    "Por favor selecciona al menos una organización o una carrera"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        />
        <ProFormSelect
          name="organizationIds"
          label="Áreas (opcional para estudiantes)"
          placeholder="Selecciona una o más organizaciones"
          options={organizations?.map((org) => ({
            label: org.name,
            value: org.id,
          }))}
          fieldProps={{
            mode: "multiple",
            loading: loadingOrganizations,
          }}
          rules={[
            {
              validator(_rule, value) {
                const career = form.getFieldValue("careerId");
                if (!career && !value) {
                  return Promise.reject(
                    "Por favor selecciona al menos una organización o una carrera"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        />
        <PasswordInputComponent
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          rules={[...validateStrongPassword, { required: true }]}
          tooltip={<PasswordInfo />}
          fieldProps={{
            // @ts-ignore
            size: "middle",
          }}
        />
        <PasswordInputComponent
          name="passwordConfirmation"
          label="Confirmación de contraseña"
          placeholder="Confirmar contraseña"
          rules={[...validateStrongPassword, { required: true }]}
          tooltip={<PasswordInfo />}
          fieldProps={{
            // @ts-ignore
            size: "middle",
          }}
        />
      </ProForm>
    </LoginBase>
  );
};

export default DetallesRegistro;
