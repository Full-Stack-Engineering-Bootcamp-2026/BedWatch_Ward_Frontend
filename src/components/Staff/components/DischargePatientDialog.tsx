import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { AlertTriangle } from "lucide-react";

type DischargeDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export default function DischargeDialog({
  open,
  onOpenChange,
}: DischargeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-white p-0 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
        <div className="bg-white">
          <DialogHeader className="px-6 pt-6 pb-5 border-b bg-white text-left">
            <DialogTitle className="text-[36px] leading-[42px] font-bold text-[#1E1E1E]">
              Discharge Robert Henderson?
            </DialogTitle>

            <DialogDescription className="text-[15px] text-[#5F5F5F] mt-2">
              Confirm final discharge sequence and bed release.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5 space-y-6 bg-white">
            <div className="grid grid-cols-2 gap-6 bg-[#F7F5FC] border border-[#ECE8F5] rounded-2xl p-6">
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[1.5px] text-[#8C8C8C] font-medium">
                    Bed No
                  </p>

                  <h3 className="text-[20px] font-bold text-[#00288E] mt-2">
                    Ward 4-A / Bed 12
                  </h3>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[1.5px] text-[#8C8C8C] font-medium">
                    Admitted On
                  </p>

                  <p className="text-[16px] font-medium text-[#1E1E1E] mt-2">
                    Oct 12, 2023 • 09:45 AM
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[1.5px] text-[#8C8C8C] font-medium">
                    Ward
                  </p>

                  <h3 className="text-[20px] font-bold text-[#1E1E1E] mt-2">
                    Cardiology
                  </h3>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[1.5px] text-[#8C8C8C] font-medium">
                    Length Of Stay
                  </p>

                  <p className="text-[16px] font-medium text-[#1E1E1E] mt-2">
                    4 Days, 6 Hours
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[12px] uppercase tracking-[1.5px] font-semibold text-[#1E1E1E]">
                Discharge Notes
              </label>

              <Textarea
                placeholder="Enter summary of discharge status or follow-up instructions..."
                className="min-h-[140px] resize-none rounded-xl border-slate-300 bg-white placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#00288E]"
              />
            </div>

            <div className="flex gap-4 bg-[#FFF2ED] border border-[#F7B9A6] rounded-2xl p-5">
              <div className="shrink-0 pt-0.5">
                <AlertTriangle className="text-[#B54708] w-5 h-5" />
              </div>

              <div>
                <h4 className="font-semibold text-[#B54708] text-[15px]">
                  Bed 12 will be marked as Cleaning after discharge.
                </h4>

                <p className="text-[14px] text-[#B54708]/80 mt-2 leading-6">
                  This will automatically trigger a service request for
                  Environmental Services.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t bg-white px-6 py-4 flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="uppercase tracking-wide text-[#5F5F5F]"
            >
              Cancel
            </Button>

            <Button className="font-inter text-white bg-[#00288E] hover:bg-[#18379c] min-w-[210px] uppercase tracking-wide">
              Confirm Discharge
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
