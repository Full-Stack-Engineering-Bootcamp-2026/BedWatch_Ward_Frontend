import React from "react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

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

type Props = {
  open: boolean;
  transfer: Transfer | null;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
};

export default function TransferReviewModal({
  open,
  transfer,
  onOpenChange,
  onApprove,
  onReject,
}: Props) {
  if (!transfer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0 bg-white rounded-sm border border-gray-200 shadow-xl">
        <div className="px-6 pt-5 pb-4 border-b border-gray-200">
          <div className="text-[10px] font-bold text-[#1E40AF] tracking-wider uppercase">
            PATIENT MOVEMENT
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            Transfer {transfer.patientName}
          </h2>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Current Ward
              </label>

              <div className="mt-1 border border-gray-200 bg-[#F8F7FF] h-10 flex items-center px-3 text-sm text-gray-700">
                <span className="w-4 h-4 mr-2 text-blue-500">
                  ▣
                </span>
                {transfer.fromWard}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Current Bed
              </label>

              <div className="mt-1 border border-gray-200 bg-[#F8F7FF] h-10 flex items-center px-3 text-sm text-gray-700">
                <span className="w-4 h-4 mr-2 text-blue-500">
                  ▬
                </span>
                {transfer.fromBed}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Destination Ward
            </label>

            <div className="mt-1 border border-gray-300 h-10 flex items-center justify-between px-3 text-sm text-gray-700 bg-white">
              {transfer.toWard}

              <span className="text-gray-400 text-xs">
                ▾
              </span>
            </div>
          </div>

          <div className="mb-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Destination Bed
            </label>

            <div className="mt-1 border border-gray-300 h-10 flex items-center px-3 text-sm text-gray-700 bg-white">
              {transfer.toBed}
            </div>
          </div>

          <div className="text-[11px] text-gray-500 mb-5">
            Requested by{" "}
            <span className="font-semibold text-gray-700">
              {transfer.requestedBy}
            </span>{" "}
            on{" "}
            <span className="font-semibold text-gray-700">
              {new Date(transfer.requestedAt).toLocaleString()}
            </span>
          </div>

          <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Transfer Status
            </label>

            <div className="mt-1 border border-blue-200 bg-blue-50 h-10 flex items-center px-3 text-sm font-semibold text-blue-700">
              {transfer.status}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Transfer Reason
            </label>

            <textarea
              disabled
              value="Clinical transfer request submitted by ward staff."
              className="mt-1 w-full h-24 border border-gray-300 resize-none p-3 text-sm text-gray-600 bg-white"
            />
          </div>
        </div>

        <div className="bg-[#F4F5FA] px-6 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-gray-500 hover:text-gray-700"
          >
            CANCEL
          </Button>

          <div className="flex gap-3">
            <Button
              onClick={() => onReject(transfer.id)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6"
            >
              REJECT REQUEST
            </Button>

            <Button
              onClick={() => onApprove(transfer.id)}
              className="bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-bold px-6"
            >
              APPROVE TRANSFER
              <span className="ml-2">▷</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}