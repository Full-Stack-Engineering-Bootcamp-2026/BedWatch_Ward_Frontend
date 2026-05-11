import React, { useEffect, useState } from "react";

import axios from "axios";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const addStaffSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["STAFF", "SENIOR_STAFF"]),

  wardId: z.string().optional(),
});

type AddStaffFormData = z.infer<typeof addStaffSchema>;

type Ward = {
  id: number;
  name: string;
};

type Props = {
  children: React.ReactNode;
};

function AddStaffModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
  const [wards, setWards] = useState<Ward[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddStaffFormData>({
    resolver: zodResolver(addStaffSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STAFF",
      wardId: "",
    },
  });

  const selectedRole = watch("role");

  const fetchWards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/wards/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWards(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchWards();
    }
  }, [open]);

  const onSubmit = async (data: AddStaffFormData) => {
    try {
      await axios.post("http://localhost:3000/api/v1/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,

        wardId: data.role === "STAFF" ? Number(data.wardId) : null,
      });

      await axios.post(
        "http://localhost:3000/api/v1/authF/send-account-setup-email",
        {
          email: data.email,
          role: data.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(
        `${data.role} account created and setup email sent successfully`,
      );

      reset();
      setOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="overflow-hidden border-0 bg-[#F8F9FC] p-0 sm:max-w-[560px]">
        <DialogHeader className="border-b bg-white px-6 py-5">
          <DialogTitle className="text-3xl font-bold text-[#0F2E8A]">
            Add Staff Account
          </DialogTitle>

          <p className="mt-1 text-xs font-semibold uppercase tracking-[2px] text-gray-400">
            User Access Configuration
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-6"
        >
          <div>
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </Label>

            <Input
              placeholder="staff or senior staff name"
              className="h-11"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </Label>

            <Input
              type="email"
              placeholder="abc@hospital.com"
              className="h-11"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-semibold text-gray-700">
                Role
              </Label>

              <select
                {...register("role")}
                className="h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
              >
                <option value="STAFF">Staff</option>

                <option value="SENIOR_STAFF">Senior Staff</option>
              </select>

              {errors.role && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-sm font-semibold text-gray-700">
                Assigned Ward
              </Label>

              <select
                {...register("wardId")}
                disabled={selectedRole === "SENIOR_STAFF"}
                className="h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="">Select Ward</option>

                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>

              {errors.wardId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.wardId.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              Temporary Password
            </Label>

            <Input
              type="password"
              placeholder="********"
              className="h-11"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="rounded-md border-l-4 border-blue-600 bg-blue-50 px-4 py-4">
            <p className="text-sm text-blue-700">
              Staff accounts created here will immediately get access to the{" "}
              <span className="font-bold text-blue-800">
                hospital dashboard
              </span>{" "}
              based on assigned roles and ward permissions.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" className="bg-blue-900 text-white">
              Create Staff
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffModal;
