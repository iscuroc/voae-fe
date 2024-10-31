import { ProFormItemProps, ProFormText, type ProFieldProps } from '@ant-design/pro-components';
import { FC } from 'react';

import type { Rule } from 'antd/es/form';
import { MdLockOutline } from 'react-icons/md';

type PasswordInputProps = ProFormItemProps<ProFieldProps>;

export const PasswordInputComponent: FC<Partial<PasswordInputProps>> = props => (
  <ProFormText.Password
    fieldProps={{
      size: 'large',
      prefix: <MdLockOutline className={'prefixIcon'} />,
      ...props.fieldProps,
    }}
    name='password'
    label='Contraseña'
    placeholder='Ingresa tu contraseña'
    {...props}
  />
);

export const validateStrongPassword: Rule[] = [
  {
    min: 8,
    message: 'La contraseña debe de tener al menos 8 caracteres',
  },
  {
    pattern: /^(?=.*\d)/,
    message: 'La contraseña debe contener al menos un número',
  },
  {
    pattern: /^(?=.*[@$!%^*?&])/,
    message: 'La contraseña debe contener al menos un caracter especial',
  },
  {
    pattern: /^(?=.*[A-Z])/,
    message: 'La contraseña debe contener al menos una letra mayúscula',
  },
];

export const PasswordInfo = () => (
  <div>
    La contraseña debe contener:
    <ul
      style={{
        paddingLeft: '25px',
      }}
    >
      <li>8 caracteres</li>
      <li>Un número,</li>
      <li>Una letra mayúscula</li>
      <li>Caracter especial</li>
    </ul>
  </div>
);
