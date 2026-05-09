import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import BedStatusDistribution from "../components/BedStatusDistribution";

const data = [
  { day: "01", actual: 20, projected: 16 },
  { day: "05", actual: 28, projected: 22 },
  { day: "10", actual: 24, projected: 30 },
  { day: "15", actual: 44, projected: 35 },
  { day: "20", actual: 40, projected: 41 },
  { day: "25", actual: 56, projected: 46 },
  { day: "30", actual: 50, projected: 50 },
];

function OccupancyChart() {
  return (
    <Card className="xl:col-span-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Peak Occupancy Report</CardTitle>

            <p className="text-sm text-slate-500">Occupancy analytics</p>
          </div>

          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-700" />
              Actual
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-sky-300" />
              Projected
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <Line dataKey="actual" stroke="#1238A5" strokeWidth={3} />

              <Line
                dataKey="projected"
                stroke="#7DD3FC"
                strokeWidth={3}
                strokeDasharray="6 6"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCards() {
  return (
    <div className="xl:col-span-4 flex flex-col gap-6">
      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Length of Stay</h2>

            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
              +12%
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Average LOS</span>

              <span className="font-semibold">4.2 Days</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Target LOS</span>

              <span className="font-semibold text-cyan-600">3.8 Days</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Variance</span>

              <span className="font-semibold text-red-500">+0.4</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Efficiency</span>

              <span className="font-semibold">Top 15%</span>
            </div>

            <Progress value={80} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1238A5] text-white">
        <CardContent className="p-6">
          <p className="text-sm text-blue-100">DAILY ADMISSIONS</p>

          <h2 className="mt-2 text-4xl font-bold">142</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OperationalReports() {
  return (
    <div className="min-h-screen bg-[#f8f8fc] p-4 md:p-2">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Operational Reports</h1>

            <p className="text-sm text-slate-500">
              Real-time analytics dashboard
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <OccupancyChart />

          <StatsCards />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Discharge Frequency</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-[220px]" />
            </CardContent>
          </Card>

          <BedStatusDistribution />
        </div>
      </div>
    </div>
  );
}
