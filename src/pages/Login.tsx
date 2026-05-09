import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/services/authService";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { MdOutlineBed } from "react-icons/md";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { GoShieldCheck } from "react-icons/go";
import { MdLoop } from "react-icons/md";
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),

  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data);

      const { token, user } = res.data.data;

      dispatch(
        loginAction({
          token,
          user,
        }),
      );

      toast.success(res.data.message || "Login Successful");

      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (user.role === "STAFF") {
        navigate("/staff-dashboard");
      } else if (user.role === "SENIOR_STAFF") {
        navigate("/sr-staff/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#FBF8FF] overflow-hidden">
      <div className="absolute -bottom-24 -left-24 w-[550px] h-[350px] bg-[#6CD3F7] opacity-30 blur-[120px] rounded-full"></div>
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-[#B8C4FF] opacity-50 blur-[120px] rounded-full"></div>

      <div className="mb-6 text-center z-10">
        <MdOutlineBed className="flex justify-center w-48 size-14 text-[#00288E]" />

        <h1 className="text-3xl font-bold text-[#00288E]">BEDWATCH</h1>
      </div>

      <Card className="z-10 flex flex-col justify-center w-full max-w-md p-2 shadow-md border border-gray-300 h-[442px]">
        <CardContent className="p-6 space-y-4">
          <div className="pb-7">
            <h2 className="font-inter text-lg font-semibold">
              Operational Login
            </h2>

            <p className="font-inter text-sm text-gray-500">
              Enter your credentials to access the facility dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="font-inter">Email Address</Label>

              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                <Input
                  placeholder="clinician@hospital.org"
                  className="pl-10 h-[42px]"
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
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

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button className="w-full text-white bg-[#1E40AF] hover:bg-[#1E40AF]">
              Login 
            </Button>
          </form>

          <Button onClick={() => navigate("/forgot-password")}>
            <p className="text-sm text-center text-blue-600 cursor-pointer">
              Forgot Password?
            </p>
          </Button>
        </CardContent>
      </Card>

      <div className="z-10 w-full max-w-md flex justify-between p-2 mt-6 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <GoShieldCheck />
          Secure Access
        </span>

        <span className="flex items-center gap-1">
          <MdLoop />
          Live Monitoring
        </span>
      </div>
    </div>
  );
}
