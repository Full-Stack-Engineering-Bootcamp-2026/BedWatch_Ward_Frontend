import React, { useEffect, useMemo, useState } from "react";

import TransferReviewModal from "@/components/SrStaff/TransferModal";
import ExportHtmlButton from "@/components/SrStaff/component/exportHtmlButton";
import { buildTransfersExportHtml } from "@/components/SrStaff/component/exportTransfer";

export type Transfer = {
  id: number;

  patientName: string;

  patientMrn: string;

  fromWard: string;

  fromBed: string;

  toWard: string;

  toBed: string;

  requestedBy: string;

  requestedAt: string;

  status: string;
};

type TransferTableSectionProps = {
  transfers: Transfer[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
};

export default function TransferTableSection({
  transfers,
  activeTab,
  onTabChange,
  onApprove,
  onReject,
}: TransferTableSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    null,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageSize = 5;

  const filteredTransfers = useMemo(() => {
    let filtered = transfers;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (t) =>
          t.patientName.toLowerCase().includes(lower) ||
          t.patientMrn.toLowerCase().includes(lower) ||
          t.fromWard.toLowerCase().includes(lower) ||
          t.toWard.toLowerCase().includes(lower),
      );
    }

    return filtered;
  }, [searchTerm, transfers]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransfers.length / pageSize),
  );

  const paginatedTransfers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return filteredTransfers.slice(startIndex, endIndex);
  }, [filteredTransfers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);

    if (!open) {
      setSelectedTransfer(null);
    }
  };

  const handleApproveClick = async (id: number) => {
    try {
      await onApprove(id);

      setIsModalOpen(false);
      setSelectedTransfer(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectClick = async (id: number) => {
    try {
      await onReject(id);

      setIsModalOpen(false);
      setSelectedTransfer(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-blue-50 text-blue-600";

      case "APPROVED":
        return "bg-orange-50 text-orange-600";

      case "COMPLETED":
        return "bg-green-50 text-green-600";

      case "REJECTED":
        return "bg-red-50 text-red-600";

      case "CANCELLED":
        return "bg-gray-100 text-gray-500";

      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getDotColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-blue-600";

      case "APPROVED":
        return "bg-orange-600";

      case "COMPLETED":
        return "bg-green-600";

      case "REJECTED":
        return "bg-red-600";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="flex justify-between items-end p-6 border-b border-gray-100">
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-2">
                STATUS FILTER
              </p>

              <div className="flex bg-gray-50 p-1 rounded-md border border-gray-200">
                {["All", "Pending", "Completed", "Cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={
                      "px-4 py-1.5 text-sm rounded-sm transition-colors " +
                      (activeTab === tab
                        ? "bg-white shadow-sm font-medium text-gray-800"
                        : "text-gray-500 hover:text-gray-700")
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-semibold mb-2">
                DATE RANGE
              </p>

              <select className="border border-gray-200 px-4 py-1.5 rounded-md text-sm font-medium bg-white text-gray-700 h-[34px] w-[200px]">
                <option>Last 7 Days</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ExportHtmlButton
              label="Export TXT"
              fileName="inter-ward-transfers.txt"
              getHtml={() => buildTransfersExportHtml(filteredTransfers)}
            />

            <div className="relative">
              <input
                type="text"
                placeholder="Search Transfers..."
                className="pl-8 pr-4 py-1.5 border border-gray-200 rounded-md text-sm w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <svg
                className="absolute left-2.5 top-2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs text-left border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 font-semibold">PATIENT NAME</th>

              <th className="py-3 px-6 font-semibold">FROM WARD/BED</th>

              <th className="py-3 px-6 font-semibold">TO WARD/BED</th>

              <th className="py-3 px-6 font-semibold">REQUESTED BY</th>

              <th className="py-3 px-6 font-semibold">REQUESTED AT</th>

              <th className="py-3 px-6 font-semibold">STATUS</th>

              <th className="py-3 px-6 font-semibold text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTransfers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 px-6 text-center text-sm text-gray-400"
                >
                  No transfers found
                </td>
              </tr>
            ) : (
              paginatedTransfers.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50"
                >
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-800">
                      {t.patientName}
                    </div>

                    <div className="text-xs text-gray-400">
                      MRN: {t.patientMrn}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>

                      {t.fromWard}
                    </div>

                    <div className="text-xs text-gray-500 ml-4">
                      {t.fromBed}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>

                      {t.toWard}
                    </div>

                    <div className="text-xs text-gray-500 ml-4">{t.toBed}</div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-700">
                      {t.requestedBy}
                    </div>

                    <div className="text-xs text-gray-400">STAFF</div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-800">
                      {new Date(t.requestedAt).toLocaleTimeString()}
                    </div>

                    <div className="text-xs text-gray-400">
                      {new Date(t.requestedAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="py-4 px-6 font-bold">
                    <span
                      className={`px-2 py-1 rounded-sm text-xs flex items-center gap-1 w-max ${getStatusStyle(
                        t.status,
                      )}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${getDotColor(
                          t.status,
                        )}`}
                      ></span>

                      {t.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    {t.status === "PENDING" ? (
                      <button
                        onClick={() => {
                          setSelectedTransfer(t);
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-[#1E40AF] text-white rounded text-xs font-semibold hover:bg-blue-800 transition-colors"
                      >
                        Review Request
                      </button>
                    ) : (
                      <button
                        disabled
                        className="p-1.5 text-gray-300 cursor-not-allowed"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
          <span>
            Showing{" "}
            {filteredTransfers.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}{" "}
            - {Math.min(currentPage * pageSize, filteredTransfers.length)} of{" "}
            {filteredTransfers.length} active transfers
          </span>

          <div className="flex gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                "w-6 h-6 rounded flex items-center justify-center border border-gray-200 " +
                (currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-50")
              }
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={
                    "w-6 h-6 rounded flex items-center justify-center border " +
                    (currentPage === page
                      ? "bg-blue-50 text-blue-600 font-medium border-blue-100"
                      : "text-gray-600 border-transparent hover:bg-gray-50")
                  }
                >
                  {page}
                </button>
              ),
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                "w-6 h-6 rounded flex items-center justify-center border border-gray-200 " +
                (currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-50")
              }
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <TransferReviewModal
        open={isModalOpen}
        transfer={selectedTransfer}
        onOpenChange={handleModalOpenChange}
        onApprove={handleApproveClick}
        onReject={handleRejectClick}
      />
    </>
  );
}
