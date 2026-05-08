import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HelpCircle } from "lucide-react";
import { MdOutlineBed } from "react-icons/md";

export default function Navbar() {
  return (
    <header className="w-full h-[61px] border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1E40AF] rounded-md flex items-center justify-center">
          <MdOutlineBed className="text-white text-xl" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-inter text-[#1E40AF] font-semibold text-lg">BedWatch</span>
          <span className=" font-inter text-gray-500 text-[11px] tracking-wide">
            OPERATIONAL CONTROL
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <span className="font-inter cursor-pointer hover:text-black"> Ward View</span>
        <span className="font-inter cursor-pointer hover:text-black"> staffing</span>
        <span className="font-inter cursor-pointer hover:text-black"> Resource Map</span>
        <span className="font-inter cursor-pointer hover:text-black"> Reports </span>
      </nav>

      <div className="flex items-center gap-4">
        <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer" />

        <Avatar className="w-8 h-8">
          <AvatarImage src="https://i.pravatar.cc/" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
