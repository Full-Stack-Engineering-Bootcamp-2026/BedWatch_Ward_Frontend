import React, { useState } from "react";

import { BedDouble, TriangleAlert, ShieldCheck, Activity } from "lucide-react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import {
  Card as ShadcnCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import Card from "../components/Card";
import AddWardModal from "../components/AddWardModal";

const wards = [
  {
    id: 1,
    name: "ICU – East Wing Level 4",
    totalBeds: 24,
    available: 2,
    occupied: 21,
    cleaning: 1,
  },
  {
    id: 2,
    name: "Maternity – North Block",
    totalBeds: 32,
    available: 14,
    occupied: 15,
    cleaning: 3,
  },
  {
    id: 3,
    name: "Cardiology Unit",
    totalBeds: 18,
    available: 4,
    occupied: 10,
    cleaning: 4,
  },
];

const bedData = [
  {
    bedNo: "C-101",
    status: "Occupied",
    patient: "Thompson, James",
    lastChange: "Oct 24, 08:30 AM",
  },
  {
    bedNo: "C-102",
    status: "Available",
    patient: "None",
    lastChange: "Oct 24, 11:15 AM",
  },
  {
    bedNo: "C-103",
    status: "Cleaning",
    patient: "Discharged Patient",
    lastChange: "Oct 24, 12:45 PM",
  },
  {
    bedNo: "C-104",
    status: "Occupied",
    patient: "Garcia, Elena",
    lastChange: "Oct 22, 02:10 PM",
  },
];

function WardManagement() {
  const [selectedWardId, setSelectedWardId] = useState("1");

  const selectedWard = wards.find(
    (ward) => ward.id.toString() === selectedWardId,
  );

  return (
    <div className="w-full bg-[#FBF8FF]">
      <div className="mb-6">
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

      <ShadcnCard className="mt-6 rounded-2xl shadow-sm">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-2xl">Select Ward</CardTitle>

            <p className="mt-1 text-sm text-gray-500">
              Select ward to view bed details
            </p>
          </div>

          <div className="w-full lg:w-[320px]">
            <Select value={selectedWardId} onValueChange={setSelectedWardId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Ward" />
              </SelectTrigger>

              <SelectContent>
                {wards.map((ward) => (
                  <SelectItem key={ward.id} value={ward.id.toString()}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </ShadcnCard>

      {selectedWard && (
        <ShadcnCard className="mt-6 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{selectedWard.name}</CardTitle>

            <p className="text-sm text-gray-500">
              Operational Capacity: {selectedWard.occupied} /{" "}
              {selectedWard.totalBeds} Beds Occupied
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card
                title="Total Beds"
                value={selectedWard.totalBeds}
                icon={<BedDouble />}
              />

              <Card
                title="Available"
                value={selectedWard.available}
                icon={<ShieldCheck />}
              />

              <Card
                title="Cleaning"
                value={selectedWard.cleaning}
                icon={<Activity />}
              />

              <Card
                title="Occupied"
                value={selectedWard.occupied}
                icon={<TriangleAlert />}
              />
            </div>

            <div className="mt-8 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bed Number</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead>Current Patient</TableHead>

                    <TableHead>Last Status Change</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {bedData.map((bed, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold text-[#1E40AF]">
                        {bed.bedNo}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            bed.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : bed.status === "Cleaning"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {bed.status}
                        </span>
                      </TableCell>

                      <TableCell className="font-medium">
                        {bed.patient}
                      </TableCell>

                      <TableCell className="text-gray-500">
                        {bed.lastChange}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-end">
              <Pagination>
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
                    <PaginationLink href="#">
                      <FaChevronRight className="h-3 w-3" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </ShadcnCard>
      )}
    </div>
  );
}

export default WardManagement;
