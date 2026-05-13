import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { HelpCircle } from "lucide-react";

import { MdOutlineBed } from "react-icons/md";

import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

type NavbarProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ setOpen }: NavbarProps) {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <header className="w-full h-[61px] border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="w-10 h-10 bg-[#1E40AF] rounded-md flex items-center justify-center">
          <MdOutlineBed className="text-white text-xl" />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-inter text-[#1E40AF] font-semibold text-lg">
            BedWatch
          </span>

          <span className=" font-inter text-gray-500 text-[11px] tracking-wide">
            OPERATIONAL CONTROL
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <NavLink
          to="/Wardview"
          className={({ isActive }) =>
            `font-inter cursor-pointer hover:text-black ${
              isActive ? "text-[#00288E] font-semibold" : ""
            }`
          }
        >
          Ward View
        </NavLink>

        <NavLink
          to="/Systemadmin"
          className={({ isActive }) =>
            `font-inter cursor-pointer hover:text-black ${
              isActive ? "text-[#00288E] font-semibold" : ""
            }`
          }
        >
          Staffing
        </NavLink>

        <NavLink
          to="/admin-occupancyChart"
          className={({ isActive }) =>
            `font-inter cursor-pointer hover:text-black ${
              isActive ? "text-[#00288E] font-semibold" : ""
            }`
          }
        >
          Reports
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer" />

        <NavLink to="/admin-profile">
          <Avatar className="w-8 h-8 cursor-pointer border hover:scale-105 transition-all">
            <AvatarImage src={user?.imageUrl || "https://i.pravatar.cc/"} />

            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </NavLink>
      </div>
    </header>
  );
}
