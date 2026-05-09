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

    patient?: {
      name: string;
      age: number;
      diagnosis: string;
      admittedAt: string;
    };

    admitted?: string;
    duration?: string;
    priority?: string;
    nurse?: string;
    doctor?: string;
  };
}

export default function PatientDetailDialog({
  children,
  disabled,
  bed,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const token = useSelector(
    (state: any) => state.auth.token
  );

  const handleDischarge =
    async () => {

      try {

        await axios.patch(
          `http://localhost:3000/api/v1/staff-dashboard/beds/${bed.id}/discharge`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        window.location.reload();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      {disabled ? (
        <div className="w-full">
          {children}
        </div>
      ) : (
        <DialogTrigger asChild>

          <button
            type="button"
            className="w-full text-left"
          >
            {children}
          </button>

        </DialogTrigger>
      )}

      <DialogContent className="!w-[1100px] !max-w-[1100px] p-0 overflow-hidden bg-white border border-slate-200 shadow-2xl rounded-2xl">

        <DialogTitle className="hidden">
          Patient Details
        </DialogTitle>

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F4F6FF] border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <FaUserInjured className="text-white text-lg" />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Patient Details
              </h2>

              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">
                Medical Record View
              </p>

            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs uppercase tracking-wide text-slate-400">
                Patient Name
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {bed.patient?.name || "N/A"}
              </h2>

              <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">

                <span>
                  Age: {bed.patient?.age || "N/A"}
                </span>

                <span>
                  Bed: {bed.bed_number}
                </span>

              </div>
            </div>

            {/* BED BADGE */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-8 py-5 text-center">

              <p className="text-xs uppercase tracking-wide text-blue-500 font-semibold">
                Assigned Bed
              </p>

              <h2 className="text-4xl font-bold text-blue-700 mt-1">
                {bed.bed_number}
              </h2>

            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-4">

            <div className="border rounded-xl p-4 bg-slate-50">

              <p className="text-xs uppercase tracking-wide text-slate-400">
                Admission Date
              </p>

              <p className="mt-2 font-medium text-slate-800">
                {bed.patient?.admittedAt || "--"}
              </p>

            </div>

            <div className="border rounded-xl p-4 bg-slate-50">

              <p className="text-xs uppercase tracking-wide text-slate-400">
                Doctor Assigned
              </p>

              <p className="mt-2 font-medium text-slate-800">
                {bed.doctor || "Not Assigned"}
              </p>

            </div>
          </div>

          {/* DIAGNOSIS */}
          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
              Admission Reason
            </p>

            <div className="border rounded-xl p-4 bg-slate-50 text-sm leading-6 text-slate-700">

              {bed.patient?.diagnosis ||
                "No diagnosis available"}

            </div>
          </div>

          {/* CLINICAL NOTES */}
          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">
              Clinical Notes
            </p>

            <div className="space-y-3 border rounded-xl p-4">

              <div className="border-l-4 border-blue-500 pl-4">

                <p className="text-xs text-blue-600 font-semibold">
                  14:20 PM
                </p>

                <p className="text-sm text-slate-700 mt-1">
                  Patient stable and responding well to treatment.
                </p>

              </div>

              <div className="border-l-4 border-slate-300 pl-4">

                <p className="text-xs text-slate-500 font-semibold">
                  10:05 AM
                </p>

                <p className="text-sm text-slate-700 mt-1">
                  Initial rounds completed successfully.
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-4 flex items-center justify-between bg-slate-50">

          <button
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Close Record
          </button>

          <div className="flex items-center gap-3">
<TransferPatientDialog
  transferPatient={{
    patientId: bed.id,

    currentBedId: bed.id,

    currentWardId: 1,

    name:
      bed.patient?.name ||
      "Unknown Patient",

    ward: "General Ward",

    bed:
      bed.bed_number ||
      "N/A",
  }}
>
  <button className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-blue-700 transition bg-blue-600 text-white">
    Transfer Patient
  </button>
</TransferPatientDialog>

            <button
              onClick={handleDischarge}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
            >
              Discharge Patient
            </button>

          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}