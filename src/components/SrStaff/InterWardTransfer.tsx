import React, { useEffect, useState } from "react";

import TransferTableSection, {Transfer} from "@/components/SrStaff/component/TransferTable";

import {
  getTransfers,
  getPendingTransfers,
  getCompletedTransfers,
  getRejectedTransfers,
  approveTransfer,
  rejectTransfer,
} from "@/services/srStaffTransfer.service";

import { toast } from "react-toastify";

export default function TransfersList() {
  const [activeTab, setActiveTab] = useState("All");

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const [loading, setLoading] = useState(true);

  const normalizeTransfer = (item: any): Transfer => {
    const patientName =
      item.patientName ||
      item.patient?.name ||
      `${item.patient?.first_name || ""} ${item.patient?.last_name || ""}`.trim() ||
      "Unknown Patient";

    const patientMrn =
      item.patientMrn ||
      item.patient?.mrn ||
      item.patient?.medical_record_number ||
      item.patient?.id ||
      "N/A";

    return {
      id: item.id,

      patientName,

      patientMrn: String(patientMrn),

      fromWard: item.fromWard || item.from_bed?.ward?.name || "Unknown Ward",

      fromBed: item.fromBed || item.from_bed?.bed_number || "Unknown Bed",

      toWard: item.toWard || item.to_bed?.ward?.name || "Unknown Ward",

      toBed: item.toBed || item.to_bed?.bed_number || "Unknown Bed",

      requestedBy:
        item.requestedBy ||
        item.requested_by?.name ||
        item.requested_by?.email ||
        "Unknown Staff",

      requestedAt:
        item.requestedAt || item.requested_at || new Date().toISOString(),

      status: item.status,
    };
  };

  const fetchTransfers = async () => {
    try {
      setLoading(true);

      let data: any[] = [];

      if (activeTab === "All") {
        data = await getTransfers();
      } else if (activeTab === "Pending") {
        data = await getPendingTransfers();
      } else if (activeTab === "Completed") {
        data = await getCompletedTransfers();
      } else if (activeTab === "Cancelled") {
        data = await getRejectedTransfers();
      }

      setTransfers(data.map(normalizeTransfer));
    } catch (error) {
      console.error("Failed to fetch transfers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, [activeTab]);
  const handleReject = async (id: number) => {
    try {
      await rejectTransfer(id);

      toast.success("Transfer rejected successfully");

      fetchTransfers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject transfer");
      throw error;
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approveTransfer(id);

      toast.success("Transfer approved successfully");

      fetchTransfers();
    } catch (error) {
      toast.error("Bed already occupied, please reject the request");
      console.error(error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-lg font-semibold">Loading Transfers...</div>
    );
  }

  return (
    <div className="w-full bg-[#FBF8FF] p-8 min-h-screen">
      <div className="flex justify-between items-center pb-6">
        <div>
          <span className="text-gray-500 font-medium text-xs tracking-wider uppercase">
            OPERATIONS &gt; INTER-WARD TRANSFERS
          </span>

          <h1 className="font-bold text-3xl mt-1 text-[#1E3A8A]">
            Inter-Ward Transfers
          </h1>
        </div>
      </div>

      <TransferTableSection
        transfers={transfers}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs mb-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              AVG. PENDING TIME
            </div>

            <div className="text-4xl font-bold text-gray-800 flex items-end gap-3">
              42m
              <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded flex items-center">
                ↓ 12%
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs mb-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                ></path>
              </svg>
              TOTAL VOLUMES (24H)
            </div>
            <div className="text-4xl font-bold text-gray-800 flex items-end gap-3">
              {transfers.length}
              <span className="text-sm font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded flex items-center">
                ↑ 8%
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-[#1E40AF] rounded-xl shadow-sm p-6 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Hospital Capacity Alert</h3>

            <p className="text-sm text-blue-100 opacity-90 leading-relaxed">
              ICU North is currently at high occupancy. Prioritize outbound
              transfers for stable patients.
            </p>
          </div>

          <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded text-sm w-max transition-colors mt-4">
            REVIEW ICU STATUS
          </button>
        </div>
      </div>
    </div>
  );
}
