import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import SummaryCards from "../components/SummaryCards";
import BedGrid from "../components/BedGrid";
import { GoDownload } from "react-icons/go";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [beds, setBeds] = useState([]);
  const [wardName, setWardName] = useState("");

  const id = useSelector((state: RootState) => state.auth.user?.id);

  const getDashboardData = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:3000/api/v1/staff/dashboard/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };
  useEffect(() => {
    if (!id) return;

    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();

        setBeds(data.data.beds);
        setWardName(data.data.ward.name);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboard();
  }, [id]);
  return (
    <div className="space-y-6 p-6 bg-[#f4f1f8] min-h-screen">
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

      <SummaryCards beds={beds} />

      <BedGrid beds={beds} />
    </div>
  );
}
