/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    coordinadorRoutes,
    estudianteRoutes,
    voaeRoutes,
} from "@/api/routesConfig";
import {Role, roleMapper, User} from "@/api/servicios/usuarios";
import logoCuroc from "@/assets/logoCuroc.avif";
import {siderToken} from "@/globals/theme";
import {ProLayout} from "@ant-design/pro-components";
import {Dropdown, theme} from "antd";
import React, {ReactNode} from "react";
import {CircleUserRound} from "lucide-react";
import {FaRegCalendarAlt} from "react-icons/fa";
import {LogOut} from "lucide-react";
import {UserRoundCog} from "lucide-react";
import {LuLayoutDashboard} from "react-icons/lu";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../api/useAuth";

const {useToken} = theme;

const Sidebar: React.FC<{ children: ReactNode }> = ({children}) => {
    const {user, logout} = useAuth();
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
        icon: <LuLayoutDashboard/>,
    }));
    const {token} = useToken();

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
                        icon: <FaRegCalendarAlt/>,
                    },
                ],
            }}
            location={{
                pathname: location.pathname,
            }}
            siderWidth={256}
            avatarProps={{
                src: <CircleUserRound />,
                size: "small",
                title: user?.names + " " + roleMapper(user?.role),
                render: (_props, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        label: "Perfil",
                                        icon: <UserRoundCog size={16}/>,
                                        key: "perfil",
                                        onClick: () => navigate("/perfil"),
                                    },
                                    {
                                        key: "logout",
                                        icon: <LogOut size={16}/>,
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
