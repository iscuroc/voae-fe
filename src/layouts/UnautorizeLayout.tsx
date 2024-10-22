import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function UnautorizeLayout() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 mt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
