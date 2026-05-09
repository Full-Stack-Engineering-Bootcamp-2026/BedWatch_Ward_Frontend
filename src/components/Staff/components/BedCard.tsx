import {
  useEffect,
  useState,
} from "react";

import { PiNotepadLight } from "react-icons/pi";

import PatientDetailDialog from "./PatientDetailDialog";

interface Props {
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

export default function BedCard({
  bed,
}: Props) {

  const [countdown, setCountdown] =
    useState(30);

 useEffect(() => {

  if (
    bed.status !== "CLEANING"
  ) return;

  let timeLeft = 30;

  const interval =
    setInterval(() => {

      timeLeft -= 1;

      setCountdown(timeLeft);

      if (timeLeft <= 0) {

        clearInterval(interval);
      }

    }, 1000);

  return () =>
    clearInterval(interval);

}, [bed.status]);

  const getBorder = () => {

    switch (bed.status) {

      case "AVAILABLE":
        return "border-t-emerald-500";

      case "OCCUPIED":
        return "border-t-red-500";

      case "CLEANING":
        return "border-t-orange-500";

      default:
        return "border-t-slate-300";
    }
  };

  const getStatusStyle = () => {

    switch (bed.status) {

      case "AVAILABLE":
        return "bg-emerald-50 text-emerald-600";

      case "OCCUPIED":
        return "bg-red-50 text-red-500";

      case "CLEANING":
        return "bg-orange-50 text-orange-500";

      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <PatientDetailDialog
      disabled={
        bed.status !== "OCCUPIED"
      }
      bed={bed}
    >

      <div
        className={`h-fit bg-white border border-slate-200 border-t-[3px] ${getBorder()} rounded-sm px-3 py-3 shadow-sm flex flex-col justify-between`}
      >

        <div>

          <h2 className="text-[18px] font-bold text-slate-800">
            Bed {bed.bed_number}
          </h2>

          <span
            className={`inline-block mt-4 text-[9px] font-bold tracking-wide uppercase px-2 py-[2px] rounded-sm ${getStatusStyle()}`}
          >

            {bed.status === "CLEANING"
              ? `Cleaning (${countdown}s)`
              : bed.status}

          </span>
        </div>

        <div className="mt-4">

          <p className="text-xs uppercase tracking-wide text-slate-400">
            Patient Name
          </p>

          <h3 className="mt-2 text-sm font-semibold text-slate-800">
            {bed.patient?.name ||
              "No Patient"}
          </h3>
        </div>

        <div className="mt-4 flex items-start justify-between">

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Admitted
            </p>

            <p className="mt-2 text-sm text-slate-700 font-medium">
              {bed.patient?.admittedAt ||
                "--"}
            </p>
          </div>

          <div className="text-right">

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Stay Duration
            </p>

            <p className="mt-2 text-sm text-slate-700 font-medium">
              {bed.duration || "--"}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">

          <div className="flex items-center -space-x-2">

            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 border border-white">
              RN
            </div>

            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 border border-white">
              MD
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">

            <span>
              <PiNotepadLight />
            </span>

            <span>
              {bed.priority ||
                "Medium Priority"}
            </span>
          </div>
        </div>
      </div>
    </PatientDetailDialog>
  );
}