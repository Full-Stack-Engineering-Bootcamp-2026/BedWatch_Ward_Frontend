import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import {
  getDashboardSummary,
  getWardOccupancy,
  getSystemAlerts,
  getDashboardTrends,
} from "@/services/srStaff.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type DashboardStats = {
  totalBeds: number;
  occupied: number;
  available: number;
  cleaning: number;
  load: number;
};

type WardOccupancy = {
  wardId: number;
  wardName: string;
  capacity: number;
  occupied: number;
  available: number;
  cleaning: number;
  occupancyRate: number;
  status?: string;
};

type Alert = {
  title: string;
  message: string;
  type: string;
  time: string;
};

type TrendData = {
  labels: string[];
  admissions: number[];
  discharges: number[];
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [wards, setWards] = useState<WardOccupancy[]>([]);

  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [trends, setTrends] = useState<TrendData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryData, wardData, alertData, trendData] = await Promise.all(
          [
            getDashboardSummary(),
            getWardOccupancy(),
            getSystemAlerts(),
            getDashboardTrends(),
          ],
        );

        setStats(summaryData);

        setWards(wardData);

        setAlerts(alertData);

        setTrends(trendData);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const lineData = {
    labels: trends?.labels || [],

    datasets: [
      {
        label: "Admissions",

        data: trends?.admissions || [],

        borderColor: "#1E40AF",

        backgroundColor: "rgba(30, 64, 175, 0.1)",

        tension: 0.4,

        fill: true,
      },

      {
        label: "Discharges",

        data: trends?.discharges || [],

        borderColor: "#9CA3AF",

        borderDash: [5, 5],

        tension: 0.4,

        fill: false,
      },
    ],
  };

  const lineOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom" as const,

        align: "start" as const,

        labels: {
          boxWidth: 10,

          usePointStyle: true,
        },
      },
    },

    scales: {
      y: {
        display: false,
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="p-10 text-lg font-semibold">Loading Dashboard...</div>
    );
  }

  return (
    <div className="w-full bg-[#FBF8FF] p-8 min-h-screen">
      <div className="pb-6">
        <h1 className="font-bold text-3xl text-[#1E3A8A]">
          Hospital Occupancy — Live
        </h1>

        <p className="text-gray-500 font-medium mt-1 text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="border-r border-gray-100 pr-6">
            <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">
              Total Beds
            </h3>

            <div className="text-4xl font-bold text-gray-800">
              {stats?.totalBeds ?? 0}
            </div>

            <div className="text-xs text-gray-400 mt-1">PERMANENT</div>
          </div>

          <div className="border-r border-gray-100 pr-6">
            <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">
              Total Occupied
            </h3>

            <div className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              {stats?.occupied ?? 0}

              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                Live
              </span>
            </div>
          </div>

          <div className="border-r border-gray-100 pr-6">
            <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">
              Total Available
            </h3>

            <div className="text-4xl font-bold text-[#1E40AF]">
              {stats?.available ?? 0}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2 flex items-center gap-1">
              Total Cleaning
            </h3>

            <div className="text-4xl font-bold text-gray-800">
              {stats?.cleaning ?? 0}
            </div>

            <div className="text-xs text-gray-400 mt-1">Manual Refresh</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              System Load
            </h3>

            <span className="text-sm font-bold text-gray-600">
              {stats?.load ?? 0}%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-orange-400 to-red-500"
              style={{
                width: `${stats?.load ?? 0}%`,
              }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
            <span>LOW CAPACITY</span>

            <span>CRITICAL THRESHOLD</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800">
              Admission vs. Discharge Trends
            </h3>

            <select className="border border-gray-200 px-3 py-1 rounded-md text-xs font-medium bg-white text-gray-600">
              <option>Last 7 Days</option>
            </select>
          </div>

          <div className="flex-grow h-[220px]">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className="col-span-1 bg-[#111111] rounded-xl shadow-sm p-6 text-white flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 z-10">
            <h3 className="font-bold text-lg">System Alerts</h3>

            <span className="bg-red-500 text-xs font-bold px-2 py-0.5 rounded text-white">
              {alerts.length} ALERTS
            </span>
          </div>

          <div className="space-y-4 z-10 overflow-y-auto flex-grow pr-2">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} className="border-l-2 border-red-500 pl-3">
                  <div className="text-xs font-bold text-red-400 mb-0.5 uppercase tracking-wide">
                    {alert.title}
                  </div>

                  <p className="text-sm text-gray-200">{alert.message}</p>

                  <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">No active alerts</div>
            )}
          </div>

          <div className="pt-4 mt-auto border-t border-gray-800 z-10">
            <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider w-full text-left transition-colors">
              ACKNOWLEDGE ALL
            </button>
          </div>

          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-500 opacity-5 blur-3xl rounded-full"></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-800">
            Ward Occupancy Grid
          </h3>

          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Occupied
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Available
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Cleaning
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {wards.map((ward) => (
            <div
              key={ward.wardId}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h4 className="font-bold text-gray-700 mb-3 flex justify-between">
                {ward.wardName}

                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    ward.occupancyRate >= 90
                      ? "text-red-500 bg-red-50"
                      : ward.occupancyRate >= 75
                        ? "text-orange-500 bg-orange-50"
                        : "text-green-500 bg-green-50"
                  }`}
                >
                  {ward.occupancyRate}%
                </span>
              </h4>

              <div className="flex justify-between items-end border-b border-gray-100 pb-3 mb-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {ward.occupied}
                  </div>

                  <div className="text-[10px] text-gray-400">OCC</div>
                </div>

                <div className="text-center">
                  <div className="text-xl font-bold text-green-500">
                    {ward.available}
                  </div>

                  <div className="text-[10px] text-gray-400">AVAIL</div>
                </div>

                <div className="text-center">
                  <div className="text-xl font-bold text-orange-400">
                    {ward.cleaning}
                  </div>

                  <div className="text-[10px] text-gray-400">CLEAN</div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Cap: {ward.capacity}</span>

                <span
                  className={`font-semibold ${
                    ward.occupancyRate >= 90
                      ? "text-red-500"
                      : ward.occupancyRate >= 75
                        ? "text-orange-500"
                        : "text-green-500"
                  }`}
                >
                  {ward.occupancyRate >= 90
                    ? "High Strain"
                    : ward.occupancyRate >= 75
                      ? "Elevated"
                      : "Normal"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
