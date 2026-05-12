import React, { useEffect, useState } from "react";

import TransferTableSection, {
  Transfer,
} from "@/components/SrStaff/component/TransferTable";

import {
  getTransfers,
  getPendingTransfers,
  getCompletedTransfers,
  getRejectedTransfers,
  approveTransfer,
  rejectTransfer,
} from "@/services/srStaffTransfer.service";
import { toast } from "react-toastify";
export default function TransferRequestsPage() {
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
      console.error("Failed to fetch transfer requests", error);
      toast.error("Failed to fetch transfer requests");
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
      console.error(error);
      toast.error("Bed already occupied, please reject the request");
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-lg font-semibold">
        Loading Transfer Requests...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FBF8FF] p-8 min-h-screen">
      <div className="flex justify-between items-center pb-6">
        <div>
          <span className="text-gray-500 font-medium text-xs tracking-wider uppercase">
            OPERATIONS &gt; TRANSFER REQUESTS
          </span>

          <h1 className="font-bold text-3xl mt-1 text-[#1E3A8A]">
            Transfer Requests
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
    </div>
  );
}
