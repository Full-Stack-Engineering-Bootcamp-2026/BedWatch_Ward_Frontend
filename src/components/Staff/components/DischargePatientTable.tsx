import { useState } from "react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";





const patients = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,

  name: `Patient ${index + 1}`,

  bed: `Bed ${index + 1}-A`,

  ward:
    index % 2 === 0
      ? "Cardiology"
      : "Neurology",

  admitted: "Oct 12, 2023",

  status:
    index % 3 === 0
      ? "CLEARED"
      : index % 3 === 1
      ? "LAB PENDING"
      : "FINAL REVIEW",
}));

export default function DischargeTable() {
  const [currentPage, setCurrentPage] =
    useState(1);

  const rowsPerPage = 5;

  const totalPages = Math.ceil(
    patients.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const currentPatients = patients.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "CLEARED":
        return "bg-green-100 text-green-700 border-green-200";

      case "LAB PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "FINAL REVIEW":
        return "bg-blue-100 text-blue-700 border-blue-200";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr className="text-left text-sm text-slate-500">
            <th className="p-4 font-medium">
              Patient Name
            </th>

            <th className="font-medium">
              Bed
            </th>

            <th className="font-medium">
              Ward
            </th>

            <th className="font-medium">
              Admitted On
            </th>

            <th className="font-medium">
              Clinical Status
            </th>

            <th className="text-right pr-4 font-medium">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {currentPatients.map((patient) => (
            <tr
              key={patient.id}
              className="border-b last:border-none hover:bg-slate-50 transition"
            >
              {/* Patient */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-[#00288E] flex items-center justify-center text-sm font-semibold">
                    {patient.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-slate-800">
                      {patient.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      ID: 0293-X01
                    </p>
                  </div>
                </div>
              </td>

            
              <td className="text-sm text-slate-700">
                {patient.bed}
              </td>

         
              <td className="text-sm text-slate-700">
                {patient.ward}
              </td>

      
              <td className="text-sm text-slate-700">
                {patient.admitted}
              </td>

  
              <td>
                <Badge
                  className={`rounded-md border font-medium px-2 py-1 text-[11px] ${getStatusStyle(
                    patient.status
                  )}`}
                >
                  {patient.status}
                </Badge>
              </td>

      
              <td className="text-right pr-4">
<Button
  disabled={patient.status === "LAB PENDING"}
  className={`text-white h-10 w-[120px] ${
    patient.status === "FINAL REVIEW"
      ? "bg-[#006780] hover:bg-[#00566b]"
      : patient.status === "LAB PENDING"
      ? "bg-[#F5F5F5] text-[#B0B0B0] border border-[#E5E5E5] hover:bg-[#F5F5F5] cursor-not-allowed"
      : "bg-[#00288E] hover:bg-[#18379c]"
  }`}
>
  {patient.status === "FINAL REVIEW"
    ? "Review"
    : "Discharge"}
</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
        <p className="text-xs text-slate-500">
          Showing {startIndex + 1}–
          {Math.min(
            startIndex + rowsPerPage,
            patients.length
          )}{" "}
          of {patients.length} Patients
        </p>

        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="w-8 h-8 border rounded-md text-slate-500 hover:bg-slate-50 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`w-8 h-8 rounded-md text-sm ${
                  currentPage === index + 1
                    ? "bg-[#00288E] text-white"
                    : "border text-slate-500 hover:bg-slate-50"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="w-8 h-8 border rounded-md text-slate-500 hover:bg-slate-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}