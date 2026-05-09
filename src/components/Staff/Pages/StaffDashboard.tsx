import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

import SummaryCards from "../components/SummaryCards";

import BedGrid from "../components/BedGrid";

import { GoDownload } from "react-icons/go";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useCallback } from "react";

export default function StaffDashboard() {
  const navigate = useNavigate();

  const [beds, setBeds] = useState<any[]>([]);

  const [wardName, setWardName] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);

  const getDashboardData = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/staff-dashboard/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();

        const updatedBeds = data.data.beds.map((bed: any) => ({
          ...bed,

          ward: {
            id: data.data.ward.id,

            name: data.data.ward.name,
          },
        }));

        console.log("UPDATED BEDS:", updatedBeds);

        setBeds(updatedBeds);

        setWardName(data.data.ward.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard();
    }, 300000);

    return () => clearInterval(interval);
  }, [token, getDashboardData]);

  return (
    <div className="space-y-6 p-6 bg-[#f4f1f8] min-h-screen">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest text-cyan-700 font-semibold uppercase">
            Central Operations
          </p>

          <h1 className="text-4xl font-bold text-slate-800 mt-2">
            {wardName} — Live Bed Status
          </h1>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-2 text-sm font-medium rounded-md">
            <GoDownload />
            Export Status
          </button>

          <button
            onClick={() => navigate("/staff/admit")}
            className="bg-[#00288E] text-white px-5 py-2 text-sm font-medium rounded-md"
          >
            + Allocate Bed
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <SummaryCards beds={beds} />

      {/* BED GRID */}
      <BedGrid beds={beds} />
    </div>
  );
}
