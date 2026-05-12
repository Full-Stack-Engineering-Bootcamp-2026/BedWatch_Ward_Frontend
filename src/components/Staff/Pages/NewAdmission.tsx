import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "@/store/store";
import PatientDetailsForm from "../components/admission/PatientDetailsForm";
import BedAssignmentCard from "../components/admission/BedAssignmentCard";
import AdmissionSummaryCard from "../components/admission/AdmissionSummaryCard";

export default function NewAdmissionPage() {
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    reason: "",
    notes: "",
    admittingDoctor: "",
    bed_id: "",
  });

  const [assignedWard, setAssignedWard] = useState("");

  const [availableBeds, setAvailableBeds] = useState([]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchAdmissionMeta = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          "http://localhost:3000/api/v1/staff-dashboard/admission-meta",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = response.data.data;

        setAssignedWard(data.ward.name);

        setAvailableBeds(data.availableBeds);
      } catch (error) {
        console.error("Failed to fetch admission meta", error);
      }
    };

    fetchAdmissionMeta();
  }, [token]);

  const handleSubmit = async () => {
    try {
      if (!token) return;

      await axios.post(
        "http://localhost:3000/api/v1/staff-dashboard/admissions",
        {
          ...formData,

          age: Number(formData.age),

          bed_id: Number(formData.bed_id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/staff-dashboard");
    } catch (error) {
      console.error("Admission failed", error);
    }
  };

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
            onClick={() => navigate("/staff-dashboard")}
            className="border px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#1E40AF] text-white px-4 py-2 rounded-md text-sm"
          >
            Complete Admission
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PatientDetailsForm formData={formData} handleChange={handleChange} />
        </div>

        <div className="space-y-5">
          <BedAssignmentCard
            assignedWard={assignedWard}
            availableBeds={availableBeds}
            selectedBed={formData.bed_id}
            setSelectedBed={(value) => handleChange("bed_id", value)}
          />

          <AdmissionSummaryCard />
        </div>
      </div>
    </div>
  );
}
