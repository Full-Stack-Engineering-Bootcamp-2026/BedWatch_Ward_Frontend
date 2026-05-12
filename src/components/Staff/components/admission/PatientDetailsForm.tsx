import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  formData: {
    name: string;
    age: string;
    gender: string;
    reason: string;
    notes: string;
    admittingDoctor: string;
    bed_id: string;
  };

  handleChange: (field: string, value: string) => void;
};

export default function PatientDetailsForm({ formData, handleChange }: Props) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <h2 className="font-semibold text-lg mb-5">Patient Details</h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm">Full Name</label>

          <Input
            placeholder="Enter patient's legal name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Age</label>

            <Input
              type="number"
              placeholder="Years"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Gender</label>

            <Select
              value={formData.gender}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectItem value="MALE">Male</SelectItem>

                <SelectItem value="FEMALE">Female</SelectItem>

                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm">Admission Reason</label>

          <Textarea
            placeholder="Primary complaint or diagnosis summary"
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Admitting Doctor</label>

          <Input
            placeholder="Dr. Name"
            value={formData.admittingDoctor}
            onChange={(e) => handleChange("admittingDoctor", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Notes</label>

          <Textarea
            placeholder="Additional observations..."
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
