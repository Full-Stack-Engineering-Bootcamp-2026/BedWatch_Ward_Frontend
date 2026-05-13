// import { SidebarProvider } from "../ui/sidebar";
// import AppSidebar from "./app-sidebar";
// import { Outlet } from "react-router-dom";
// import Navbar from "./navbar";
// import Footer from "./Footer";

// function StaffLayout() {
//   return (
//     <SidebarProvider>
//       <div className="flex flex-col h-screen w-full">
//         <div className="sticky top-0 z-50">
//           <Navbar />
//         </div>

//         <div className="flex flex-1 overflow-hidden ">
//           <AppSidebar />

//           <div className="flex flex-col flex-1 overflow-y-auto">
//             <main className=" bg-gray-50 pl-8 ">
//               <Outlet />
//             </main>

//             <Footer />
//           </div>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

// export default StaffLayout1;

import { useState } from "react";

import { SidebarProvider } from "../ui/sidebar";

import AppSidebar from "./app-sidebar";

import { Outlet } from "react-router-dom";

import Navbar from "./navbar";

import Footer from "./Footer";

function StaffLayout() {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider className="bg-[#f4f1f8]">
      <div className="flex flex-col h-screen w-full ">
        <div className="sticky top-0 z-50">
          <Navbar setOpen={setOpen} />{" "}
        </div>

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar open={open} setOpen={setOpen} />

          <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 px-6">
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default StaffLayout;
