import PatientSearchBar from "../components/PatientSearchBar";

import DischargeTable from "../components/DischargePatientTable";

import DischargeStats from "../components/DischargeStats";

export default function DischargePatientsPage() {
  return (
    <div className="min-h-screen bg-[#F7F5FC] p-6">
      
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[2px] text-slate-400">
          Operations / Discharge Patient
        </p>

        <h1 className="text-3xl font-bold text-[#1E1E1E] mt-2">
          Discharge Patient
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Review clinical clearances and finalize
          hospital departures.
        </p>
      </div>


      <PatientSearchBar />

      <div className="mt-6">
        <DischargeTable />
      </div>


      <div className="mt-6">
        <DischargeStats />
      </div>
    </div>
  );
}