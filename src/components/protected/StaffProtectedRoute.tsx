import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StaffProtectedRoute() {
  const { user, token } = useSelector((state: any) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "STAFF") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}