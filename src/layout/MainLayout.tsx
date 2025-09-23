// src/layout/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="flex">
        {/* <SideNav></SideNav> */}
        {/* Main Page Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
