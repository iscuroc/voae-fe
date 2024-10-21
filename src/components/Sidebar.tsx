/* eslint-disable @typescript-eslint/no-explicit-any */
import logoCuroc from "@/assets/logoCuroc.avif";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Flex, Typography, theme } from "antd";
import React, { ReactNode } from "react";
import { CiLogout, CiUser } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../api/useAuth";
import { Role, User } from "@/api/servicios/usuarios";
import {
  coordinadorRoutes,
  estudianteRoutes,
  voaeRoutes,
} from "@/api/routesConfig";

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
  const { token, theme } = useToken();
  const customThemeVariations = [
    {
      name: "Ocean Blue",
      colorPrimary: "#004c8b",
      colorMenuBackground: "#1967b1",
      colorTextMenuTitle: "#b3dae7",
      colorMenuItemDivider: "#d1f4ff",
      colorTextMenu: "#ffffff",
      colorTextMenuSecondary: "#66a3c7",
      colorTextMenuSelected: "#003b74",
      colorTextMenuActive: "#66a3c7",
      colorTextMenuItemHover: "#ccf2ff",
      colorBgMenuItemActive: "#004c8b",
      colorBgMenuItemHover: "#004c8b",
      colorBgMenuItemSelected: "#ebb730",
      colorBgMenuItemCollapsedElevated: "#00396b",
      colorBgCollapsedButton: "#002e4f",
      colorTextCollapsedButton: "#66a3c7",
      colorTextCollapsedButtonHover: "#ccf2ff",
    },
    {
      name: "Ocean Blue",
      colorPrimary: "#0b66ac",
      colorMenuBackground: "#2a75b3",
      colorTextMenuTitle: "#ffffff",
      colorMenuItemDivider: "#1565c0",
      colorTextMenu: "#ffffff",
      colorTextMenuSecondary: "#f7dd72",
      colorTextMenuSelected: "#ffd700",
      colorTextMenuActive: "#ffffff",
      colorTextMenuItemHover: "#ffd700",
      colorBgMenuItemActive: "#ffd700",
      colorBgMenuItemHover: "#f7dd72",
      colorBgMenuItemSelected: "#f7dd72",
      colorBgMenuItemCollapsedElevated: "#2a75b3",
      colorBgCollapsedButton: "#0b66ac",
      colorTextCollapsedButton: "#ffffff",
      colorTextCollapsedButtonHover: "#ffd700",
    },
    {
      name: "Twilight Blue",
      colorPrimary: "#0b66ac",
      colorMenuBackground: "#2a75b3",
      colorTextMenuTitle: "#ffffff",
      colorMenuItemDivider: "#1565c0",
      colorTextMenu: "#ffffff",
      colorTextMenuSecondary: "#f7dd72",
      colorTextMenuSelected: "#ffd700",
      colorTextMenuActive: "#ffffff",
      colorTextMenuItemHover: "#ffd700",
      colorBgMenuItemActive: "#ffd700",
      colorBgMenuItemHover: "#f7dd72",
      colorBgMenuItemSelected: "#f7dd72",
      colorBgMenuItemCollapsedElevated: "#2a75b3",
      colorBgCollapsedButton: "#0b66ac",
      colorTextCollapsedButton: "#ffffff",
      colorTextCollapsedButtonHover: "#ffd700",
    },
    {
      name: "Skyline Blue",
      colorPrimary: "#0b66ac",
      colorMenuBackground: "#2a75b3",
      colorTextMenuTitle: "#ffffff",
      colorMenuItemDivider: "#1565c0",
      colorTextMenu: "#ffffff",
      colorTextMenuSecondary: "#f7dd72",
      colorTextMenuSelected: "#ffd700",
      colorTextMenuActive: "#ffffff",
      colorTextMenuItemHover: "#ffd700",
      colorBgMenuItemActive: "#ffd700",
      colorBgMenuItemHover: "#f7dd72",
      colorBgMenuItemSelected: "#f7dd72",
      colorBgMenuItemCollapsedElevated: "#2a75b3",
      colorBgCollapsedButton: "#0b66ac",
      colorTextCollapsedButton: "#ffffff",
      colorTextCollapsedButtonHover: "#ffd700",
    },
    {
      name: "Deep Sea",
      colorPrimary: "#0b66ac",
      colorMenuBackground: "#2a75b3",
      colorTextMenuTitle: "#ffffff",
      colorMenuItemDivider: "#1565c0",
      colorTextMenu: "#ffffff",
      colorTextMenuSecondary: "#f7dd72",
      colorTextMenuSelected: "#ffd700",
      colorTextMenuActive: "#ffffff",
      colorTextMenuItemHover: "#ffd700",
      colorBgMenuItemActive: "#ffd700",
      colorBgMenuItemHover: "#f7dd72",
      colorBgMenuItemSelected: "#f7dd72",
      colorBgMenuItemCollapsedElevated: "#2a75b3",
      colorBgCollapsedButton: "#0b66ac",
      colorTextCollapsedButton: "#ffffff",
      colorTextCollapsedButtonHover: "#ffd700",
    },
    {
      name: "Arctic Blue",
      colorPrimary: "#0b66ac",
      colorMenuBackground: "#2a75b3",
      colorTextMenuTitle: "#ffffff",
      colorMenuItemDivider: "#1565c0",
      colorTextMenu: "#ffffff",
      colorTextMenuSecondary: "#f7dd72",
      colorTextMenuSelected: "#ffd700",
      colorTextMenuActive: "#ffffff",
      colorTextMenuItemHover: "#ffd700",
      colorBgMenuItemActive: "#ffd700",
      colorBgMenuItemHover: "#f7dd72",
      colorBgMenuItemSelected: "#f7dd72",
      colorBgMenuItemCollapsedElevated: "#2a75b3",
      colorBgCollapsedButton: "#0b66ac",
      colorTextCollapsedButton: "#ffffff",
      colorTextCollapsedButtonHover: "#ffd700",
    },
  ];

  return (
    <div style={{ height: "100dvh" }}>
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
          sider: {
            colorMenuBackground: "#1967b1",
            colorTextMenuTitle: "#ffffff",
            colorMenuItemDivider: "#ffffff",
            colorTextMenu: "#ffffff",
            colorTextMenuSecondary: "#66a3c7",
            colorTextMenuSelected: "#003b74",
            colorTextMenuActive: "#ffffff",
            colorTextMenuItemHover: "#ffffff",
            colorBgMenuItemActive: "#004c8b",
            colorBgMenuItemHover: "#004c8b",
            colorBgMenuItemSelected: "#ebb730",
            colorBgMenuItemCollapsedElevated: "#0e4a98",
            colorBgCollapsedButton: "#ffffff",
            colorTextCollapsedButton: "#0e4a98",
            colorTextCollapsedButtonHover: "#0e4a98",
            colorTextSubMenuSelected: "#ffffff",
          },
          bgLayout: "#f0f2f5",
        }}
        route={{
          path: "/",
          children: maappedRoutes,
        }}
        location={{
          pathname: location.pathname,
        }}
        menuFooterRender={() => (
          <Dropdown
            trigger={["click"]}
            placement="topRight"
            menu={{
              items: [
                {
                  label: "Perfil",
                  icon: <CiUser />,
                  key: "perfil",
                  onClick: () => navigate("/perfil"),
                },
                {
                  type: "divider",
                },
                {
                  label: "Cerrar sesión",
                  icon: <CiLogout />,
                  key: "logout",
                  onClick: logout,
                },
              ],
              style: {
                borderRadius: "10px",
              },
            }}
          >
            <Flex style={{ marginTop: "100%" }} justify="center" align="center">
              <Typography.Title level={4} style={{ cursor: "pointer" }}>
                Menú
              </Typography.Title>
            </Flex>
          </Dropdown>
        )}
        // menuDataRender={(menuData) =>
        //   menuData.filter((item) => location.pathname.includes(item.path))
        // }
      >
        {children}
      </ProLayout>
    </div>
  );
};

export default Sidebar;
