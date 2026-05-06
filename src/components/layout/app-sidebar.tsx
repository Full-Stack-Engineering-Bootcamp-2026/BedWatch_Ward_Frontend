import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { MdOutlineDashboard } from "react-icons/md";

import { Link } from "react-router-dom";
import { MdOutlineBed } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { LiaUserShieldSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";


export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="none"
      className="
      bg-[#FAFAFA]
      backdrop-blur-md
      hidden lg:inline w-[256px] h-screen border-r shrink-0"
    >
      <SidebarContent className="p-0 font-inter ">
        <SidebarGroup>
          <SidebarMenuItem className="list-none font-inter ">
            <SidebarMenuButton asChild >
              <Link to="/admin-dashboard" className="flex items-center gap-2 ">
                <MdOutlineDashboard size={18} />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild>
              <Link to="/Wardview" className="flex items-center gap-2 ">
                <MdOutlineBed size={18} />
                Ward View
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild>
              <Link to="/staffing" className="flex items-center gap-2 ">
                <HiUserGroup size={18} />
                Staffing
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild>
              <Link to="/Systemadmin" className="flex items-center gap-2 ">
                <LiaUserShieldSolid size={18} />
                System Admin
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild>
              <Button
                asChild
                className="mt-5 w-[207px] h-[44px] bg-[#1E40AF] text-white rounded-[2px] text-sm font-inter hover:bg-[#1a3691]"
              >
                <Link to="/newadmission">+ New Admission</Link>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
