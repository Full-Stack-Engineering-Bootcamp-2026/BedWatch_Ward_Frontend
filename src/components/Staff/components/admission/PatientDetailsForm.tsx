import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";

export default function PatientDetailsForm() {
  return (
    <div className="bg-white border rounded-lg p-5">
      <h2 className="font-semibold text-lg mb-5">
        Patient Details
      </h2>

      <div className="space-y-5">
    
        <div>
          <label className="text-sm">
            Full Name
          </label>

          <Input placeholder="Enter patient's legal name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">
              Age
            </label>

            <Input
              type="number"
              placeholder="Years"
            />
          </div>

          <div>
            <label className="text-sm">
              Gender
            </label>

            <Select>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectItem value="male">
                  Male
                </SelectItem>

                <SelectItem value="female">
                  Female
                </SelectItem>

                <SelectItem value="other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

   
        <div>
          <label className="text-sm">
            Admission Reason
          </label>

          <Textarea placeholder="Primary complaint or diagnosis summary" />
        </div>

    
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">
              Admitting Doctor
            </label>

            <Input placeholder="Dr. Name or ID" />
          </div>

          <div>
            <label className="text-sm">
              Department Code
            </label>

            <Input placeholder="MED-SURG-01" />
          </div>
        </div>

   
        <div>
          <label className="text-sm">
            Notes
          </label>

          <Textarea placeholder="Additional observations..." />
        </div>
      </div>
    </div>
  );
}