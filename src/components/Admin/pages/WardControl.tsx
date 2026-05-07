import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditWardModal from "../components/EditWardModal";

import DeleteWardModal from "../components/DeleteWardModal";

const initialWards = [
  {
    id: 1,
    name: "ICU – East Wing",
    beds: 24,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Maternity Ward",
    beds: 32,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Cardiology Unit",
    beds: 18,
    status: "INACTIVE",
  },
];

function WardControl() {
  const [wards, setWards] = useState(initialWards);

  const handleEdit = (updatedWard: any) => {
    setWards((prev) =>
      prev.map((ward) => (ward.id === updatedWard.id ? updatedWard : ward)),
    );
  };

  const handleDelete = (id: number) => {
    setWards((prev) => prev.filter((ward) => ward.id !== id));
  };

  return (
    <div className="w-full bg-[#FBF8FF] h-[590px]">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Admin / Ward Control
        </p>

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
              {wards.map((ward) => (
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
              ))}
            </TableBody>
          </Table>

          {wards.length === 0 && (
            <div className="flex h-40 items-center justify-center text-sm text-gray-500">
              No wards available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default WardControl;
