import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const admissionSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Name must be at least 3 characters"),

  age: z
    .string()
    .min(1, "Age is required")
    .refine((value) => Number(value) > 0, {
      message: "Invalid age",
    }),

  gender: z.string().min(1, "Gender is required"),

  reason: z.string().min(1, "Admission reason is required"),

  admittingDoctor: z.string().min(1, "Doctor name is required"),

  notes: z.string().optional(),

  bed_id: z.string(),
});

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };

    const result = admissionSchema.safeParse(updatedData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.errors.forEach((error) => {
        const fieldName = error.path[0] as string;

        fieldErrors[fieldName] = error.message;
      });

      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <div className="bg-white border rounded-lg p-5">
      <h2 className="font-semibold text-lg mb-5">Patient Details</h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm">Full Name</label>

          <Input
            placeholder="Enter patient's legal name"
            value={formData.name}
            onChange={(e) => {
              handleChange("name", e.target.value);

              validateField("name", e.target.value);
            }}
            className={errors.name ? "border-red-500" : ""}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Age</label>

            <Input
              type="number"
              placeholder="Years"
              value={formData.age}
              onChange={(e) => {
                handleChange("age", e.target.value);

                validateField("age", e.target.value);
              }}
              className={errors.age ? "border-red-500" : ""}
            />

            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="text-sm">Gender</label>

            <Select
              value={formData.gender}
              onValueChange={(value) => {
                handleChange("gender", value);

                validateField("gender", value);
              }}
            >
              <SelectTrigger
                className={`w-full mt-1 ${
                  errors.gender ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectItem value="MALE">Male</SelectItem>

                <SelectItem value="FEMALE">Female</SelectItem>

                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>

            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm">Admission Reason</label>

          <Textarea
            placeholder="Primary complaint or diagnosis summary"
            value={formData.reason}
            onChange={(e) => {
              handleChange("reason", e.target.value);

              validateField("reason", e.target.value);
            }}
            className={errors.reason ? "border-red-500" : ""}
          />

          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
          )}
        </div>

        <div>
          <label className="text-sm">Admitting Doctor</label>

          <Input
            placeholder="Dr. Name"
            value={formData.admittingDoctor}
            onChange={(e) => {
              handleChange("admittingDoctor", e.target.value);

              validateField("admittingDoctor", e.target.value);
            }}
            className={errors.admittingDoctor ? "border-red-500" : ""}
          />

          {errors.admittingDoctor && (
            <p className="text-red-500 text-sm mt-1">
              {errors.admittingDoctor}
            </p>
          )}
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
