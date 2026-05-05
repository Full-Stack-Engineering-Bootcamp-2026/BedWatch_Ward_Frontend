import { Pie, PieChart, Cell } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { name: "Occupied", value: 320, fill: "#F59E0B" },
  { name: "Available", value: 45, fill: "#16A34A" },
  { name: "Cleaning", value: 12, fill: "#1D4ED8" },
];

const total = chartData.reduce((sum, item) => sum + item.value, 0);

export function OccupancyChart() {
  return (
    <Card className="w-full max-w-[453px] h-[380px] border-0 shadow-none ring-0 outline-none bg-white">
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
