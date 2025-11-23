import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex bg-[#FFF8F3]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 pl-4 pr-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
