import { Card, CardContent } from "@/components/ui/card";

type Bed = {
  id: number;
  status: string;
};

type SummaryCardsProps = {
  beds: Bed[];
};

export default function SummaryCards({
  beds,
}: SummaryCardsProps) {
  const summary = {
    totalBeds: beds.length,

    availableBeds: beds.filter(
      (bed) => bed.status === "AVAILABLE"
    ).length,

    occupiedBeds: beds.filter(
      (bed) => bed.status === "OCCUPIED"
    ).length,

    cleaningBeds: beds.filter(
      (bed) => bed.status === "CLEANING"
    ).length,
  };

  const cards = [
    {
      title: "TOTAL BEDS",
      value: summary.totalBeds,
      color: "border-slate-300",
    },
    {
      title: "AVAILABLE",
      value: summary.availableBeds,
      color: "border-emerald-500",
    },
    {
      title: "OCCUPIED",
      value: summary.occupiedBeds,
      color: "border-red-500",
    },
    {
      title: "CLEANING",
      value: summary.cleaningBeds,
      color: "border-orange-500",
    },
  ];

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((item) => (
        <Card
          key={item.title}
          className={`border-l-4 ${item.color}`}
        >
          <CardContent className="p-5 bg-white">
            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-2 text-slate-800">
              {item.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}