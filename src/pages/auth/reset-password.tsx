/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LoginBase } from "@/components/auth/login-base";
import {
  PasswordInfo,
  PasswordInputComponent,
  validateStrongPassword,
} from "@/components/auth/password-input-component";
import { ProForm } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { message, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";
import axiosInstance from "../../api/axiosInstance";

interface FormData {
  password: string;
  passwordConfirmation: string;
  resetToken: string;
}

const ResetPassword: React.FC = () => {
  useEffect(() => {
    document.title = "Restablecer Contraseña - UNAH COPAN";
  }, []);
  useDocumentTitle("Restablecer Contraseña - UNAH COPAN");

  const navigate = useNavigate();

  const { mutateAsync: resetPasswordMutation, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const urlParams = new URLSearchParams(window.location.search);

      const token = urlParams.get("token");

      if (!token) {
        return Promise.reject("Token no encontrado en la url.");
      }

      formData.resetToken = token as string;
      await axiosInstance.post("/auth/reset-password", formData);
    },
    onSuccess: () => {
      navigate("/login");
      message.success("Contraseña restablecida exitosamente.");
    },
    onError: (e: string) => {
      console.log(e);

      message.error(e ?? "Error al restablecer la contraseña.");
    },
  });

  return (
    <>
      <LoginBase>
        <ProForm<FormData>
          title="Restablecer Contraseña"
          className="w-[400px] p-8"
          onFinish={(data) => {
            resetPasswordMutation(data);
          }}
          submitter={{
            submitButtonProps: {
              className: "w-full",
              size: "middle",
              loading: isPending,
            },
            searchConfig: {
              submitText: "Restablecer",
            },
            render(_props, dom) {
              return dom.pop();
            },
          }}
        >
          <Typography.Title level={3}>Restablecer contraseña</Typography.Title>

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
    </>
  );
};

export default ResetPassword;
