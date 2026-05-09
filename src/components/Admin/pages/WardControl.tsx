import React, { useEffect, useState } from "react";

import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

import EditWardModal from "../components/EditWardModal";

import DeleteWardModal from "../components/DeleteWardModal";

type WardType = {
  id: number;
  name: string;
  beds: number;
  status: string;
};

function WardControl() {
  const token = useSelector((state: any) => state.auth.token);
  const [wards, setWards] = useState<WardType[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchAllWards = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/v1/wardsAdmin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWards(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWards();
  }, []);

  const handleEdit = async (updatedWard: { id: number; capacity: number }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/wardsAdmin/${updatedWard.id}`,
        {
          capacity: updatedWard.capacity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedData = response.data.data;

      setWards((prev) =>
        prev.map((ward) =>
          ward.id === updatedData.id
            ? {
                ...ward,
                beds: updatedData.capacity,
              }
            : ward,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/wardsAdmin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWards((prev) => prev.filter((ward) => ward.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[590px] w-full bg-[#FBF8FF]">
      <div className="mb-6">
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Ward Management
        </h1>
      </div>

      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader className="border-b bg-white">
          <CardTitle className="text-2xl font-bold text-[#0F172A]">
            All Wards
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="h-14 px-6 text-sm font-semibold text-gray-600">
                  Ward Name
                </TableHead>

                <TableHead className="text-sm font-semibold text-gray-600">
                  Total Beds
                </TableHead>

                <TableHead className="text-sm font-semibold text-gray-600">
                  Status
                </TableHead>

                <TableHead className="text-right text-sm font-semibold text-gray-600">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : wards.length > 0 ? (
                wards.map((ward) => (
                  <TableRow key={ward.id} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {ward.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          Hospital Ward Unit
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="font-semibold text-gray-700">
                      {ward.beds}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          ward.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ward.status}
                      </span>
                    </TableCell>

                    <TableCell className="pr-6">
                      <div className="flex justify-end gap-3">
                        <EditWardModal ward={ward} onSave={handleEdit} />

                        <DeleteWardModal ward={ward} onDelete={handleDelete} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-sm text-gray-500"
                  >
                    No wards available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default WardControl;
