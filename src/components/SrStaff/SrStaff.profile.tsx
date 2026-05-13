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
import { login } from "@/store/slices/authSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export default function SrStaffProfile() {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: authUser, token } = useSelector((state: any) => state.auth);

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
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
          },
        },
      );

      const imageUrl = response.data.data.imageUrl;

      setProfileUser((prev: any) => ({
        ...prev,
        imageUrl,
      }));

      dispatch(
        login({
          token: token!,
          user: {
            ...authUser,
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
    if (!role) return "Senior Staff";

    if (role === "SENIOR_STAFF") {
      return "Senior Bed Manager";
    }

    return role
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatAccessLevel = (role?: string) => {
    if (role === "SENIOR_STAFF") return "L3-Admin";
    if (role === "ADMIN") return "L4-Admin";
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
                src={
                  profileUser?.imageUrl ||
                  "https://api.dicebear.com/7.x/adventurer/svg?seed=senior-staff"
                }
                alt="Senior staff profile"
                className="w-24 h-24 rounded-xl border object-cover"
              />
            </div>

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

            <h2 className="font-bold text-2xl text-gray-900 mt-4">
              {profileUser?.name ?? "Senior Staff"}
            </h2>

            <span className="inline-block mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
              {profileUser?.role ?? "SENIOR_STAFF"}
            </span>

            <div className="mt-6">
              <Button
                type="button"
                disabled={uploading}
                onClick={() => {
                  const input = document.getElementById(
                    "profile-upload",
                  ) as HTMLInputElement;

                  input?.click();
                }}
                className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>

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

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-lg text-gray-900">
                  Recent Activity
                </h3>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600"
                >
                  View full logs
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 flex gap-4">
                  <span className="text-blue-600">↪</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Login successful from Terminal A12
                    </p>
                    <p className="text-xs text-gray-400">Today, 08:45 AM</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 flex gap-4">
                  <span className="text-teal-600">☰</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Modified admission status for Bed 402B
                    </p>
                    <p className="text-xs text-gray-400">Yesterday, 04:22 PM</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 flex gap-4">
                  <span className="text-teal-600">☑</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Approved discharge request #DR-9012
                    </p>
                    <p className="text-xs text-gray-400">Yesterday, 11:15 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E40AF] rounded-xl p-6 text-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-6">🛡️</div>

                <h3 className="font-bold text-xl mb-3">Security Audit</h3>

                <p className="text-sm text-blue-100 leading-relaxed">
                  Your account was last audited for compliance on Jan 12. Next
                  review scheduled in 15 days.
                </p>
              </div>

              <Button
                className="mt-10 bg-white/20 hover:bg-white/30 text-white border border-white/20"
                onClick={() => {
                  toast.success(
                    `Security scan refreshed successfully at ${new Date().toLocaleTimeString()}`,
                  );
                }}
              >
                RUN SCAN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
