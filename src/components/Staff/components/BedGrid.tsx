import BedCard from "./BedCard";
import FilterBar from "./Filterbar";
import { useState } from "react";

type Bed = {
  id: number;
  number: string;
  status: string;
  patient: string;
  duration: string;
  diagnosis: string;
  time: string;
};

type BedGridProps = {
  beds: Bed[];
};

export default function BedGrid({
  beds,
}: BedGridProps) {
  const [filter, setFilter] =
    useState("ALL");

  const filteredBeds =
    filter === "ALL"
      ? beds
      : beds.filter(
          (bed) => bed.status === filter
        );

  return (
    <div className="space-y-4">
      <FilterBar
        filter={filter}
        setFilter={setFilter}
      />

      <div className="flex flex-wrap gap-2">
        {filteredBeds.map((bed) => (
          <BedCard
            key={bed.id}
            bed={bed}
          />
        ))}
      </div>
    </div>
  );
}