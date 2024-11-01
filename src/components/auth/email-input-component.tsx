import {
  ProFieldProps,
  ProFormItemProps,
  ProFormText,
} from "@ant-design/pro-components";
import { FC } from "react";
import { TiUserOutline } from "react-icons/ti";

type EmailInputProps = ProFormItemProps<ProFieldProps>;

export const EmailInput: FC<Partial<EmailInputProps>> = (props) => (
  <ProFormText
    fieldProps={{
      size: "large",
      prefix: <TiUserOutline className={"prefixIcon"} />,
      ...props.fieldProps,
    }}
    label="Correo"
    name="email"
    placeholder="ejemplo@unah.hn"
    hasFeedback
    {...props}
    rules={[
      {
        type: "email",
        message: "Por favor ingrese un correo válido",
      },
      {
        required: true,
        message: "Por favor ingrese su correo",
      },
      //el correo dbe ser de la unah unah.hn o unah.edu.hn o parecidos
      {
        pattern: /^[\w-\.]+@(unah\.edu\.hn|unah\.hn)$/,
        message:
          "Por favor ingrese un correo de la UNAH @unah.hn o @unah.edu.hn",
      },
    ]}
  />
);
