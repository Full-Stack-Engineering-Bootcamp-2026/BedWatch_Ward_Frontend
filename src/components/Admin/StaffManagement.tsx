import React from "react";

import { Search, Filter, Users, Zap, Hourglass } from "lucide-react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import AddStaffModal from "./AddStaffModal";
import Card from "./Card";

const staffData = [
  {
    id: 1,
    initials: "JD",
    name: "Dr. Julian Danvers",
    role: "CLINICIAN",
    email: "j.danvers@hospital.net",
    ward: "Intensive Care Unit (ICU)",
    status: "ACTIVE",
  },
  {
    id: 2,
    initials: "SA",
    name: "Sarah Al-Fayed",
    role: "WARD MANAGER",
    email: "s.alfayed@hospital.net",
    ward: "Pediatric Ward A",
    status: "ACTIVE",
  },
  {
    id: 3,
    initials: "MK",
    name: "Michael Kessler",
    role: "NURSE",
    email: "m.kessler@hospital.net",
    ward: "Not Assigned",
    status: "INACTIVE",
  },
  {
    id: 4,
    initials: "ER",
    name: "Elena Rodriguez",
    role: "CLINICIAN",
    email: "e.rodriguez@hospital.net",
    ward: "Emergency Dept",
    status: "ACTIVE",
  },
];

function StaffManagement() {
  return (
    <div className="w-full bg-[#FBF8FF]">
      <div className="mb-6">
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Staff Accounts</h1>

          <AddStaffModal>
            <Button className="bg-[#1E40AF] hover:bg-[#18379c] text-white">
              + Add Staff
            </Button>
          </AddStaffModal>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

            <Input placeholder="Search by name or email..." className="pl-10" />
          </div>

          <select className="h-10 rounded-md border bg-white px-3 text-sm outline-none">
            <option>All Roles</option>
            <option>Clinician</option>
            <option>Nurse</option>
            <option>Ward Manager</option>
          </select>

          <select className="h-10 rounded-md border bg-white px-3 text-sm outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-4 font-medium">Name</th>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Email</th>
                <th className="pb-4 font-medium">Assigned Ward</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {staffData.map((staff) => (
                <tr key={staff.id} className="border-b">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                        {staff.initials}
                      </div>

                      <span className="font-medium text-gray-900">
                        {staff.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-5">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {staff.role}
                    </span>
                  </td>

                  <td className="py-5 text-sm text-gray-500">{staff.email}</td>

                  <td className="py-5 text-sm text-gray-700">{staff.ward}</td>

                  <td className="py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        staff.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>

                  <td className="py-5">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            Showing 4 of 128 staff members
          </p>

          <Pagination className="justify-end">
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

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Total Personnel"
          value={128}
          icon={<Users className="h-5 w-5" />}
        />

        <Card
          title="Active Now"
          value={42}
          icon={<Zap className="h-5 w-5" />}
        />

        <Card
          title="Pending Setup"
          value={3}
          icon={<Hourglass className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}

export default StaffManagement;
