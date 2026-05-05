import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HelpCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full h-[65px] border-b bg-white flex items-center justify-between px-6">
      <div className="font-inter text-[#1E40AF] font-semibold text-lg">
        BedWatch
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <span className="cursor-pointer hover:text-black"> Ward View</span>
        <span className="cursor-pointer hover:text-black"> staffing</span>
        <span className="cursor-pointer hover:text-black"> Resource Map</span>
        <span className="cursor-pointer hover:text-black"> Reports </span>
      </nav>

      <div className="flex items-center gap-4">
        <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer" />

        <Avatar className="w-8 h-8">
          <AvatarImage src="" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
