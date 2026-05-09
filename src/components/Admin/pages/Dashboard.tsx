import React, { useEffect, useState } from "react";

import { FaHospital, FaRegUserCircle, FaUserPlus, FaBed } from "react-icons/fa";

import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdPieChartOutline } from "react-icons/md";

import axios from "axios";

import Card from "../components/Card";
import WardTable from "../components/WardTable";
import { OccupancyChart } from "../components/OccupancyChart";
import ActionCard from "../components/ActionCard";
import ReportCard from "../components/ReportCard";
import AddWardModal from "../components/AddWardModal";
import AddStaffModal from "../components/AddStaffModal";

type WardSummary = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  description: string;
  availableBeds: number;
  occupiedBeds: number;
  cleaningBeds: number;
};

function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    totalWards: 0,
    totalBeds: 0,
    occupiedBeds: 0,
    availableBeds: 0,
    cleaningBeds: 0,
  });
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/wards/summary",
      );

      const wards = response.data.data;

      setDashboardStats({
        totalWards: wards.length,

        totalBeds: wards.reduce(
          (sum: number, ward: WardSummary) => sum + ward.capacity,
          0,
        ),

        occupiedBeds: wards.reduce(
          (sum: number, ward: WardSummary) => sum + ward.occupiedBeds,
          0,
        ),

        availableBeds: wards.reduce(
          (sum: number, ward: WardSummary) => sum + ward.availableBeds,
          0,
        ),

        cleaningBeds: wards.reduce(
          (sum: number, ward: WardSummary) => sum + ward.cleaningBeds,
          0,
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="w-full bg-[#FBF8FF] overflow-hidden">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hospital Overview</h1>

        <p className="mt-1 font-medium text-gray-500">
          Real-time enterprise-wide capacity and resource metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        <Card
          title="Total Wards"
          value={dashboardStats.totalWards}
          icon={<FaHospital />}
        />

        <Card
          title="Total Beds"
          value={dashboardStats.totalBeds}
          icon={<FaBed />}
        />

        <Card
          title="Occupancy"
          value={dashboardStats.occupiedBeds}
          icon={<MdPieChartOutline />}
        />

        <Card
          title="Available"
          value={dashboardStats.availableBeds}
          icon={<FaRegUserCircle />}
        />

        <Card
          title="Cleaning"
          value={dashboardStats.cleaningBeds}
          icon={<FaArrowRightArrowLeft />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 items-start gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          <WardTable />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AddWardModal>
                <div>
                  <ActionCard
                    title="Add Ward"
                    description="Configure new facility space"
                    icon={<FaHospital />}
                  />
                </div>
              </AddWardModal>

              <AddStaffModal>
                <div>
                  <ActionCard
                    title="Add Staff"
                    description="Provision clinician access"
                    icon={<FaUserPlus />}
                  />
                </div>
              </AddStaffModal>
            </div>

            <div className="h-full">
              <ReportCard />
            </div>
          </div>
        </div>

        <OccupancyChart />
      </div>
    </div>
  );
}

export default Dashboard;
