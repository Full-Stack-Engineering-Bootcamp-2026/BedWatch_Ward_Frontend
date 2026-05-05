import React from "react";
import { FaHospital, FaRegUserCircle } from "react-icons/fa";
import { FaBed } from "react-icons/fa";

import Card from "./Card";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdPieChartOutline } from "react-icons/md";
import WardTable from "./WardTable";
import { OccupancyChart } from "./OccupancyChart";

function Dashboard() {
  return (
    <div className="w-full bg-[#FBF8FF] p-8">
      <div className="flex flex-col pb-6">
        <h1 className="font-bold text-3xl">Hospital Overview</h1>
        <span className="text-gray-500 font-semibold">
          Real-time enterprise-wide capacity and resource metrices
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-4">
        <Card title="Total Wards" value={18} icon={<FaHospital />} />
        <Card title="Total Beds" value={432} icon={<FaBed />} />
        <Card title="Occupancy " value={120} icon={<MdPieChartOutline />} />
        <Card title="Active Staff" value={300} icon={<FaRegUserCircle />} />
        <Card title="Tran Beds" value={132} icon={<FaArrowRightArrowLeft />} />
      </div>

      <div className="pt-5 flex gap-3">
        <WardTable/>
        <OccupancyChart/>
      </div>
    </div>
  );
}

export default Dashboard;
