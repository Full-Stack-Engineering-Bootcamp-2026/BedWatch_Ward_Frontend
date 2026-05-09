import React, { useState } from "react";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type Ward = {
  id: number;
  name: string;
  beds: number;
};

type EditWardModalProps = {
  ward: Ward;
  onSave: (updatedWard: { id: number; capacity: number }) => void;
};

function EditWardModal({ ward, onSave }: EditWardModalProps) {
  const [open, setOpen] = useState(false);

  const [beds, setBeds] = useState(ward.beds.toString());

  const handleSave = () => {
    onSave({
      id: ward.id,
      capacity: Number(beds),
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden border-0 bg-[#F8F9FC] p-0 sm:max-w-[560px]">
        <DialogHeader className="border-b bg-white px-6 py-5">
          <DialogTitle className="text-3xl font-bold text-[#0F2E8A]">
            Edit Ward
          </DialogTitle>

          <DialogDescription className="mt-1 text-xs font-semibold uppercase tracking-[2px] text-gray-400">
            Capacity Management
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 px-6 py-6">
          <div>
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              Ward Name
            </Label>

            <Input
              value={ward.name}
              disabled
              className="h-11 cursor-not-allowed bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              Total Bed Capacity
            </Label>

            <Input
              type="number"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              className="h-11"
              placeholder="24"
            />
          </div>

          <div className="rounded-md border-l-4 border-blue-600 bg-blue-50 px-4 py-4">
            <p className="text-sm text-blue-700">
              Ward name cannot be modified after creation. Only bed capacity can
              be updated.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className="bg-[#1E40AF] text-white hover:bg-[#18379c]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditWardModal;
