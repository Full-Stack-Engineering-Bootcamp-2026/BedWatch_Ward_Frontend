import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Ward = {
  name: string;
  total: number;
  occupied: number;
  available: number;
  cleaning: number;
  occupancy: number;
};

const data: Ward[] = [
  {
    name: "Intensive Care Unit (ICU)",
    total: 24,
    occupied: 22,
    available: 1,
    cleaning: 1,
    occupancy: 91.6,
  },
  {
    name: "General Dept (A&E)",
    total: 48,
    occupied: 45,
    available: 0,
    cleaning: 3,
    occupancy: 93.7,
  },
  {
    name: "Intensive Care Unit (ICU)",
    total: 24,
    occupied: 22,
    available: 1,
    cleaning: 1,
    occupancy: 91.6,
  },
  {
    name: "Emergency Dept (A&E)",
    total: 48,
    occupied: 45,
    available: 0,
    cleaning: 3,
    occupancy: 93.7,
  },
  {
    name: "Intensive Care Unit (ICU)",
    total: 24,
    occupied: 22,
    available: 1,
    cleaning: 1,
    occupancy: 91.6,
  },
  {
    name: "Emergency Dept (A&E)",
    total: 48,
    occupied: 45,
    available: 0,
    cleaning: 3,
    occupancy: 93.7,
  },
];
const rowsPerPage = 2;

const WardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);
  return (
    <div className="w-full max-w-[922px] bg-white border border-gray-200 rounded-md shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Ward Capacity Analysis
        </h2>

        <input
          type="text"
          placeholder="Search wards..."
          className="border px-3 py-1 rounded-md text-sm outline-none"
        />
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Ward Name</th>
            <th>Total</th>
            <th>Occupied</th>
            <th>Available</th>
            <th>Cleaning</th>
            <th>Occupancy %</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((ward, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3 text-blue-600 font-medium">{ward.name}</td>

              <td className="text-center">{ward.total}</td>
              <td className="text-center">{ward.occupied}</td>
              <td className="text-center">{ward.available}</td>
              <td className="text-center">{ward.cleaning}</td>

              <td
                className={`text-center font-semibold ${
                  ward.occupancy > 90
                    ? "text-red-500"
                    : ward.occupancy > 75
                      ? "text-blue-500"
                      : "text-green-600"
                }`}
              >
                {ward.occupancy}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default WardTable;
