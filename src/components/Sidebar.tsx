/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  coordinadorRoutes,
  estudianteRoutes,
  voaeRoutes,
} from "@/api/routesConfig";
import { Role, roleMapper, User } from "@/api/servicios/usuarios";
import logoCuroc from "@/assets/logoCuroc.avif";
import { siderToken } from "@/globals/theme";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Dropdown, theme } from "antd";
import React, { ReactNode } from "react";
import { CiUser } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../api/useAuth";
import { FaRegCalendarAlt } from "react-icons/fa";

const { useToken } = theme;

const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getRoutesByRole = (user?: User) => {
    if (!user) return {};
    const roleRoutes: Record<Role, Record<string, string>> = {
      [Role.STUDENT]: estudianteRoutes,
      [Role.TEACHER]: coordinadorRoutes,
      [Role.VOAE]: voaeRoutes,
    };

    return roleRoutes[user.role as Role];
  };

  const routes = getRoutesByRole(user);
  const maappedRoutes = Object.entries(routes).map(([name, path]) => ({
    path,
    name,
    icon: <LuLayoutDashboard />,
  }));
  const { token } = useToken();

  return (
    <ProLayout
      menuProps={{
        onSelect: (e) => {
          navigate(e.key);
        },
      }}
      logo={logoCuroc}
      title="UNAH COPAN"
      token={{
        colorPrimary: token.colorPrimary,
        sider: siderToken,
        header: {
          colorBgHeader: siderToken.colorMenuBackground,
          colorHeaderTitle: siderToken.colorTextMenuTitle,
          colorTextMenu: siderToken.colorTextMenu,
        },
        bgLayout: "#fff",
      }}
      route={{
        path: "/",
        children: [
          ...maappedRoutes,
          {
            path: "/calendario",
            name: "Calendario",
            icon: <FaRegCalendarAlt />,
          },
        ],
      }}
      location={{
        pathname: location.pathname,
      }}
      siderWidth={256}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        size: "small",
        title: user?.names + " " + roleMapper(user?.role),
        render: (_props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    label: "Perfil",
                    icon: <CiUser />,
                    key: "perfil",
                    onClick: () => navigate("/perfil"),
                  },
                  {
                    key: "logout",
                    icon: <IoLogOutOutline />,
                    label: "Cerrar sesión",
                    onClick: () => logout(),
                  },
                ],
              }}
              className="w-full"
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      contentWidth={"Fixed"}
    >
      {children}
    </ProLayout>
  );
};

export default Sidebar;
