import { loginAction, LoginRequest } from "@/api/servicios/auth.services";
import useAuth from "@/api/useAuth";
import { EmailInput } from "@/components/auth/email-input-component";
import { LoginBase } from "@/components/auth/login-base";
import { PasswordInputComponent } from "@/components/auth/password-input-component";
import {
  getErrorData,
  getFirstErrorDescription,
  getTranslatedError,
} from "@/utils/errors.util";
import { showAlert } from "@/utils/show-error-toast";
import { LoginForm } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form] = useForm();

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await loginAction(data);
      return response;
    },
    onSuccess(data) {
      login(data.accessToken, data.role, data.email);
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

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.title = "Login - UNAH COPAN";
  }, []);

  const { user } = useAuth();

  if (user) {
    navigate("/dashboard");
  }

  return (
    <LoginBase>
      <LoginForm<LoginRequest>
        title="Login"
        form={form}
        onFinish={(data) => {
          loginMutation(data);
        }}
        loading={isPending}
        submitter={{
          submitButtonProps: {
            className: "w-full",
            size: "middle",
          },
          searchConfig: {
            submitText: "Iniciar sesión",
          },
        }}
        actions={
          <Space>
            <span
              onClick={() => {
                navigate("/registro");
              }}
              className="text-sm text-blue-900 hover:cursor-pointer hover:underline "
            >
              ¿No tienes una cuenta? Regístrate aquí
            </span>
            <span
              onClick={() => {
                navigate("/forgot-password");
              }}
              className="text-sm text-blue-900 hover:cursor-pointer hover:underline  "
            >
              ¿Has olvidado la contraseña? Recupérala
            </span>
          </Space>
        }
      >
        <EmailInput />
        <PasswordInputComponent
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor ingrese su contraseña",
            },
          ]}
        />
      </LoginForm>
    </LoginBase>
  );
};

export default Login;
