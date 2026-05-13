import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  FaSearch,
  FaFilter,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { MdHealthAndSafety } from "react-icons/md";

import { HiUserGroup } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import AddStaffModal from "../components/AddStaffModal";
import Card from "../components/Card";

type StaffType = {
  id: number;
  name: string;
  email: string;
  role: string;
  ward: {
    id: number;
    name: string;
  } | null;
};

function StaffManagement() {
  const token = useSelector((state: any) => state.auth.token);
  const [staffData, setStaffData] = useState<StaffType[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");

  const fetchAllStaff = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/v1/usersAdmin/allstaff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStaffData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStaff();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredStaff = useMemo(() => {
    return staffData.filter((staff) => {
      const matchesSearch =
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === "ALL" || staff.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [staffData, searchTerm, selectedRole]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full bg-[#FBF8FF]">
      <div className="mb-6">
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Staff Accounts</h1>

          <AddStaffModal>
            <Button className="bg-[#1E40AF] text-white hover:bg-[#18379c]">
              + Add Staff
            </Button>
          </AddStaffModal>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr_auto]">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />

            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="h-10 w-[180px] bg-gray-300 text-black ">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>

            <SelectContent position="popper" className="w-[180px]  bg-gray-300">
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="STAFF">Staff</SelectItem>
              <SelectItem value="SENIOR_STAFF">Senior Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-4 font-medium">Name</th>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Email</th>
                <th className="pb-4 font-medium">Assigned Ward</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredStaff.length > 0 ? (
                paginatedStaff.map((staff) => (
                  <tr key={staff.id} className="border-b">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                          {staff.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
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

                    <td className="py-5 text-sm text-gray-500">
                      {staff.email}
                    </td>

                    <td className="py-5 text-sm text-gray-700">
                      {staff.ward?.name || "Not Assigned"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-500">
                    No staff found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of{" "}
            {filteredStaff.length} staff members
          </p>

          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <FaChevronLeft className="h-3 w-3" />
                </Button>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <Button
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(index + 1)}
                    className={
                      currentPage === index + 1 ? "bg-[#1E40AF] text-white" : ""
                    }
                  >
                    {index + 1}
                  </Button>
                </PaginationItem>
              ))}

              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <FaChevronRight className="h-3 w-3" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          title="Total Personnel"
          value={staffData.length}
          icon={<FaUsers className="h-5 w-5" />}
        />

        <Card
          title="Staff"
          value={staffData.filter((staff) => staff.role === "STAFF").length}
          icon={<HiUserGroup className="h-5 w-5" />}
        />

        <Card
          title="Senior Staff"
          value={
            staffData.filter((staff) => staff.role === "SENIOR_STAFF").length
          }
          icon={<MdHealthAndSafety className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}

export default StaffManagement;
