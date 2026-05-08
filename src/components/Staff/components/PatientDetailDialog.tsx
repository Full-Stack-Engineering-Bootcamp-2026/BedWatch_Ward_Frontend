import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  User,
  Stethoscope,
  MapPin,
  Printer,
  LogOut,
} from "lucide-react";

import { useState } from "react";

import DischargeDialog from "./DischargePatientDialog";

interface Props {
  children: React.ReactNode;
}

export default function PatientDetailDialog({ children }: Props) {
  const [openPatientDialog, setOpenPatientDialog] = useState(false);

  const [openDischarge, setOpenDischarge] = useState(false);

  return (
    <>
      <Dialog
        open={openPatientDialog}
        onOpenChange={setOpenPatientDialog}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="w-[90vw] sm:w-[80vw] lg:max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 bg-white rounded-xl">
          <DialogHeader className="border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-bold text-[#00288E]">
                  Patient Detail
                </DialogTitle>

                <p className="text-[10px] uppercase tracking-[3px] text-slate-400 mt-1">
                  Medical Record View
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="p-4 space-y-5 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Patient Name
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  Jonathan Miller
                </h2>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#00288E]" />
                    64 Years
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00288E]" />
                    Male
                  </div>
                </div>
              </div>

              <div className="border-2 border-[#00288E] rounded-xl px-5 py-4 text-center w-full sm:w-fit">
                <p className="text-xs uppercase font-semibold text-slate-500">
                  Assigned Bed
                </p>

                <h2 className="text-2xl sm:text-4xl font-bold text-[#00288E] mt-2">
                  401-A
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t pt-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  Admission Date / Time
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CalendarDays className="w-4 h-4 text-[#00288E]" />
                  12 Oct 2023, 08:30 AM
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  Admitting Doctor
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Stethoscope className="w-4 h-4 text-[#00288E]" />
                  Dr. Helena Vance (Internal Med)
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">
                Admission Reason
              </p>

              <div className="border rounded-lg bg-slate-50 p-4 text-[13px] text-slate-700 leading-6">
                Post-operative observation following laparoscopic
                cholecystectomy. Patient presenting with mild localized pain,
                vitals within stable range. No immediate complications reported
                in PACU.
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">
                Clinical Notes
              </p>

              <div className="border-l-4 border-[#00288E] bg-slate-50 p-4 space-y-4 rounded-r-lg">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                  <div className="text-xs font-bold text-[#00288E] min-w-[60px]">
                    14:20 PM
                  </div>

                  <p className="text-[13px] text-slate-700 leading-6">
                    Physiotherapy assessment completed. Patient ambulatory with
                    assistance. Tolerating clear liquids well. Pain managed via
                    oral meds.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                  <div className="text-xs font-bold text-[#00288E] min-w-[60px]">
                    10:05 AM
                  </div>

                  <p className="text-[13px] text-slate-700 leading-6">
                    Initial rounds completed. Dressing is clean, dry and intact.
                    IV fluids titrated to 100ml/hr per protocol.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">
                Location Tracking
              </p>

              <div className="h-28 sm:h-32 w-full rounded-xl bg-slate-200 flex items-center justify-center relative overflow-hidden">
                <MapPin className="w-8 h-8 text-[#00288E]" />

                <div className="absolute bottom-4 bg-[#00288E] text-white text-xs px-3 py-1 rounded-full">
                  Room 401
                </div>
              </div>
            </div>
          </div>

          <div className="border-t px-4 py-3 flex flex-col lg:flex-row gap-3 items-center justify-between bg-slate-50">
            <Button
              size="sm"
              variant="ghost"
              className="text-slate-600 w-full sm:w-auto"
              onClick={() => setOpenPatientDialog(false)}
            >
              Close Record
            </Button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                size="sm"
                variant="outline"
                className="gap-2 w-full sm:w-auto"
              >
                <Printer className="w-4 h-4" />
                Print Charts
              </Button>

              <Button
                onClick={() => {
                  setOpenPatientDialog(false);
                  setOpenDischarge(true);
                }}
                size="sm"
                className="text-white bg-[#00288E] hover:bg-[#001d66] gap-2 w-full sm:w-auto"
              >
                <LogOut className="w-4 h-4" />
                Discharge Patient
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DischargeDialog
        open={openDischarge}
        onOpenChange={setOpenDischarge}
      />
    </>
  );
}