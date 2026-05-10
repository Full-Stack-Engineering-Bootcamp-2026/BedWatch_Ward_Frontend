import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

type Props = {
  searchQuery: string;

  setSearchQuery: (
    value: string,
  ) => void;
};

export default function PatientSearchBar({
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <div className="flex items-center justify-between gap-4 flex-wrap">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

            <Search className="w-5 h-5 text-blue-600" />

          </div>

          <div>

            <h2 className="text-lg font-semibold text-slate-800">
              Search Patients
            </h2>

            <p className="text-sm text-slate-500">
              Find admitted patients quickly
            </p>

          </div>

        </div>

    
        <div className="relative w-full md:w-[420px]">

          <Search className="absolute left-4 top-4 w-4 h-4 text-slate-400" />

          <Input
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value,
              )
            }
            placeholder="Search by Patient Name, Bed Number, Ward, or Hospital ID..."
            className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-1 focus-visible:ring-blue-500"
          />

        </div>

      </div>

    </div>
  );
}