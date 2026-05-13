import React, { useEffect, useMemo, useState } from "react";
import TransferReviewModal from "@/components/SrStaff/TransferModal";
import ExportHtmlButton from "@/components/SrStaff/component/exportHtmlButton";
import { buildTransfersExportHtml } from "@/components/SrStaff/component/exportTransfer";
import {
  requestBrowserNotificationPermission,
  showBrowserNotification,
} from "@/lib/SrStaffBrowserNotification";
import {
  getTransfers,
  getPendingTransfers,
  getCompletedTransfers,
  getRejectedTransfers,
  approveTransfer,
  rejectTransfer,
} from "@/services/srStaffTransfer.service";
import { toast } from "react-toastify";

type Transfer = {
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

export default function TransfersList() {
  const [activeTab, setActiveTab] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    null,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      } else if (activeTab === "Approved") {
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
  }, [searchTerm, transfers, activeTab]);

  //   const handleReject = async (id: number) => {
  //     try {
  //       await rejectTransfer(id);

  //       fetchTransfers();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const handleApprove = async (id: number) => {
  //     try {
  //       await approveTransfer(id);

  //       fetchTransfers();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleReject = async (id: number) => {
    try {
      await rejectTransfer(id);
      const transferDetails = selectedTransfer;
      if (transferDetails) {
        await showBrowserNotification({
          title: "Transfer Request Rejected",
          body: `Request rejected from ${transferDetails.fromWard} / ${transferDetails.fromBed} to ${transferDetails.toWard} / ${transferDetails.toBed}`,
          tag: `transfer-rejected-${transferDetails.id}`,
        });
      }

      setIsModalOpen(false);
      setSelectedTransfer(null);

      fetchTransfers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approveTransfer(id);
      const transferDetails = selectedTransfer;
      if (transferDetails) {
        await showBrowserNotification({
          title: "Transfer Request Approved",
          body: `Request approved from ${transferDetails.fromWard} / ${transferDetails.fromBed} to ${transferDetails.toWard} / ${transferDetails.toBed}`,
          tag: `transfer-approved-${transferDetails.id}`,
        });
      }

      setIsModalOpen(false);
      setSelectedTransfer(null);

      fetchTransfers();
    } catch (error) {
      toast.error("Bed already occupied, please reject the request");
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

        <div className="flex gap-4">
          <ExportHtmlButton
            label="Export TXT"
            fileName="inter-ward-transfers.txt"
            getHtml={() => buildTransfersExportHtml(filteredTransfers)}
          />
          <button
            onClick={requestBrowserNotificationPermission}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Enable Notifications
          </button>
        </div>
      </div>

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
                    onClick={() => setActiveTab(tab)}
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
            {filteredTransfers.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-100 hover:bg-gray-50/50"
              >
                <td className="py-4 px-6">
                  <div className="font-bold text-gray-800">{t.patientName}</div>

                  <div className="text-xs text-gray-400">
                    MRN: {t.patientMrn}
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>

                    {t.fromWard}
                  </div>

                  <div className="text-xs text-gray-500 ml-4">{t.fromBed}</div>
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

                {/* <td className="py-4 px-6 text-right">
                  {t.status === "PENDING" ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleApprove(t.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(t.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
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
                </td> */}

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
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
          <span>Showing {filteredTransfers.length} active transfers</span>

          <div className="flex gap-1">
            <button className="w-6 h-6 rounded flex items-center justify-center border border-gray-200 text-gray-400">
              &lt;
            </button>

            <button className="w-6 h-6 rounded flex items-center justify-center bg-blue-50 text-blue-600 font-medium border border-blue-100">
              1
            </button>

            <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-50 text-gray-600">
              2
            </button>

            <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-50 text-gray-600">
              3
            </button>

            <button className="w-6 h-6 rounded flex items-center justify-center border border-gray-200 text-gray-600">
              &gt;
            </button>
          </div>
        </div>
      </div>

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

      <TransferReviewModal
        open={isModalOpen}
        transfer={selectedTransfer}
        onOpenChange={setIsModalOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
