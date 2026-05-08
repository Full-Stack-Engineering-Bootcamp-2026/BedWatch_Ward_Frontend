import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { getLoggedInUserProfile } from "@/services/srStaff.profile.service";

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
  ward: Ward | null;
  created_at: string;
  updated_at: string;
};

export default function SrStaffProfile() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await getLoggedInUserProfile();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
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
              {/*  connect S3 profile image API here */}
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=senior-staff"
                className="w-24 h-24 rounded-lg border object-cover"
              />

              <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#1E40AF] text-white rounded-md text-xs"></button>
              {/* api change password */}
            </div>

            <h2 className="font-bold text-2xl text-gray-900">
              {user?.name ?? "Senior Staff"}
            </h2>

            <span className="inline-block mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
              {user?.role ?? "SENIOR_STAFF"}
            </span>

            <Button className="w-full mt-6 bg-[#1E40AF] hover:bg-blue-800 text-white">
              Edit Profile
            </Button>

            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={() => {
                //api-change password
              }}
            >
              Change Password
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
                {formatAccessLevel(user?.role)}
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
                  {user?.name ?? "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Official Email
                </p>
                <p className="font-bold text-gray-800 mt-2">
                  {user?.email ?? "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Primary Role
                </p>
                <p className="font-bold text-gray-800 mt-2">
                  {formatRole(user?.role)}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Assigned Ward
                </p>
                <p className="font-bold text-gray-800 mt-2">
                  {user?.ward
                    ? `${user.ward.name} - ${user.ward.type}`
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
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
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

                <button className="text-xs font-semibold text-blue-600">
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
