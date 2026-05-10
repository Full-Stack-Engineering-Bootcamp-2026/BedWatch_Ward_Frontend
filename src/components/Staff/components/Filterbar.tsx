import React from "react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  filter: string;

  setFilter: React.Dispatch<
    React.SetStateAction<string>
  >;

  searchQuery: string;

  setSearchQuery: React.Dispatch<
    React.SetStateAction<string>
  >;

  zone: string;

  setZone: React.Dispatch<
    React.SetStateAction<string>
  >;
}

export default function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  zone,
  setZone,
}: Props) {
  return (
    <div className="flex items-center h-[70px] justify-between bg-[#F4F2FC] border border-slate-200 rounded-md px-5 py-4">

      {/* Left */}
      <div className="flex items-center gap-6">

        {/* Buttons */}
        <div className="flex items-center gap-2">

          <button
            onClick={() =>
              setFilter("ALL")
            }
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition

              ${
                filter === "ALL"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            All Beds
          </button>

          <button
            onClick={() =>
              setFilter(
                "AVAILABLE",
              )
            }
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition

              ${
                filter ===
                "AVAILABLE"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            Available Only
          </button>

          <button
            onClick={() =>
              setFilter(
                "CLEANING",
              )
            }
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition

              ${
                filter ===
                "CLEANING"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            Action Required
          </button>

        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200" />

        {/* Dropdown */}
        <div className="flex items-center gap-3">

          <p className="text-sm text-slate-500 whitespace-nowrap">
            Filter By Zone
          </p>

          <Select
            value={zone}
            onValueChange={
              setZone
            }
          >

            <SelectTrigger className="w-[170px] h-9 bg-[#F4F2FC] border-slate-200 text-sm shadow-sm">

              <SelectValue placeholder="Select Zone" />

            </SelectTrigger>

            <SelectContent className="bg-white border border-slate-200 shadow-md">

              <SelectItem value="ALL">
                All Zones
              </SelectItem>

              <SelectItem value="North Wing">
                North Wing
              </SelectItem>

              <SelectItem value="South Wing">
                South Wing
              </SelectItem>

              <SelectItem value="ICU">
                ICU
              </SelectItem>

              <SelectItem value="Emergency">
                Emergency
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

      </div>

      {/* Search */}
      <div className="w-[260px]">

        <Input
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(
              e.target.value,
            )
          }
          placeholder="Search Patient or Bed..."
          className="h-10 border-slate-200"
        />

      </div>

    </div>
  );
}