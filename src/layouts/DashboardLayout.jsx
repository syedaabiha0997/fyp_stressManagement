import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Remains fixed on the left */}
      <Sidebar />

      {/* Main content area - Content scrolls here */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-4 md:p-8">
           <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;