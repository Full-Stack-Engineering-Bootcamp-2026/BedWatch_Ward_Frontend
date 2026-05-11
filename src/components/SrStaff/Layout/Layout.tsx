import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AppSidebar from "./app.sidebar";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid h-screen bg-gray-50 lg:grid-cols-[260px_1fr]">
      <AppSidebar open={open} setOpen={setOpen} />

      <div className="flex flex-col min-w-0 h-screen">
        <Navbar setOpen={setOpen} />

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-5 md:px-6 lg:px-8">
            <Outlet />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Layout;
