import React from "react";

import Navbar from "@/components/layout/navbar";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import axios from "axios";

import { toast } from "react-toastify";

import { IoIosArrowRoundForward } from "react-icons/io";

type ForgotPasswordForm = {
  email: string;
};

function ForgotPasswordEmail() {
  const { register, handleSubmit, reset } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/authF/forgot-password",
        data,
      );

      console.log(response.data.data);

      toast.success(response.data.data.message);

      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8FF]">
      <div className="flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md border border-gray-300 rounded-sm shadow-sm">
          <div className="p-6 space-y-5">
            <div>
              <h2 className="font-inter text-lg font-semibold">
                Forgot Password
              </h2>

              <p className="font-inter text-[#444653] text-[14px] mt-2">
                Enter your registered email address to receive a password reset
                link.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <p className="font-inter text-[#757684] text-[12px] mb-1">
                  EMAIL ADDRESS
                </p>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-[42px]"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>

              <button
                type="submit"
                className="
                  w-full
                  h-[56px]
                  bg-[#00288E]
                  hover:bg-[#001f6b]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-sm
                "
              >
                Send Reset Link
                <IoIosArrowRoundForward className="size-5" />
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPasswordEmail;
