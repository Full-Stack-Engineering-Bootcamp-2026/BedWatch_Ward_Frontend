import React from "react";

import {
  Activity,
  BedDouble,
  Clock,
  ShieldCheck,
  TriangleAlert,
  Wrench,
} from "lucide-react";

import {
  Card as ShadcnCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type WardType = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  description: string;
  availableBeds: number;
  occupiedBeds: number;
  cleaningBeds: number;
};

type BedType = {
  id: number;
  bed_number: string;
  status: string;
  updated_at: string;
};

type Props = {
  ward: WardType;
  beds: BedType[];
  loading: boolean;
};

export default function WardBedDetail({ ward, beds, loading }: Props) {
  const occupancyPercentage =
    ward.capacity > 0
      ? Math.round((ward.occupiedBeds / ward.capacity) * 100)
      : 0;

  const lastSyncTime = new Date().toLocaleTimeString();

  const getBedStyle = (status: string) => {
    switch (status) {
      case "OCCUPIED":
        return {
          border: "border-red-200 hover:border-red-300",
          badge: "bg-red-50 text-red-600",
          label: "OCCUPIED",
        };

      case "AVAILABLE":
        return {
          border: "border-cyan-200 hover:border-cyan-300",
          badge: "bg-cyan-50 text-cyan-700",
          label: "AVAILABLE",
        };

      case "CLEANING":
        return {
          border: "border-orange-200 hover:border-orange-300",
          badge: "bg-orange-50 text-orange-700",
          label: "PENDING CLEAN",
        };

      default:
        return {
          border: "border-gray-200 hover:border-gray-300",
          badge: "bg-gray-100 text-gray-500",
          label: status,
        };
    }
  };

  const renderBedContent = (bed: BedType) => {
    if (bed.status === "AVAILABLE") {
      return (
        <div className="h-full flex flex-col justify-between">
          <div className="flex justify-center items-center flex-1">
            <div className="text-center">
              <BedDouble className="w-7 h-7 text-gray-400 mx-auto mb-3" />

              <p className="text-[10px] font-bold text-gray-400">
                READY FOR ADMISSION
              </p>
            </div>
          </div>

          <div className="flex justify-between text-[10px] border-t border-gray-100 pt-2">
            <span className="text-gray-400 font-bold">STATUS</span>

            <span className="text-cyan-700 font-bold">Cleaned (Verified)</span>
          </div>
        </div>
      );
    }

    if (bed.status === "CLEANING") {
      return (
        <div className="h-full flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 mb-1">
              CLEANING PROGRESS
            </p>

            <div className="w-full h-1 bg-gray-200 rounded-full mb-2">
              <div className="h-1 bg-orange-400 rounded-full w-[45%]" />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-orange-700">
              <Clock className="w-3.5 h-3.5" />

              <span>Est. 14 mins remaining</span>
            </div>
          </div>

          <div className="flex justify-between text-[10px] border-t border-gray-100 pt-2">
            <span className="text-gray-400 font-bold">PRIORITY</span>

            <span className="text-orange-700 font-bold">
              High (ER Waitlist)
            </span>
          </div>
        </div>
      );
    }

    if (bed.status === "OCCUPIED") {
      return (
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between text-[10px] mb-3">
              <span className="text-gray-400 font-bold">PATIENT</span>

              <span className="text-gray-700 font-semibold">
                Assigned Patient
              </span>
            </div>

            <div className="flex justify-between text-[10px] mb-3">
              <span className="text-gray-400 font-bold">LOS</span>

              <span className="text-gray-700 font-semibold">-- Days</span>
            </div>

            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400 font-bold">STATUS</span>

              <span className="text-red-600 font-bold">Occupied</span>
            </div>
          </div>

          <div className="flex justify-between text-[10px] border-t border-gray-100 pt-2">
            <span className="text-gray-400 font-bold">ASSIGNED RN</span>

            <span className="text-gray-700 font-bold">Unassigned</span>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <Wrench className="w-7 h-7 text-gray-400 mb-3" />

        <p className="text-[10px] font-bold text-gray-400">
          STATUS NOT AVAILABLE
        </p>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {ward.name} ({ward.type}) — Bed Detail
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Operational Overview & Bed Availability Live Feed
            </p>
          </div>

          <ShadcnCard className="rounded-sm bg-gray-100 border-gray-200 shadow-none">
            <CardContent className="px-6 py-2 text-xs font-bold text-gray-700 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-700" />
              LAST SYNC: {lastSyncTime}
            </CardContent>
          </ShadcnCard>
        </div>
      </div>

      <ShadcnCard className="rounded-md overflow-hidden bg-[#F4F4FC] mb-5 shadow-none border-gray-200">
        <CardContent className="p-0 grid grid-cols-5">
          <div className="p-4">
            <p className="text-[11px] text-gray-500 font-bold tracking-wider">
              TOTAL CAPACITY
            </p>

            <p className="text-xl font-bold text-gray-900">
              {ward.capacity} Beds
            </p>
          </div>

          <div className="p-4">
            <p className="text-[11px] text-gray-500 font-bold tracking-wider">
              OCCUPIED
            </p>

            <p className="text-xl font-bold text-gray-900">
              {ward.occupiedBeds}{" "}
              <span className="text-sm text-red-500">
                ({occupancyPercentage}%)
              </span>
            </p>
          </div>

          <div className="p-4">
            <p className="text-[11px] text-gray-500 font-bold tracking-wider">
              AVAILABLE
            </p>

            <p className="text-xl font-bold text-cyan-700">
              {ward.availableBeds} Beds
            </p>
          </div>

          <div className="p-4">
            <p className="text-[11px] text-gray-500 font-bold tracking-wider">
              DIRTY / TURNOVER
            </p>

            <p className="text-xl font-bold text-green-700">
              {ward.cleaningBeds} Beds
            </p>
          </div>

          <div className="p-4">
            <p className="text-[11px] text-gray-500 font-bold tracking-wider">
              STAFFING RATIO
            </p>

            <p className="text-xl font-bold text-gray-900">1:4</p>
          </div>
        </CardContent>
      </ShadcnCard>

      {loading ? (
        <ShadcnCard className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-10 text-lg font-semibold">
            Loading beds...
          </CardContent>
        </ShadcnCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {beds.map((bed) => {
            const style = getBedStyle(bed.status);

            return (
              <ShadcnCard
                key={bed.id}
                className={`bg-white border ${style.border} min-h-[150px] rounded-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
              >
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {bed.bed_number}
                    </h3>

                    <span
                      className={`px-2 py-1 text-[9px] font-bold rounded-sm ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  <div className="flex-1">{renderBedContent(bed)}</div>
                </CardContent>
              </ShadcnCard>
            );
          })}

          {beds.length === 0 && (
            <ShadcnCard className="col-span-5 rounded-xl shadow-sm border-gray-200">
              <CardContent className="p-10 text-center text-gray-500 font-semibold">
                No beds found for this ward.
              </CardContent>
            </ShadcnCard>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mt-6">
        <ShadcnCard className="col-span-2 rounded-xl shadow-sm border-gray-200 transition-all duration-200 hover:shadow-md">
          <CardHeader className="p-5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">
                Ward Layout Topology
              </CardTitle>

              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-400 rounded-full" />
                  OCCUPIED
                </span>

                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                  AVAILABLE
                </span>

                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                  TURNOVER
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5">
            <div className="relative h-[330px] border border-cyan-200 bg-gray-200 overflow-hidden rounded-sm">
              <img
                src="/wardView.png"
                alt="Ward Image"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />


              <div className="absolute inset-0 bg-gray-700/20" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md px-6 py-4 rounded-sm">
                <p className="text-sm font-bold text-[#1E40AF]">
                  LIVE ZONE VIEW
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Static ward topology image placeholder
                </p>
              </div>
            </div>
          </CardContent>
        </ShadcnCard>

        <ShadcnCard className="rounded-xl shadow-sm border-gray-200 transition-all duration-200 hover:shadow-md">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-xl font-bold text-gray-900">
              Ward Alerts
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <div className="space-y-4">
              <ShadcnCard className="bg-red-50 border-l-4 border-l-red-300 border-red-100 rounded-sm shadow-none transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5">
                <CardContent className="p-4 flex gap-3">
                  <TriangleAlert className="w-5 h-5 text-red-500 mt-1" />

                  <div>
                    <p className="text-sm font-bold text-red-700">
                      Critical Capacity Level
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      Ward currently at {occupancyPercentage}% capacity. Review
                      discharge list for potential transitions.
                    </p>
                  </div>
                </CardContent>
              </ShadcnCard>

              <ShadcnCard className="bg-orange-50 border-l-4 border-l-orange-300 border-orange-100 rounded-sm shadow-none transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5">
                <CardContent className="p-4 flex gap-3">
                  <Clock className="w-5 h-5 text-orange-600 mt-1" />

                  <div>
                    <p className="text-sm font-bold text-orange-700">
                      Cleaning Delay
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      {ward.cleaningBeds} bed turnover case requires
                      housekeeping follow-up.
                    </p>
                  </div>
                </CardContent>
              </ShadcnCard>

              <ShadcnCard className="bg-cyan-50 border-l-4 border-l-cyan-300 border-cyan-100 rounded-sm shadow-none transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5">
                <CardContent className="p-4 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-700 mt-1" />

                  <div>
                    <p className="text-sm font-bold text-cyan-700">
                      Staffing Update
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      RN transition scheduled for 13:00.
                    </p>
                  </div>
                </CardContent>
              </ShadcnCard>
            </div>
          </CardContent>
        </ShadcnCard>
      </div>
    </div>
  );
}
