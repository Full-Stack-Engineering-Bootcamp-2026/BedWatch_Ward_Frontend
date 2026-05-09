import { Pie, PieChart, Cell } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

type WardSummary = {
  id: number;
  name: string;
  type: string;
  capacity: number;
  description: string;
  availableBeds: number;
  occupiedBeds: number;
  cleaningBeds: number;
};

export function OccupancyChart() {
  const [chartData, setChartData] = useState([
    { name: "Occupied", value: 0, fill: "#F59E0B" },
    { name: "Available", value: 0, fill: "#16A34A" },
    { name: "Cleaning", value: 0, fill: "#1D4ED8" },
  ]);

  useEffect(() => {
    const fetchWardSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/wards/summary",
        );
        console.log(response.data);
        

        const wards: WardSummary[] = response.data.data;

        const occupied = wards.reduce(
          (sum, ward) => sum + ward.occupiedBeds,
          0,
        );

        const available = wards.reduce(
          (sum, ward) => sum + ward.availableBeds,
          0,
        );

        const cleaning = wards.reduce(
          (sum, ward) => sum + ward.cleaningBeds,
          0,
        );

        setChartData([
          {
            name: "Occupied",
            value: occupied,
            fill: "#F59E0B",
          },
          {
            name: "Available",
            value: available,
            fill: "#16A34A",
          },
          {
            name: "Cleaning",
            value: cleaning,
            fill: "#1D4ED8",
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWardSummary();
  }, []);
  
  

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card className="w-full max-w-[453px] h-[380px] h-full border-0 shadow-none ring-0 outline-none bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Live Occupancy Status
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-[200px] h-[200px]">
          <PieChart width={192} height={192}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{total}</span>
            <span className="text-[10px] text-muted-foreground tracking-wide">
              ACTIVE BEDS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6 text-sm w-full px-6">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-muted-foreground">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
