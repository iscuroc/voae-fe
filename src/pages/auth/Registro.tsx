import { registerAction } from "@/api/servicios/auth.services";
import { EmailInput } from "@/components/auth/email-input-component";
import { LoginBase } from "@/components/auth/login-base";
import {
  getErrorData,
  getFirstErrorDescription,
  getTranslatedError,
} from "@/utils/errors.util";
import { showAlert } from "@/utils/show-error-toast";
import { LoginForm } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const successMessages =
  "El correo se ha enviado correctamente. Verifica tu bandeja de entrada o SPAM.";

const Registro: React.FC = () => {
  const [form] = useForm<{ email: string }>();

  const {
    mutate: signupMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await registerAction(email);
      return response;
    },
    onSuccess() {
      showAlert(successMessages, {
        type: "success",
      });
    },
    onError(error) {
      const errorMessage = getFirstErrorDescription(
        getErrorData(error)?.errors
      );

      form.setFields([
        {
          name: "email",
          errors: [getTranslatedError(errorMessage)],
        },
      ]);
    },
  });

  useEffect(() => {
    document.title = "Registro - UNAH COPAN";
  }, []);

  const navigate = useNavigate();

  return (
    <LoginBase>
      <LoginForm<{ email: string }>
        title="Registro"
        form={form}
        submitter={{
          submitButtonProps: {
            className: "w-full",
            size: "middle",
            loading: isPending,
          },
          searchConfig: {
            submitText: "Regístrate",
          },
        }}
        onFinish={signupMutation}
        actions={[
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="text-sm text-blue-900 hover:underline hover:cursor-pointer"
          >
            ¿Ya tienes una cuenta? Iniciar Sesión
          </span>,
          <br />,
          isSuccess ? (
            <span className="text-sm text-green-900">{successMessages}</span>
          ) : null,
        ]}
      >
        <EmailInput />
      </LoginForm>
    </LoginBase>
  );
};

export default Registro;
