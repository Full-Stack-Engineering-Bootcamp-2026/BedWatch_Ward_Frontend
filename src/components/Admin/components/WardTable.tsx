import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { useSelector } from "react-redux";
type Ward = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  description: string;
  created_at: string;
  updated_at: string;
};

const rowsPerPage = 2;

const WardTable = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/wards", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWards(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWards();
  }, []);

  const totalPages = Math.ceil(wards.length / rowsPerPage);
  const token = useSelector((state: any) => state.auth.token);
  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentData = wards.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full overflow-x-auto rounded-md border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          Ward Capacity Analysis
        </h2>

        <input
          type="text"
          placeholder="Search wards..."
          className="w-full rounded-md border px-3 py-2 text-sm outline-none sm:w-[250px]"
        />
      </div>
      <table className="min-w-[650px] w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Ward Name</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((ward) => (
            <tr key={ward.id} className="border-b hover:bg-gray-50">
              <td className="py-3 text-blue-600 font-medium">{ward.name}</td>

              <td className="text-center">{ward.type}</td>

              <td className="text-center">{ward.capacity}</td>

              <td className="text-center">{ward.description}</td>
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
