import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { NavLink, useNavigate } from "react-router-dom";

import {
  MdOutlineDashboard,
  MdOutlineBed,
  MdOutlineWheelchairPickup,
} from "react-icons/md";

import TransferPatientDialog from "../components/TransferPatientDialog";

type SidebarProps = {
  open: boolean;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const menu = [
  {
    name: "Dashboard",
    icon: MdOutlineDashboard,
    path: "/staff-dashboard",
  },

  {
    name: "Ward Control",
    icon: MdOutlineBed,
    path: "/staff/discharge",
  },

  // {
  //   name: "Patient Transfer",
  //   icon: MdOutlineWheelchairPickup,
  //   path: "#",
  // },
];

export default function AppSidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate();

  // ADD THIS
  const [transferOpen, setTransferOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <Sidebar
        collapsible="none"
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-[260px] bg-[#FAFAFA] border-r transition-transform duration-300 ease-in-out shrink-0",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static",
        )}
      >
        <SidebarContent className="p-0 ">
          <div className="lg:hidden flex items-center justify-between p-5 border-b h-[61px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1E40AF] rounded-md flex items-center justify-center shrink-0">
                <MdOutlineBed className="text-white text-xl" />
              </div>

              <div className="flex flex-col leading-tight">
                <h2 className="text-xl font-bold text-[#00288E]">BedWatch</h2>

                <p className="text-[11px] text-muted-foreground tracking-wide">
                  Operational Control
                </p>
              </div>
            </div>
          </div>

          <div className="px-3 py-4 space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarGroup key={item.name}>
                  <SidebarMenuItem className="list-none">
                    <SidebarMenuButton asChild>
                      {item.name === "Patient Transfer" ? (
                        <>
                          <button
                            onClick={() => setTransferOpen(true)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-gray-600 hover:bg-gray-100 hover:text-black",
                            )}
                          >
                            <Icon size={20} />

                            <span>{item.name}</span>
                          </button>

                          <TransferPatientDialog
                            open={transferOpen}
                            onOpenChange={setTransferOpen}
                            patientId={0}
                            patientName=""
                            currentWardId={0}
                            currentWardName=""
                            currentBedId={0}
                            currentBedNumber=""
                          />
                        </>
                      ) : (
                        <NavLink to={item.path} onClick={() => setOpen(false)}>
                          {({ isActive }) => (
                            <div
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full",
                                isActive
                                  ? "bg-[#00288E] text-white"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-black",
                              )}
                            >
                              <Icon size={20} />

                              <span>{item.name}</span>
                            </div>
                          )}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroup>
              );
            })}

            <SidebarGroup>
              <SidebarMenuItem className="list-none">
                <SidebarMenuButton asChild>
                  <Button
                    onClick={() => navigate("/staff/admit")}
                    className="mt-5 w-full h-[44px] bg-[#00288E] text-white rounded-[4px] text-sm hover:bg-[#18379c]"
                  >
                    + New Admission
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>
          </div>
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>
    </>
  );
}
