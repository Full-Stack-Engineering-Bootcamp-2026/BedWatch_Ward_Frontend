import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Building2, BedDouble } from "lucide-react";

const BASE_URL = "http://localhost:3000/api/v1";

type Ward = {
  id: number;

  name: string;

  type: string;

  capacity: number;

  description: string;

  created_at: string;

  updated_at: string;
};

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  patientId: number;

  patientName: string;

  currentWardId: number;

  currentWardName: string;

  currentBedId: number;

  currentBedNumber: string;
}

export default function TransferPatientDialog({
  open,
  onOpenChange,
  patientId,
  patientName,
  currentWardName,
  currentBedNumber,
}: Props) {
  const token = useSelector((state: RootState) => state.auth.token);

  const [wards, setWards] = useState<Ward[]>([]);

  const [destinationWardId, setDestinationWardId] = useState("");

  const [availableBeds, setAvailableBeds] = useState<any[]>([]);

  const [selectedBedId, setSelectedBedId] = useState("");

  const [loading, setLoading] = useState(false);

  const loadWards = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/wards/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setWards(response.data.data);
      }
    } catch (error) {
      console.log("WARD FETCH ERROR:", error);
    }
  };

  const loadAvailableBeds = async (wardId: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/beds/available?wardId=${wardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("AVAILABLE BEDS:", response.data);

      if (response.data.success) {
        setAvailableBeds(response.data.data);
      }
    } catch (error) {
      console.log("AVAILABLE BED ERROR:", error);
    }
  };

  useEffect(() => {
    if (open && token) {
      loadWards();
    }
  }, [open, token]);

  const handleTransfer = async () => {
    if (!destinationWardId) {
      toast.error("Please select destination ward");

      return;
    }

    if (!selectedBedId) {
      toast.error("Please select available bed");

      return;
    }

    try {
      setLoading(true);

      const selectedBed = availableBeds.find(
        (bed: any) => bed.id === Number(selectedBedId),
      );

      console.log({
        patientId,

        fromBedNumber: currentBedNumber,

        toBedNumber: selectedBed?.bed_number,
      });

      await axios.post(
        `${BASE_URL}/staff/transfers`,
        {
          patientId,

          fromBedNumber: currentBedNumber,

          toBedNumber: selectedBed?.bed_number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Transfer request submitted successfully");

      onOpenChange(false);

      setDestinationWardId("");

      setSelectedBedId("");

      setAvailableBeds([]);
    } catch (error: any) {
      console.log("TRANSFER ERROR:", error.response?.data);

      toast.error(
  error.response?.data?.message ||
    "Failed to submit transfer request",
);
   
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white border border-slate-200 rounded-3xl p-0 shadow-2xl">
        {/* HEADER */}
        <DialogHeader className="px-8 py-6 border-b border-slate-100 bg-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
              Patient Transfer
            </p>

            <DialogTitle className="text-3xl font-bold text-slate-900">
              Transfer {patientName}
            </DialogTitle>

            <p className="text-sm text-slate-500 mt-2">
              Create patient transfer request.
            </p>
          </div>
        </DialogHeader>

    
        <div className="p-8 space-y-6 bg-white">
       
          <div className="grid grid-cols-2 gap-5">
     
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">
                Current Ward
              </p>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {currentWardName}
                  </p>
                </div>
              </div>
            </div>

          
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">
                Current Bed
              </p>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BedDouble className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {currentBedNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

     
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
              Destination Ward
            </label>

            <div className="relative">
              <select
                value={destinationWardId}
                onChange={(e) => {
                  const wardId = e.target.value;

                  setDestinationWardId(wardId);

                  setSelectedBedId("");

                  loadAvailableBeds(wardId);
                }}
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select destination ward</option>

                {wards.map((ward) => (
                  <option key={ward.id} value={String(ward.id)}>
                    {ward.name}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

     
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
              Available Beds
            </label>

            <div className="relative">
              <select
                value={selectedBedId}
                onChange={(e) => setSelectedBedId(e.target.value)}
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select available bed</option>

                {availableBeds.map((bed: any) => (
                  <option key={bed.id} value={bed.id}>
                    {bed.bed_number}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-slate-100 bg-white flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>

          <Button
            onClick={handleTransfer}
            disabled={loading || !destinationWardId || !selectedBedId}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
          >
            {loading ? "Submitting..." : "Submit Transfer Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
