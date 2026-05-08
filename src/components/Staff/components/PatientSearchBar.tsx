import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

export default function PatientSearchBar() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
  
      <div className="relative">
        <Search className="absolute left-4 top-4 w-4 h-4 text-slate-400" />

        <Input
          placeholder="Search by Patient Name, Bed Number, or Hospital ID..."
          className="pl-10 h-12 bg-white"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Quick Filters:
        </p>

        <button className="px-4 py-2 rounded-full border bg-slate-50 hover:bg-slate-100 text-sm transition">
          Medical Ward
        </button>

        <button className="px-4 py-2 rounded-full border bg-slate-50 hover:bg-slate-100 text-sm transition">
          ICU
        </button>

        <button className="px-4 py-2 rounded-full border bg-slate-50 hover:bg-slate-100 text-sm transition">
          Pending Results
        </button>

        <button className="px-4 py-2 rounded-full border bg-slate-50 hover:bg-slate-100 text-sm transition">
          Final Review
        </button>

        <button className="px-4 py-2 rounded-full border bg-slate-50 hover:bg-slate-100 text-sm transition">
          Cleared
        </button>
      </div>
    </div>
  );
}