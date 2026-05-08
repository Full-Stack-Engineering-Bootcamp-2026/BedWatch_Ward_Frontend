import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";

import { BedDouble, TriangleAlert, ShieldCheck, Activity } from "lucide-react";


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

import Card from "./component/Card";

type WardType = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  description: string;

  availableBeds: number;
  occupiedBeds: number;
  cleaningBeds: number;
};

type BedType = {
  id: number;
  bed_number: string;
  status: string;
  updated_at: string;
};

function WardManagement() {
  const [wards, setWards] = useState<WardType[]>([]);

  const [beds, setBeds] = useState<BedType[]>([]);

  const [selectedWardId, setSelectedWardId] = useState("");

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const fetchWardSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/wardsAdmin/summary",
      );

      setWards(response.data.data);

      if (response.data.data.length > 0) {
        setSelectedWardId(response.data.data[0].id.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBedsByWard = async (wardId: string) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/api/v1/wardsAdmin/${wardId}/beds`,
      );

      setBeds(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWardSummary();
  }, []);

  useEffect(() => {
    setCurrentPage(1);

    if (selectedWardId) {
      fetchBedsByWard(selectedWardId);
    }
  }, [selectedWardId]);

  const selectedWard = useMemo(() => {
    return wards.find((ward) => ward.id.toString() === selectedWardId);
  }, [wards, selectedWardId]);

  const totalPages = Math.ceil(beds.length / rowsPerPage);

  const paginatedBeds = beds.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const totalCapacity = wards.reduce((acc, ward) => acc + ward.capacity, 0);

  const totalAvailable = wards.reduce(
    (acc, ward) => acc + ward.availableBeds,
    0,
  );

  const totalCleaning = wards.reduce((acc, ward) => acc + ward.cleaningBeds, 0);

  const totalOccupied = wards.reduce((acc, ward) => acc + ward.occupiedBeds, 0);

  const occupancyRate =
    totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  return (
    <div className="w-full bg-[#FBF8FF]">
      <div className="mb-6">
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">All Wards View</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Total Capacity"
          value={totalCapacity}
          icon={<BedDouble />}
        />

        <Card
          title="Available Beds"
          value={totalAvailable}
          icon={<ShieldCheck />}
        />

        <Card title="Cleaning Beds" value={totalCleaning} icon={<Activity />} />

        <Card
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={<TriangleAlert />}
        />
      </div>

      <ShadcnCard className="mt-6 rounded-2xl shadow-sm overflow-visible">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-2xl">Select Ward</CardTitle>

            <p className="mt-1 text-sm text-gray-500">
              Select ward to view bed details
            </p>
          </div>

          <div className="w-full lg:w-[320px]">
            <Select value={selectedWardId} onValueChange={setSelectedWardId}>
              <SelectTrigger className="h-11 w-full border border-gray-200 bg-[#F8FAFC] hover:bg-[#F1F5F9]">
                <SelectValue placeholder="Select Ward" />
              </SelectTrigger>

              <SelectContent position="popper" className="w-[320px] bg-white">
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
              Operational Capacity: {selectedWard.occupiedBeds} /{" "}
              {selectedWard.capacity} Beds Occupied
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card
                title="Total Beds"
                value={selectedWard.capacity}
                icon={<BedDouble />}
              />

              <Card
                title="Available"
                value={selectedWard.availableBeds}
                icon={<ShieldCheck />}
              />

              <Card
                title="Cleaning"
                value={selectedWard.cleaningBeds}
                icon={<Activity />}
              />

              <Card
                title="Occupied"
                value={selectedWard.occupiedBeds}
                icon={<TriangleAlert />}
              />
            </div>
          </CardContent>
        </ShadcnCard>
      )}
    </div>
  );
}

export default WardManagement;
