import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
type AddWardModalProps = {
  children: React.ReactNode;
};
const wardSchema = z.object({
  name: z.string().min(2, "Ward name is required"),

  type: z.string().min(2, "Ward type is required"),

  capacity: z.coerce.number().min(1, "Capacity must be greater than 0"),

  description: z.string().min(5, "Description is required"),
});

type WardFormData = z.infer<typeof wardSchema>;

const AddWardModal = ({ children }: AddWardModalProps) => {
  const [open, setOpen] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(wardSchema),
  });

  const onSubmit = async (data: WardFormData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/wards/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      reset();

      setOpen(false);
      toast.success("Ward created successfully !!!");
      window.location.reload();
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
            Add Ward
          </DialogTitle>

          <p className="mt-1 text-xs font-semibold uppercase tracking-[2px] text-gray-400">
            Operational Configuration
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-6"
        >
          <div>
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              Ward Name
            </Label>

            <Input
              placeholder="e.g. General Ward"
              className="h-11"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-semibold text-gray-700">
                Ward Type
              </Label>

              <Input
                placeholder="General Care"
                className="h-11"
                {...register("type")}
              />

              {errors.type && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block text-sm font-semibold text-gray-700">
                Total Bed Capacity
              </Label>

              <Input
                type="number"
                placeholder="10"
                className="h-11"
                {...register("capacity")}
              />

              {errors.capacity && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </Label>

            <textarea
              placeholder="For general patients..."
              className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
              {...register("description")}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="rounded-md border-l-4 border-blue-600 bg-blue-50 px-4 py-4">
            <p className="text-sm text-blue-700">
              Wards created will immediately appear in the{" "}
              <span className="font-bold text-blue-800">ward dashboard</span>{" "}
              and become available for bed assignments.
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

            <Button type="submit" className="text-white bg-blue-900">
              + Create Ward
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWardModal;
