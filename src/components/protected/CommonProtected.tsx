import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
type commonProps = {
  Role: String;
};
export default function CommonProtectedRoute({ Role }: commonProps) {
  const { user, token } = useSelector((state: any) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== Role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
