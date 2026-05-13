import React, { useState } from "react";

import { KeyRound, LogOut, ShieldCheck, Activity } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { toast } from "react-toastify";

import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { login, logout } from "@/store/slices/authSlice";

function AdminProfile() {
  const [uploading, setUploading] = useState(false);

  const { user, token } = useSelector((state: any) => state.auth);

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
  const uploadProfileImage = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:3000/api/v1/users/upload-profile",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const imageUrl = response.data.data.imageUrl;

      dispatch(
        login({
          token: token!,
          user: {
            ...user,
            imageUrl,
          },
        }),
      );

      toast.success("Profile image uploaded successfully");
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
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
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message || "Password changed successfully");

      setFormData({
        oldPassword: "",
        newPassword: "",
      });
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const formatRole = (role?: string) => {
    if (!role) return "Administrator";

    return role
      .toLowerCase()
      .split("_")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#FBF8FF] p-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={
                    user?.imageUrl ||
                    "https://png.pngtree.com/background/20250106/original/pngtree-a-hackers-use-computer-picture-image_15824759.jpg"
                  }
                  className="w-28 h-28 rounded-full p-1 border object-cover"
                />
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                      uploadProfileImage(file);
                    }
                  }}
                />

                <label htmlFor="profile-upload">
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#1E40AF] hover:bg-[#18379c] text-white rounded-md text-xs flex items-center justify-center cursor-pointer">
                    {uploading ? "..." : "+"}
                  </div>
                </label>

                <label
                  htmlFor="admin-profile-upload"
                  className="absolute bottom-0 right-0 w-7 h-7 bg-[#1E40AF] rounded-md flex items-center justify-center text-white cursor-pointer"
                >
                  {uploading ? "..." : <ShieldCheck size={14} />}
                </label>
              </div>

              <div className="mt-6">
                <input
                  type="file"
                  accept="image/*"
                  id="profile-upload"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                      uploadProfileImage(file);
                    }
                  }}
                />

                <label htmlFor="profile-upload">
                  <Button
                    asChild
                    disabled={uploading}
                    className="w-28 bg-[#1E40AF] hover:bg-blue-800 text-white cursor-pointer"
                  >
                    <span>{uploading ? "Uploading..." : "Upload Image"}</span>
                  </Button>
                </label>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                {user?.name ?? "Administrator"}
              </h2>

              <Badge className="mt-4 bg-blue-50 text-blue-700 hover:bg-blue-50">
                {formatRole(user?.role)}
              </Badge>

              <div className="mt-6 space-y-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full text-white bg-[#1E40AF] hover:bg-[#18379c]">
                      <KeyRound className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] rounded-2xl bg-[#F8FAFF] border border-[#E2E8F0]">
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
                        className="text-white bg-[#1E40AF] hover:bg-[#18379c]"
                        onClick={handleChangePassword}
                      >
                        Update Password
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-9 space-y-6">
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">
                Administrator Information
              </CardTitle>

              <p className="text-sm text-gray-500">
                Read-only administrative identity records.
              </p>
            </CardHeader>

            <Separator />

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-8 pt-8">
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Official Email
                </p>

                <p className="mt-2 font-semibold text-gray-800 break-all">
                  {user?.email ?? "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Primary Role
                </p>

                <p className="mt-2 font-semibold text-gray-800">
                  {formatRole(user?.role)}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Department
                </p>

                <p className="mt-2 font-semibold text-gray-800">
                  Hospital Administration
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Access Permissions
                </p>

                <p className="mt-2 font-semibold text-gray-800">
                  Full System Access
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 rounded-2xl border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Activity</CardTitle>

                <Button variant="ghost" size="sm">
                  View Logs
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
                  <div className="text-blue-600">
                    <Activity size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Login successful from Admin Dashboard
                    </p>

                    <p className="text-xs text-gray-400">Today, 09:30 AM</p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
                  <div className="text-green-600">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Updated ward management permissions
                    </p>

                    <p className="text-xs text-gray-400">Yesterday, 05:45 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
                  <div className="text-purple-600">
                    <Activity size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Reviewed staffing allocation report
                    </p>

                    <p className="text-xs text-gray-400">Yesterday, 11:10 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-[#1E40AF] border-0 text-white shadow-sm">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                    <ShieldCheck size={24} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">Security Audit</h3>

                  <p className="text-sm leading-relaxed text-blue-100">
                    Your administrator account security was verified recently.
                    Next compliance review scheduled in 15 days.
                  </p>
                </div>

                <Button
                  className="mt-10 border border-white/20 bg-white/20 text-white hover:bg-white/30"
                  onClick={() => {
                    toast.success(
                      `Security scan refreshed at ${new Date().toLocaleTimeString()}`,
                    );
                  }}
                >
                  RUN SECURITY SCAN
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
