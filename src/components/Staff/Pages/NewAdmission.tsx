import PatientDetailsForm from "../components/admission/PatientDetailsForm";
import BedAssignmentCard from "../components/admission/BedAssignmentCard";
import AdmissionSummaryCard from "../components/admission/AdmissionSummaryCard";
import { useNavigate } from "react-router-dom";

export default function NewAdmissionPage() {
     const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#f7f5fb] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Admit Patient</h1>
          <p className="text-sm text-gray-500">
            Register a new patient into the hospital resource management system.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/staff/dashboard")}
            className="border px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>

          <button className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            Complete Admission
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PatientDetailsForm />
        </div>
        <div className="space-y-5">
          <BedAssignmentCard
            assignedWard="General Medical Ward A"
            availableBeds={[
              {
                id: 1,
                bedNumber: "B101",
                type: "General",
              },
              {
                id: 2,
                bedNumber: "B102",
                type: "ICU",
              },
              {
                id: 3,
                bedNumber: "B103",
                type: "Isolation",
              },
              {
                id: 4,
                bedNumber: "B104",
                type: "Emergency",
              },
              {
                id: 5,
                bedNumber: "B105",
                type: "General",
              },
              {
                id: 6,
                bedNumber: "B106",
                type: "ICU",
              },
            ]}
          />
          <AdmissionSummaryCard />
        </div>
      </div>
    </div>
  );
}
