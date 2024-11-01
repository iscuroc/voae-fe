import { forgotPasswordAction } from "@/api/servicios/auth.services";
import { EmailInput } from "@/components/auth/email-input-component";
import { LoginBase } from "@/components/auth/login-base";
import {
  getErrorData,
  getFirstErrorDescription,
  getTranslatedError,
} from "@/utils/errors.util";
import { LoginForm } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const successMessages =
  "El correo para recuperar la contraseña se ha enviado correctamente. Verifica tu bandeja de entrada o SPAM.";

const ForgotPassword: React.FC = () => {
  const [form] = useForm<{ email: string }>();

  useEffect(() => {
    document.title = "Recuperar Contraseña - UNAH COPAN";
  }, []);

  const {
    mutate: forgotPasswordMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await forgotPasswordAction(email);
      return response;
    },

    onError(error) {
      const errorMessage = getFirstErrorDescription(
        getErrorData(error)?.errors
      );
      if (errorMessage?.isUnexpectedError) return;

      form.setFields([
        {
          name: "email",
          errors: [getTranslatedError(errorMessage)],
        },
      ]);
    },
  });

  const navigate = useNavigate();

  return (
    <LoginBase>
      <LoginForm<{ email: string }>
        title="Recuperar Contraseña"
        form={form}
        submitter={{
          submitButtonProps: {
            className: "w-full",
            size: "middle",
            loading: isPending,
          },
          searchConfig: {
            submitText: "Enviar Correo",
          },
        }}
        onFinish={forgotPasswordMutation}
        actions={[
          isSuccess ? (
            <span className="text-sm text-green-900">{successMessages}</span>
          ) : null,
          <br />,
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="text-sm text-blue-900 hover:underline hover:cursor-pointer"
          >
            ¿Ya tienes una cuenta? Iniciar Sesión
          </span>,
        ]}
      >
        <div className="mt-2">
          <EmailInput />
        </div>
      </LoginForm>
    </LoginBase>
  );
};

export default ForgotPassword;
