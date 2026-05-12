import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import PatientSearchBar from "../components/PatientSearchBar";
import DischargePatientsTable from "../components/DischargePatientTable";

export type Bed = {
  id: number;

  bed_number: string;

  status: string;

  doctor: string;

  patient: {
    id: number;

    name: string;

    age: number;

    diagnosis: string;

    admittedAt: string;
  } | null;
};

export default function DischargePatientsPage() {
  const token = useSelector((state: RootState) => state.auth.token);

  const [beds, setBeds] = useState<Bed[]>([]);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [dischargingId, setDischargingId] = useState<number | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/v1/staff-dashboard/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const occupiedBeds = response.data.data.beds.filter(
        (bed: Bed) => bed.patient !== null,
      );

      const filteredBeds = occupiedBeds.filter((bed: Bed) => {
        if (!searchQuery) return true;

        const query = searchQuery.toLowerCase();

        return (
          bed.patient?.name?.toLowerCase().includes(query) ||
          bed.bed_number?.toLowerCase().includes(query)
        );
      });

      setBeds(filteredBeds);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [token, searchQuery]);

  const handleDischarge = async (bedId: number) => {
    try {
      setDischargingId(bedId);

      await axios.patch(
        `http://localhost:3000/api/v1/staff-dashboard/beds/${bedId}/discharge`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchDashboard();
    } catch (error) {
      console.error(error);
    } finally {
      setDischargingId(null);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchDashboard();
    };

    loadData();
  }, [fetchDashboard]);

  return (
    <div className="min-h-screen bg-[#F7F5FC] p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[2px] text-slate-400">
          Operations / Discharge Patient
        </p>

        <h1 className="text-4xl font-bold text-[#1E1E1E] mt-2">
          Discharge Patient
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Manage admitted patients and discharge them safely.
        </p>
      </div>

      <PatientSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="mt-6">
        <DischargePatientsTable
          beds={beds}
          loading={loading}
          dischargingId={dischargingId}
          handleDischarge={handleDischarge}
        />
      </div>
    </div>
  );
}
