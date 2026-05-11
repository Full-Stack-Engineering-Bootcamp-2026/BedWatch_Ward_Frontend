import { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Ward = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  description: string;
  availableBeds: number;
  occupiedBeds: number;
  cleaningBeds: number;
};

export default function BedStatusDistribution() {
  const token = useSelector((state: any) => state.auth.token);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    fetchWardSummary();
  }, []);

  const fetchWardSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/wardsAdmin/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWards(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const occupied = wards.reduce((acc, ward) => acc + ward.occupiedBeds, 0);

  const available = wards.reduce((acc, ward) => acc + ward.availableBeds, 0);

  const cleaning = wards.reduce((acc, ward) => acc + ward.cleaningBeds, 0);

  const totalBeds = occupied + available + cleaning;

  const chartData = [
    {
      name: "Occupied",
      value: occupied,
      color: "#1238A5",
    },
    {
      name: "Available",
      value: available,
      color: "#0F766E",
    },
    {
      name: "Maintenance",
      value: cleaning,
      color: "#DC2626",
    },
  ];

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">Bed Status Distribution</CardTitle>

            <p className="mt-1 text-sm text-slate-500">
              Real-time breakdown of facility-wide assets
            </p>
          </div>

          <div className="rounded bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">
            SYNCED
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="relative h-[220px] w-full max-w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {chartData.map((item, index) => (
                    <Cell key={index} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold">{totalBeds}</h2>

              <p className="text-xs text-slate-500">TOTAL BEDS</p>
            </div>
          </div>

          <div className="w-full space-y-4">
            {chartData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="text-sm text-slate-700">{item.name}</span>
                </div>

                <span className="font-semibold">
                  {totalBeds === 0
                    ? 0
                    : Math.round((item.value / totalBeds) * 100)}
                  %
                </span>
              </div>
            ))}

            <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-500">
              System tracking {cleaning} beds currently undergoing terminal
              cleaning protocols.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
