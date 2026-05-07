import { PiNotepadLight } from "react-icons/pi";

interface Props {
  bed: {
    bed_number: string;
    status: string;
    patient?: string;
    admitted?: string;
    duration?: string;
    priority?: string;
    nurse?: string;
    doctor?: string;
  };
}

export default function BedCard({ bed }: Props) {
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
  console.log(bed);

  return (
      <div className={`w-[390px] bg-white border border-slate-200 border-t-[4px] ${getBorder()} rounded-md p-6 shadow-sm`}>
          
      <div>
        <h2 className="text-4xl font-bold text-slate-800">
          Bed {bed.bed_number}
        </h2>

        <span
          className={`inline-block mt-4 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm ${getStatusStyle()}`}
        >
          {bed.status}
        </span>
      </div>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-widest text-slate-400">
          Patient Name
        </p>

        <h3 className="mt-2 text-2xl font-semibold text-slate-800">
          {bed.patient || "No Patient"}
        </h3>
      </div>

      <div className="mt-10 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Admitted
          </p>

          <p className="mt-2 text-xl text-slate-700 font-medium">
            {bed.admitted || "--"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Stay Duration
          </p>

          <p className="mt-2 text-xl text-slate-700 font-medium">
            {bed.duration || "--"}
          </p>
        </div>
      </div>

      <div className="mt-10 pt-5 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center -space-x-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 border border-white">
            RN
          </div>

          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 border border-white">
            MD
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 font-semibold">
          <span>
            <PiNotepadLight />
          </span>

          <span>{bed.priority || "medium Priority"}</span>
        </div>
      </div>
    </div>
  );
}
