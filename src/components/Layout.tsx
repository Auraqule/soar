import { Outlet } from "react-router";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import Header from "./Header";

const Layout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {isMobile ? <MobileHeader /> : <Header />}
        <main className="flex-1 overflow-y-auto bg-[#F5F7FA] p-2 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
