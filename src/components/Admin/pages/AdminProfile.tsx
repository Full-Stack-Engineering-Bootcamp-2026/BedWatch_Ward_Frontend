import React, { useState } from "react";

import { KeyRound, LogOut } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { logout } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

function AdminProfile() {
  const user = useSelector((state: any) => state.auth.user);
  console.log("user ",user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async () => {
    try {
      if (!user?.id) {
        toast.error("User not found");

        return;
      }

      const response = await axios.put(
        "http://localhost:3000/api/v1/usersAdmin/change-password",
        {
          id: Number(user.id),
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(response.data.message || "Password changed successfully");

      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error: any) {
      console.log(error?.response?.data?.message);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-[590px] bg-[#FBF8FF]">
      <div className="max-w-3xl mx-auto pt-10">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Profile
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Manage your account information
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Email
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {user?.email}
                  </h3>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Role
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#1E40AF]">
                    {user?.role}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1E40AF] hover:bg-[#18379c] text-white">
                      <KeyRound className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] rounded-2xl border-0 bg-white shadow-2xl">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>

                      <DialogDescription>
                        Enter your old and new password below.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="oldPassword">Old Password</Label>

                        <Input
                          id="oldPassword"
                          type="password"
                          name="oldPassword"
                          placeholder="Enter old password"
                          value={formData.oldPassword}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">New Password</Label>

                        <Input
                          id="newPassword"
                          type="password"
                          name="newPassword"
                          placeholder="Enter new password"
                          value={formData.newPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        className="bg-[#1E40AF] hover:bg-[#18379c] text-white"
                        onClick={handleChangePassword}
                      >
                        Update Password
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminProfile;
