import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  ClipboardCheck,
} from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AboutSrStaffModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100vw-2rem)]
          sm:max-w-[520px]
          p-0
          overflow-hidden
          rounded-xl
          border
          border-blue-100
          bg-white
          shadow-xl
        "
      >
        <div className="bg-[#1E40AF] px-6 py-5 text-white">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-100">
            ABOUT
          </p>

          <DialogTitle className="mt-1 text-2xl font-bold">
            Sr Staff Role
          </DialogTitle>

          <p className="mt-2 text-sm text-blue-100">
            Operational control and transfer approval access.
          </p>
        </div>

        <div className="px-6 py-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-100 blur-md" />

              <Avatar className="relative h-28 w-28 border-4 border-blue-100 shadow-md">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=senior-staff"
                  alt="Senior Staff"
                />

                <AvatarFallback className="bg-blue-50 text-[#1E40AF] text-2xl font-bold"></AvatarFallback>
              </Avatar>

              <div className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-[#1E40AF] border-4 border-white flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 rounded-lg border border-gray-100 bg-[#F8FAFF] p-4">
              <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Building2 className="h-4 w-4 text-[#1E40AF]" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">See all wards</p>

                <p className="text-xs text-gray-500 mt-1">
                  Sr Staff can monitor ward-level bed availability, occupancy,
                  cleaning status, and operational load.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border border-gray-100 bg-[#F8FAFF] p-4">
              <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <ClipboardCheck className="h-4 w-4 text-[#1E40AF]" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Approves and rejects requests
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Sr Staff can approve or reject transfer requests sent by ward
                  staff after reviewing patient movement details.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border border-green-100 bg-green-50 p-4">
              <div className="mt-0.5 h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-green-700">
                  Role-based operational access
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  This role helps maintain safe patient flow across wards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F4F5FA] px-6 py-4 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-[#1E40AF] hover:bg-blue-800 text-white px-6"
          >
            GOT IT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
