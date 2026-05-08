import { IoMdExit } from "react-icons/io";

import { FaRegHourglass } from "react-icons/fa";

import { GiBroom } from "react-icons/gi";

export default function DischargeStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
          <IoMdExit className="text-green-600 text-2xl" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 font-medium">
            Daily Discharges
          </p>

          <div className="flex items-end gap-2 mt-1">
            <h2 className="text-3xl font-bold text-slate-900">
              42
            </h2>

            <span className="text-sm text-green-600 font-medium">
              +12%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
          <FaRegHourglass className="text-yellow-600 text-xl" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 font-medium">
            Avg. Transit Time
          </p>

          <div className="flex items-end gap-2 mt-1">
            <h2 className="text-3xl font-bold text-slate-900">
              18m
            </h2>

            <span className="text-sm text-yellow-600 font-medium">
              -2m
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <GiBroom className="text-[#00288E] text-2xl" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 font-medium">
            Beds Pending Cleaning
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            14
          </h2>
        </div>
      </div>
    </div>
  );
}   