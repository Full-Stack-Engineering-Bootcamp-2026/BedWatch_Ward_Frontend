import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="none"
      className="  w-64 h-screen border-r shrink-0 bg-white"
    >
      <SidebarHeader className="p-4 border-b">
        <h1 className="text-[#1E40AF] font-semibold text-lg">BedWatch</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
