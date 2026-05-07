import React from "react";

import {
  Search,
  MoreHorizontal,
  Pencil,
  Ban,
  BedDouble,
  TriangleAlert,
  ShieldCheck,
  Activity,
} from "lucide-react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import Card from "./Card";
import AddWardModal from "./AddWardModal";

const wards = [
  {
    id: 1,
    name: "ICU – East Wing Level 4",
    specialization: "Critical Care",
    totalBeds: 24,
    available: 2,
    occupied: 21,
    cleaning: 1,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Maternity – North Block",
    specialization: "Obstetrics",
    totalBeds: 32,
    available: 14,
    occupied: 15,
    cleaning: 3,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Pediatrics – West 1",
    specialization: "Pediatric Care",
    totalBeds: 20,
    available: 0,
    occupied: 0,
    cleaning: 0,
    status: "INACTIVE",
  },
  {
    id: 4,
    name: "Cardiology Unit",
    specialization: "Cardiac Care",
    totalBeds: 18,
    available: 4,
    occupied: 10,
    cleaning: 4,
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Surgical Ward A",
    specialization: "Post-Op Recovery",
    totalBeds: 40,
    available: 12,
    occupied: 28,
    cleaning: 0,
    status: "ACTIVE",
  },
];

function WardManagement() {
  return (
    <div className="w-full bg-[#FBF8FF]">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Admin / Facility Management
        </p>

        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Ward & Bed Management
          </h1>

          <AddWardModal>
            <Button className="bg-[#1E40AF] hover:bg-[#18379c] text-white">
            + Add Ward
          </Button>
          </AddWardModal>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card title="Total Capacity" value={482} icon={<BedDouble />} />

        <Card title="Available Beds" value={124} icon={<ShieldCheck />} />

        <Card title="Turnaround Mode" value={18} icon={<Activity />} />

        <Card title="Occupancy Rate" value="84%" icon={<TriangleAlert />} />
      </div>

      <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" className="bg-[#1E40AF]">
              Active Wards
            </Button>

            <Button size="sm" variant="outline">
              Archived
            </Button>

            <Button size="sm" variant="ghost">
              Filters: Intensive Care
            </Button>
          </div>

          <div className="relative w-full lg:w-[280px]">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

            <Input placeholder="Search facilities..." className="pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-4 font-medium">Ward Name</th>

                <th className="pb-4 font-medium">Total Beds</th>

                <th className="pb-4 font-medium">Available</th>

                <th className="pb-4 font-medium">Occupied</th>

                <th className="pb-4 font-medium">Cleaning</th>

                <th className="pb-4 font-medium">Status</th>

                <th className="pb-4 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {wards.map((ward) => (
                <tr key={ward.id} className="border-b">
                  <td className="py-5">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-10 w-1 rounded-full ${
                          ward.status === "ACTIVE"
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      />

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {ward.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          Specialization: {ward.specialization}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 font-semibold text-gray-900">
                    {ward.totalBeds}
                  </td>

                  <td className="py-5 font-semibold text-green-600">
                    {ward.available.toString().padStart(2, "0")}
                  </td>

                  <td className="py-5 font-semibold text-gray-900">
                    {ward.occupied}
                  </td>

                  <td className="py-5 font-semibold text-orange-500">
                    {ward.cleaning.toString().padStart(2, "0")}
                  </td>

                  <td className="py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        ward.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {ward.status}
                    </span>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-3 text-gray-500">
                      <MoreHorizontal className="h-4 w-4 cursor-pointer" />

                      <Pencil className="h-4 w-4 cursor-pointer" />

                      <Ban className="h-4 w-4 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-700" />
              Critical Ward
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-gray-300" />
              General Ward
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">Rows per page: 10</p>

            <Pagination className="w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#">
                    <FaChevronLeft className="h-3 w-3" />
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">
                    <FaChevronRight className="h-3 w-3" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WardManagement;
