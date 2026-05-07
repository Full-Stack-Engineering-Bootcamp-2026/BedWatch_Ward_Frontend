import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="flex flex-1 overflow-hidden ">
          <AppSidebar />

          <div className="flex flex-col flex-1 overflow-y-auto">
            <main className=" bg-gray-50 pl-8 ">
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
