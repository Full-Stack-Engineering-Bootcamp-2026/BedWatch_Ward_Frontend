import BedCard from "./BedCard";
import FilterBar from "./Filterbar";
import { useState } from "react";

type Bed = {
  id: number;
  bed_number: string;
  status: string;
  type: string;
  floor: string;

  patient?: {
    name: string;
    age: number;
    diagnosis: string;
    admittedAt: string;
  };
};

type BedGridProps = {
  beds: Bed[];
};

export default function BedGrid({ beds }: BedGridProps) {
  const [filter, setFilter] = useState("ALL");

  const filteredBeds =
    filter === "ALL" ? beds : beds.filter((bed) => bed.status === filter);

  return (
    <div className="space-y-4">
      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="grid grid-cols-4 gap-3">
        {filteredBeds.map((bed) => (
          <BedCard key={bed.id} bed={bed} />
        ))}
      </div>
    </div>
  );
}
