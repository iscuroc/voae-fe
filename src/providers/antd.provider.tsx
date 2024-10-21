import { ProConfigProvider, esESIntl } from "@ant-design/pro-provider";
import { ConfigProvider } from "antd";
import esEs from "antd/locale/es_ES";
import { PropsWithChildren } from "react";

export const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1e3a8a",
        },
      }}
      locale={esEs}
    >
      <ProConfigProvider intl={esESIntl}>{children}</ProConfigProvider>
    </ConfigProvider>
  );
};
