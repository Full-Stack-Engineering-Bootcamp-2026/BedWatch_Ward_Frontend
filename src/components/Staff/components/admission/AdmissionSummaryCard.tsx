import { Badge } from "@/components/ui/badge";

export default function AdmissionSummaryCard() {
  return (
    <div className="bg-blue-700 text-white rounded-lg p-5">
      <h2 className="font-semibold mb-5">Admission Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Priority Status</span>
          <span>
            <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg">
              Urgent
            </Badge>
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Stay</span>
          <span>3-5 Days</span>
        </div>

        <div className="flex justify-between">
          <span>Assigned Care Team</span>
          <span>Team Delta</span>
        </div>
      </div>
    </div>
  );
}
