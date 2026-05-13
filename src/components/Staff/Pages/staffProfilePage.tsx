import React, { useEffect, useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { getLoggedInUserProfile } from "@/services/srStaff.profile.service";
import { logout } from "@/store/slices/authSlice";
import { LogOut, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

import { login } from "@/store/slices/authSlice";

type Ward = {
  id: number;

  name: string;

  type: string;

  capacity: number;
};

type ProfileUser = {
  id: number;

  name: string;

  email: string;

  role: string;

  imageUrl?: string;

  ward: Ward | null;

  created_at: string;

  updated_at: string;
};

export default function StaffProfile() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user: authUser, token } = useSelector((state: any) => state.auth);

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",

    newPassword: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
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

            "Content-Type": "multipart/form-data",
          },
        },
      );

      const imageUrl = response.data.data.imageUrl;

      setProfileUser((prev: any) => ({
        ...prev,

        imageUrl: imageUrl,
      }));

      dispatch(
        login({
          token: token!,
          user: {
            ...authUser,
            imageUrl: imageUrl,
          },
        }),
      );

      toast.success("Profile image uploaded successfully");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to upload profile image",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!authUser?.id) {
        toast.error("User not found");

        return;
      }

      if (!formData.oldPassword || !formData.newPassword) {
        toast.error("Please enter old and new password");

        profileImage: imageUrl,
      }));

      toast.success("Profile image uploaded successfully");
    } catch (error: any) {
      console.error("Upload failed", error);

      toast.error(error?.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!authUser?.id) {
        toast.error("User not found");

        return;
      }

      if (!formData.oldPassword || !formData.newPassword) {
        toast.error("Please enter old and new password");

        return;
      }

      if (!token) {
        toast.error("Token not found. Please login again.");

        return;
      }

      const response = await axios.put(
        "http://localhost:3000/api/v1/usersAdmin/change-password",
        {
          id: Number(authUser.id),

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

  const fetchProfile = async () => {
    try {
      const data = await getLoggedInUserProfile();

      setProfileUser(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);

      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatRole = (role?: string) => {
    if (!role) return "Ward Staff";

    if (role === "STAFF") {
      return "Ward Staff";
    }

    return role
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatAccessLevel = (role?: string) => {
    if (role === "STAFF") {
      return "L1-Staff";
    }

    return "L1-Staff";
  };

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  if (loading) {
    return (
      <div className="w-full bg-[#FBF8FF] p-8 min-h-screen">
        <div className="p-10 text-lg font-semibold">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FBF8FF] p-8 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img
                src={profileUser?.imageUrl || ""}
                alt="Profile"
                className="w-24 h-24 rounded-xl border-2 border-blue-100 object-cover shadow-sm"
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
            </div>

            <h2 className="font-bold text-2xl text-gray-900">
              {profileUser?.name ?? "Staff"}
            </h2>

            <span className="inline-block mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
              {profileUser?.role ?? "STAFF"}
            </span>

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
                  className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white cursor-pointer"
                >
                  <span>{uploading ? "Uploading..." : "Upload Image"}</span>
                </Button>
              </label>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-3 text-white bg-[#1E40AF] hover:bg-[#18379c]">
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
              variant="outline"
              className="w-full mt-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white border border-gray-200 rounded-md p-4">
              <p className="text-xs text-gray-500 font-semibold">
                Shift Status
              </p>

              <p className="text-lg font-bold text-green-600">Active</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-4">
              <p className="text-xs text-gray-500 font-semibold">
                Access Level
              </p>

              <p className="text-lg font-bold text-blue-600">
                {formatAccessLevel(profileUser?.role)}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-9">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">
                Employee Information
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Read-only operational identity records.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-8 p-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Full Name
                </p>

                <p className="font-bold text-gray-800 mt-2">
                  {profileUser?.name ?? "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Official Email
                </p>

                <p className="font-bold text-gray-800 mt-2">
                  {profileUser?.email ?? "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Primary Role
                </p>

                <p className="font-bold text-gray-800 mt-2">
                  {formatRole(profileUser?.role)}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Assigned Ward
                </p>

                <p className="font-bold text-gray-800 mt-2">
                  {profileUser?.ward
                    ? `${profileUser.ward.name} - ${profileUser.ward.type}`
                    : "No ward assigned"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Contact Phone
                </p>

                <p className="font-bold text-gray-800 mt-2">+91-8080-***-213</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Joined Date
                </p>

                <p className="font-bold text-gray-800 mt-2">
                  {profileUser?.created_at
                    ? new Date(profileUser.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",

                          month: "long",

                          day: "numeric",
                        },
                      )
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
