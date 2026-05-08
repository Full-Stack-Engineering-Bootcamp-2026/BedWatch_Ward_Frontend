import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { NavLink } from "react-router-dom";

import { MdOutlineDashboard, MdOutlineBed } from "react-icons/md";
import { LiaUserShieldSolid } from "react-icons/lia";

import AddStaffModal from "../components/AddStaffModal";
import { FaBuildingShield } from "react-icons/fa6";

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const menu = [
  {
    name: "Dashboard",
    icon: MdOutlineDashboard,
    path: "/admin-dashboard",
  },
  {
    name: "Ward View",
    icon: MdOutlineBed,
    path: "/Wardview",
  },
  {
    name: "System Admin",
    icon: LiaUserShieldSolid,
    path: "/Systemadmin",
  },
];

export default function AppSidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-[260px] bg-white border-r flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static",
        )}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="hidden lg:block p-5 ">
            <h2 className="text-xl font-bold text-[#1E40AF]">BedWatch</h2>

            <p className="text-xs text-muted-foreground">Operational Control</p>
          </div>

          <div className="px-3 py-4 space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#1E40AF] text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black",
                    )
                  }
                >
                  <Icon size={20} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="pt-6 text-white">
              <AddStaffModal>
                <Button className="w-full h-11 bg-black hover:bg-[#18379c]">
                  + New Admission
                </Button>
              </AddStaffModal>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
