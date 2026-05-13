import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";

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
import { useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import Card from "../components/Card";

import AddWardModal from "../components/AddWardModal";

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
  const token = useSelector((state: any) => state.auth.token);
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
    <div className="w-full bg-[#FBF8FF] mb-16">
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

            <div className="mt-8 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bed Number</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="py-10 text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : paginatedBeds.length > 0 ? (
                    paginatedBeds.map((bed) => (
                      <TableRow key={bed.id}>
                        <TableCell className="font-semibold text-[#1E40AF]">
                          {bed.bed_number}
                        </TableCell>

                        <TableCell>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              bed.status === "AVAILABLE"
                                ? "bg-green-100 text-green-700"
                                : bed.status === "CLEANING"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {bed.status}
                          </span>
                        </TableCell>

                        <TableCell className="text-gray-500">
                          {new Date(bed.updated_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="py-10 text-center">
                        No beds found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();

                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    >
                      <FaChevronLeft className="h-3 w-3" />
                    </PaginationLink>
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === index + 1}
                        onClick={(e) => {
                          e.preventDefault();

                          setCurrentPage(index + 1);
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();

                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    >
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
