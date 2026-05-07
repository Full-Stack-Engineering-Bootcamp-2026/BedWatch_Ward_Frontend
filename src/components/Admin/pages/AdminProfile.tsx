import React from "react";

import { KeyRound, LogOut } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { logout } from "@/store/slices/authSlice";

function AdminProfile() {
  const user = useSelector((state: any) => state.auth.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  return (
    <div className="w-full h-[590px] bg-[#FBF8FF]">
      <div className="max-w-3xl mx-auto">
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
                <Button className="bg-[#1E40AF] hover:bg-[#18379c] text-white">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change Password
                </Button>

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
