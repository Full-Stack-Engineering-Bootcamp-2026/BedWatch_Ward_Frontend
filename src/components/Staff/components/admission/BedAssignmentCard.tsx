import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

interface Bed {
  id: number;
  bed_number: string;
  status: string;
}

interface Props {
  assignedWard: string;

  availableBeds: Bed[];

  selectedBed: string;

  setSelectedBed: (
    value: string
  ) => void;
}

export default function BedAssignmentCard({
  assignedWard,
  availableBeds,
  selectedBed,
  setSelectedBed,
}: Props) {

  return (
    <Card className="border-slate-200 shadow-sm bg-white">

      <CardContent className="p-5 space-y-5 bg-white">

      
        <div>

          <h2 className="text-lg font-semibold text-slate-800">
            Bed Assignment
          </h2>

          <p className="text-sm text-slate-500">
            Allocate available beds from your ward
          </p>
        </div>

      
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-700">
            Assigned Ward
          </label>

          <div className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 flex items-center text-sm text-slate-700">

            {assignedWard ||
              "No ward assigned"}
          </div>
        </div>

        <div className="space-y-2">

          <div className="flex items-center justify-between">

            <label className="text-sm font-medium text-slate-700">
              Available Beds
            </label>

            <Badge variant="secondary">
              {availableBeds.length} Beds
            </Badge>
          </div>

          <Select
            value={selectedBed}
            onValueChange={
              setSelectedBed
            }
          >

            <SelectTrigger className="w-full h-11 bg-white border-slate-300">

              <SelectValue placeholder="Select available bed" />

            </SelectTrigger>

            <SelectContent className="bg-white">

              {availableBeds.length > 0 ? (

                availableBeds.map((bed) => (

                  <SelectItem
                    key={bed.id}
                    value={String(bed.id)}
                  >
                    {bed.bed_number}
                  </SelectItem>
                ))

              ) : (

                <div className="p-3 text-sm text-slate-500">
                  No beds available
                </div>
              )}
            </SelectContent>
          </Select>
        </div>

   
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

          <div className="flex items-center justify-between mb-2">

            <h4 className="text-sm font-semibold text-blue-900">
              Allocation Policy
            </h4>

            <Badge>
              Restricted
            </Badge>
          </div>

          <p className="text-xs text-blue-800 leading-relaxed">
            Only beds from the logged-in staff
            member’s assigned ward are displayed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}