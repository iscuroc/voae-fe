import { ProConfigProvider, esESIntl } from "@ant-design/pro-provider";
import { ConfigProvider } from "antd";
import esEs from "antd/locale/es_ES";
import { PropsWithChildren } from "react";

export const token = {
  colorPrimary: "#1967b1",
};

export const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: token,
      }}
      locale={esEs}
    >
      {children}
    </ConfigProvider>
  );
};
