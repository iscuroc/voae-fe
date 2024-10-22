import useAuth from "@/api/useAuth";
import Loading from "@/components/Loading";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AuthLayout() {
  const { loading, user } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <Loading />;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}
