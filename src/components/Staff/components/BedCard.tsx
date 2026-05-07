interface Props {
  bed: {
    number: string;
    status: string;
    patient?: string;
    duration?: string;
    diagnosis: string;
    time: string;
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

  const getText = () => {
    switch (bed.status) {
      case "AVAILABLE":
        return "text-emerald-600";

      case "OCCUPIED":
        return "text-red-500";

      case "CLEANING":
        return "text-orange-500";

      default:
        return "text-slate-500";
    }
  };

  return (
    <div
      className={`w-[336px] h-[240px] bg-white border-t-[4px] border-r border-b border-l ${getBorder()} rounded-sm p-2 flex flex-col justify-between shadow-sm`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Bed {bed.number}
            </h2>

            <p className={`text-xs font-bold mt-1 tracking-wide ${getText()}`}>
              {bed.status}
            </p>
          </div>

          {bed.duration && (
            <span className="text-sm text-slate-400 font-medium">
              {bed.duration}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {bed.patient && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Patient Name
              </p>

              <p className="font-semibold text-slate-700 mt-1">{bed.patient}</p>
            </div>
          )}

          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">
              Details
            </p>

            <p className="text-sm text-slate-600 mt-1">{bed.diagnosis}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">{bed.time}</span>

        {bed.status === "AVAILABLE" && (
          <button className="text-sm text-blue-700 font-semibold hover:text-blue-800">
            Assign
          </button>
        )}

        {bed.status === "OCCUPIED" && (
          <button className="text-sm text-blue-700 font-semibold hover:text-blue-800">
            View Chart
          </button>
        )}
      </div>
    </div>
  );
}
