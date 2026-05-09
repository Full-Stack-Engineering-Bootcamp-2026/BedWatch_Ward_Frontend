import React, { useState } from "react";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Ward = {
  id: number;
  name: string;
  beds: number;
};

type DeleteWardModalProps = {
  ward: Ward;

  onDelete: (id: number) => void;
};

function DeleteWardModal({ ward, onDelete }: DeleteWardModalProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(ward.id);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="h-9 w-9">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden border-0 bg-[#F8F9FC] p-0 sm:max-w-[500px]">
        <DialogHeader className="border-b bg-white px-6 py-5">
          <DialogTitle className="text-2xl font-bold text-red-600">
            Delete Ward
          </DialogTitle>

          <DialogDescription className="mt-1 text-xs font-semibold uppercase tracking-[2px] text-gray-400">
            Permanent Action
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6">
          <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-sm leading-6 text-red-700">
              Are you sure you want to delete{" "}
              <span className="font-bold">{ward.name}</span>?
            </p>

            <p className="mt-2 text-sm text-red-600">
              This action cannot be undone and may affect existing bed
              allocation records.
            </p>
          </div>
        </div>

        <DialogFooter className="border-t bg-white px-6 py-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleDelete}>
            Delete Ward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteWardModal;
