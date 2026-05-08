import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import {Select, SelectContent, SelectItem, SelectTrigger,SelectValue} from "@/components/ui/select";

import {BedDouble,TriangleAlert,Building2} from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function TransferPatientDialog({
  children,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl p-0 bg-white overflow-hidden">
    
        <DialogHeader className="border-b px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-[#00288E] font-semibold">
              Patient Movement
            </p>

            <DialogTitle className="text-3xl font-bold mt-2">
              Transfer Jonathan Richards
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase text-slate-500 font-semibold">
                Current Ward
              </label>

              <div className="mt-2 border rounded-lg h-12 px-4 flex items-center gap-3 bg-slate-50">
                <Building2 className="w-4 h-4 text-[#00288E]" />

                <span className="text-sm">
                  North Wing - Cardiology
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-slate-500 font-semibold">
                Current Bed
              </label>

              <div className="mt-2 border rounded-lg h-12 px-4 flex items-center gap-3 bg-slate-50">
                <BedDouble className="w-4 h-4 text-[#00288E]" />

                <span className="text-sm">
                  Bed B-12
                </span>
              </div>
            </div>
                  </div>
                  
          <div>
            <label className="text-xs uppercase text-slate-500 font-semibold">
              Destination Ward
            </label>

            <Select>
              <SelectTrigger className="mt-2 h-12 bg-white">
                <SelectValue placeholder="Select ward" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectItem value="rehab">
                  Post-Operative Recovery
                </SelectItem>

                <SelectItem value="icu">
                  ICU
                </SelectItem>

                <SelectItem value="general">
                  General Ward
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500 font-semibold">
              Destination Bed
            </label>

            <div className="mt-2 border border-red-500 rounded-lg h-12 px-4 flex items-center justify-between bg-red-50">
              <span className="text-sm text-red-600">
                No available beds
              </span>

              <TriangleAlert className="w-4 h-4 text-red-600" />
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs text-red-600">
              <TriangleAlert className="w-3 h-3" />

              No available beds in selected ward.
              Request will be queued.
            </div>
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500 font-semibold">
              Transfer Reason
            </label>

            <Textarea
              className="mt-2 min-h-[120px]"
              placeholder="Specify clinical necessity for transfer..."
            />
          </div>
        </div>

  
        <div className="border-t bg-slate-50 px-6 py-4 flex items-center justify-between">
          <Button variant="ghost">
            Cancel
          </Button>

          <Button className= "text-white bg-[#00288E] hover:bg-[#001d66]">
            Submit Transfer Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}