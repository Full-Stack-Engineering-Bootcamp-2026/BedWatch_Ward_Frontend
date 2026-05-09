import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BedDouble,
  Building2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { createTransferRequest,fetchWards,CreateTransferPayload } from "../transfer/patientTransferservice";

interface Props {
  children: React.ReactNode;

  transferPatient?: {
    patientId: number;

    currentBedId: number;

    currentWardId: number;

    name: string;

    ward: string;

    bed: string;
  };
}

export default function TransferPatientDialog({
  children,
  transferPatient,
}: Props) {
  const [wards, setWards] =
    useState<any[]>([]);

  const [selectedWard, setSelectedWard] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loadWards =
    async (): Promise<void> => {
      try {
        const data =
          await fetchWards();

        setWards(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    void loadWards();
  }, []);

  const handleTransfer =
    async () => {
      if (!transferPatient)
        return;

      try {
        setLoading(true);

        const payload: CreateTransferPayload =
          {
            patientId:
              transferPatient.patientId,

            currentBedId:
              transferPatient.currentBedId,

            currentWardId:
              transferPatient.currentWardId,

            destinationWardId:
              Number(
                selectedWard,
              ),
          };

        console.log(
          "TRANSFER PAYLOAD",
          payload,
        );

        await createTransferRequest(
          payload,
        );

        alert(
          "Transfer request submitted successfully",
        );

        setSelectedWard("");
        setReason("");
      } catch (error) {
        console.log(error);

        alert(
          "Failed to submit request",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl p-0 bg-white overflow-hidden">
        <DialogHeader className="border-b px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-[#00288E] font-semibold">
              Patient Movement
            </p>

            <DialogTitle className="text-3xl font-bold mt-2">
              Transfer{" "}
              {
                transferPatient?.name
              }
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase text-slate-500 font-semibold">
                Current Ward
              </label>

              <div className="mt-2 border rounded-lg h-12 px-4 flex items-center gap-3 bg-slate-50">
                <Building2 className="w-4 h-4 text-[#00288E]" />

                <span className="text-sm">
                  {
                    transferPatient?.ward
                  }
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-slate-500 font-semibold">
                Current Bed
              </label>

              <div className="mt-2 border rounded-lg h-12 px-4 flex items-center gap-3 bg-slate-50">
                <BedDouble className="w-4 h-4 text-[#00288E]" />

                <span className="text-sm">
                  Bed{" "}
                  {
                    transferPatient?.bed
                  }
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500 font-semibold">
              Destination Ward
            </label>

            <Select
              value={selectedWard}
              onValueChange={(
                value,
              ) => {
                setSelectedWard(
                  value,
                );
              }}
            >
              <SelectTrigger className="mt-2 h-12 bg-white w-full">
                <SelectValue placeholder="Select ward" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {wards.map(
                  (
                    ward: any,
                  ) => (
                    <SelectItem
                      key={
                        ward.id
                      }
                      value={String(
                        ward.id,
                      )}
                    >
                      {
                        ward.name
                      }
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500 font-semibold">
              Transfer Reason
            </label>

            <Textarea
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target
                    .value,
                )
              }
              className="mt-2 min-h-[120px]"
              placeholder="Specify clinical necessity for transfer..."
            />
          </div>
        </div>

        <div className="border-t bg-slate-50 px-6 py-4 flex items-center justify-between">
          <Button variant="ghost">
            Cancel
          </Button>

          <Button
            disabled={
              !selectedWard ||
              loading
            }
            onClick={
              handleTransfer
            }
            className="text-white bg-[#00288E] hover:bg-[#001d66]"
          >
            {loading
              ? "Submitting..."
              : "Submit Transfer Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}