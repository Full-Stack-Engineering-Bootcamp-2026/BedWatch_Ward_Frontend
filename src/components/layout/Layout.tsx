import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          <Navbar />

          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
