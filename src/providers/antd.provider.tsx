import { token } from "@/globals/theme";
import { ProConfigProvider, esESIntl } from "@ant-design/pro-provider";
import { ConfigProvider } from "antd";
import esEs from "antd/locale/es_ES";
import { PropsWithChildren } from "react";

export const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: token,
      }}
      locale={esEs}
    >
      <ProConfigProvider token={token} intl={esESIntl}>
        {children}
      </ProConfigProvider>
    </ConfigProvider>
  );
};
