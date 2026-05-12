import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUserInjured } from "react-icons/fa";
import TransferPatientDialog from "./TransferPatientDialog";

interface Props {
  children: React.ReactNode;

  disabled?: boolean;

  bed: {
    id: number;

    bed_number: string;

    status: string;

    ward?: {
      id: number;

      name: string;
    };

    patient?: {
      id: number;

      name: string;

      age: number;

      diagnosis: string;

      admittedAt: string;
    };

    doctor?: string;
  };
}

export default function PatientDetailDialog({
  children,
  disabled,
  bed,
}: Props) {
  console.log("hbAC ASBHBA" + bed.ward + " AMNWDMN");

  const [open, setOpen] = useState(false);

  const [transferOpen, setTransferOpen] = useState(false);

  const token = useSelector((state: any) => state.auth.token);

  const handleDischarge = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/staff-dashboard/beds/${bed.id}/discharge`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("BED DATA:", bed);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {disabled ? (
          <div className="w-full">{children}</div>
        ) : (
          <DialogTrigger asChild>
            <button type="button" className="w-full text-left">
              {children}
            </button>
          </DialogTrigger>
        )}

        <DialogContent className="!w-[1100px] !max-w-[1100px] bg-white border border-slate-200 rounded-3xl p-0 overflow-hidden shadow-2xl">
          <DialogTitle className="hidden">Patient Details</DialogTitle>

          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                <FaUserInjured className="text-white text-xl" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-1">
                  Patient Record
                </p>

                <h2 className="text-3xl font-bold text-slate-900">
                  {bed.patient?.name}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Medical Record & Admission Details
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8 bg-white">
            <div className="grid grid-cols-3 gap-5">
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">
                  Age
                </p>

                <h3 className="text-2xl font-bold text-slate-900">
                  {bed.patient?.age}
                </h3>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">
                  Current Ward
                </p>

                <h3 className="text-xl font-bold text-slate-900">
                  {bed.ward?.name || "General Ward"}
                </h3>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">
                  Bed Number
                </p>

                <h3 className="text-xl font-bold text-slate-900">
                  {bed.bed_number}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="border border-slate-200 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">
                  Admission Date
                </p>

                <p className="text-slate-700 font-medium">
                  {bed.patient?.admittedAt || "--"}
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">
                  Assigned Doctor
                </p>

                <p className="text-slate-700 font-medium">{"Ram"}</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-4">
                Diagnosis
              </p>

              <p className="text-slate-700 leading-7">
                {bed.patient?.diagnosis || "No diagnosis available"}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 px-8 py-5 bg-white flex items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition"
            >
              Close
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setTransferOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
              >
                Transfer Patient
              </button>

              <button
                onClick={handleDischarge}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
              >
                Discharge Patient
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TransferPatientDialog
        open={transferOpen}
        onOpenChange={setTransferOpen}
        patientId={bed.patient?.id || 0}
        patientName={bed.patient?.name || "Unknown Patient"}
        currentWardId={bed.ward?.id || 0}
        currentWardName={bed.ward?.name || "General Ward"}
        currentBedId={bed.id}
        currentBedNumber={bed.bed_number}
      />
    </>
  );
}
