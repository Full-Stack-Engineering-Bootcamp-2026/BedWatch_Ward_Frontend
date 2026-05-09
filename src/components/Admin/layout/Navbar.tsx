import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { HelpCircle, Menu } from "lucide-react";
import { MdOutlineBed } from "react-icons/md";
import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom";
type NavbarProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ setOpen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-[40] min-h-[60px] border-b bg-white flex items-center justify-between px-4 md:px-6 py-3">
      <div className="flex items-center gap-3 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="w-12 h-12 bg-[#1E40AF] rounded-md flex items-center justify-center">
          <MdOutlineBed className="text-white text-2xl" />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-base md:text-lg text-[#1E40AF]">
            BedWatch
          </span>

          <span className="text-gray-500 text-[10px] md:text-[11px] tracking-wide">
            OPERATIONAL CONTROL
          </span>
        </div>
      </div>

      <nav className="hidden xl:flex items-center gap-6 text-sm text-gray-600">
        <Link to="/Wardview" className="cursor-pointer hover:text-black">
          Ward View
        </Link>

        <Link to="/Systemadmin" className="cursor-pointer hover:text-black">
          Staffing
        </Link>

        <Link
          to="/admin-occupancyChart"
          className="cursor-pointer hover:text-black"
        >
          Reports
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer" />

        <NavLink to="/admin-profile">
          <Avatar className="w-8 h-8 md:w-9 md:h-9 cursor-pointer">
            <AvatarImage src="https://png.pngtree.com/background/20250106/original/pngtree-a-hackers-use-computer-picture-image_15824759.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </NavLink>
      </div>
    </header>
  );
}
