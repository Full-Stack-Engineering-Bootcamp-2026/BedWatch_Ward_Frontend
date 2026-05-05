import React from "react";
import { useForm } from "react-hook-form";
import { login } from "@/services/authService";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { MdOutlineBed } from "react-icons/md";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { MdLoop } from "react-icons/md";

const loginSchema = z.object({
  email: z.string().min(1, "email is required ").email("indvalid email"),
  password: z
    .string()
    .min(6, "requires minimum 6 characters")
    .regex(/[A-za-z]/, "must contain a letter ")
    .regex(/[0-9]/, "must contain a  number")
    .regex(/[@$!%*?&#]/, "must conatain atleast one special character "),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const res = await login(data);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF8FF]">
      <div className="mb-6 text-center">
        <MdOutlineBed className=" flex justify-center w-48 size-14 text-[#00288E]" />
        <h1 className="text-3xl font-bold text-[#00288E]">BEDWATCH</h1>
      </div>

      <Card className="  flex flex-col justify-center w-full max-w-md  p-2 shadow-md border border-gray-300 h-[442px]">
        <CardContent className=" p-6 space-y-4">
          <div className="pb-7">
            <h2 className=" font-inter text-lg font-semibold">
              Operational Login
            </h2>
            <p className=" font-inter text-sm text-gray-500">
              Enter your credentials to access the facility dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="font-inter ">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="clinician@hospital.org"
                  className="pl-10 h-[42px]"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-[42px]"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <Button className="w-full text-white bg-[#1E40AF] hover:bg-[#1E40AF] ">
              Login →
            </Button>
          </form>

          <p className="text-sm text-center text-blue-600 cursor-pointer">
            Forgot Password?
          </p>
        </CardContent>
      </Card>

      <div className="w-full max-w-md  flex justify-between p-2  mt-6 text-xs text-gray-500">
        <span className=" flex  items-center gap-1">
          <GoShieldCheck />
          Secure Access
        </span>
        <span className=" flex  items-center gap-1">
          <MdLoop />
          Live Monitoring
        </span>
      </div>
    </div>
  );
}
