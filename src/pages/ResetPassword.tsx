import React from "react";
import Navbar from "@/components/layout/navbar";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbShieldSearch } from "react-icons/tb";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import zxcvbn from "zxcvbn";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SiNike } from "react-icons/si";

import { toast } from "react-toastify";

import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const result = zxcvbn(value);
    setScore(result.score);
  };

  const strengthText = ["WEAK", "FAIR", "GOOD", "STRONG", "VERY STRONG"];
  const [confirmPassword, setConfirmPassword] = useState("");
  const isMatch = password === confirmPassword;
  const { register, handleSubmit } = useForm();
  const passwordField = register("password");

  const onSubmit = async (data: any) => {
    if (!isMatch) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/authF/reset-password",
        {
          token,
          password: data.password,
        },
      );

      toast.success(response.data.message || "Password reset successful");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: any) {
      console.log("error : ", error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8FF]">
      {/* <Navbar /> */}

      <div className="flex flex-1">
        <div className="hidden md:flex flex-1 items-center justify-center px-12">
          <div className="max-w-xl w-full">
            <p className=" font-inter text-[11px] font-semibold tracking-widest text-blue-700">
              SECURITY PROTOCOL A4
            </p>

            <h1 className="font-inter text-[24px] font-bold mt-3 text-gray-900">
              Secure Your Clinical Access
            </h1>

            <p className="font-inter text-sm text-gray-500 mt-3 leading-6">
              To maintain patient data integrity and hospital security
              standards, all first-time logins require a mandatory password
              update.
            </p>

            <div className="mt-6 p-4 bg-[#F4F2FC] border rounded-md space-y-4 max-w-md">
              <div className="flex gap-3">
                <IoShieldCheckmarkOutline className="size-[20px]" />
                <div>
                  <p className="font-inter text-sm font-medium">
                    Enterprise Encryption
                  </p>
                  <p className="font-inter text-xs text-gray-500">
                    SHA-256 protocols within secure network
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <TbShieldSearch className="size-[20px]" />
                <div>
                  <p className="font-inter text-sm font-medium">
                    Compliance Standards
                  </p>
                  <p className="font-inter text-xs text-gray-500">
                    HIPAA & GDPR compliance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4">
          <Card className="w-full max-w-md border border-gray-300 rounded-sm shadow-sm">
            <div className="p-6 space-y-5">
              <h2 className="font-inter text-lg font-semibold">
                Force Password Reset
              </h2>

              <p className="font-inter text-[#444653] text-[14px]">
                Choose a password that you haven't used before for this account.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <p className="font-inter text-[#757684] text-[12px] mb-1">
                  NEW PASSWORD
                </p>

                <div className="relative">
                  <Input
                    type={show ? "text" : "password"}
                    className="h-[42px] pr-10"
                    value={password}
                    {...passwordField}
                    onChange={(e) => {
                      passwordField.onChange(e);
                      handlePasswordChange(e);
                    }}
                    placeholder="••••••••"
                  />

                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {show ? (
                      <EyeOff
                        onClick={() => setShow(false)}
                        className="h-4 w-4 text-gray-400 cursor-pointer "
                      />
                    ) : (
                      <Eye
                        onClick={() => setShow(true)}
                        className="h-4 w-4 text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span className="transition-all duration-1000">
                      PASSWORD STRENGTH
                    </span>
                    <span className="text-[#006780] font-medium transition-all duration-1000">
                      {strengthText[score]}
                    </span>
                  </div>

                  <div className="flex gap-1 mt-1 transition-all duration-1000">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={` h-1 flex-1 rounded transition-all duration-1000
      ${i <= score ? "bg-[#006780]" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mt-3 transition-all duration-1000">
                  <p
                    className={
                      password.length >= 7 ? "text-[#006780]" : "text-gray-400"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <SiNike className="size-5" /> Thala for a reason
                    </div>
                  </p>

                  <p
                    className={
                      /[@$!%*?&#]/.test(password)
                        ? "text-[#006780]"
                        : "text-gray-400"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <SiNike className="size-5" /> One special character
                    </div>
                  </p>

                  <p
                    className={
                      /[A-Z]/.test(password)
                        ? "text-[#006780]"
                        : "text-gray-400"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <SiNike className="size-5" /> One uppercase letter
                    </div>
                  </p>

                  <p
                    className={
                      /[0-9]/.test(password)
                        ? "text-[#006780]"
                        : "text-gray-400"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <SiNike className="size-5" /> One numerical digit
                    </div>
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-[#757684] text-[12px] mb-1">
                    CONFIRM NEW PASSWORD
                  </p>

                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      className="h-[42px] pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      {showConfirm ? (
                        <EyeOff
                          onClick={() => setShowConfirm(false)}
                          className="h-4 w-4 text-gray-400 cursor-pointer"
                        />
                      ) : (
                        <Eye
                          onClick={() => setShowConfirm(true)}
                          className="h-4 w-4 text-gray-400 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  {!isMatch && confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      password doesn't match{" "}
                    </p>
                  )}
                </div>
                <div className="flex justify-center items-center bg-[#00288E] h-[56px] mt-3 ">
                  <button
                    type="submit"
                    className="w-full h-[56px] bg-[#00288E] hover:bg-[#001f6b] text-white flex items-center justify-center gap-2 rounded-sm"
                  >
                    Set Password & Continue
                    <IoIosArrowRoundForward className="size-5" />
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
