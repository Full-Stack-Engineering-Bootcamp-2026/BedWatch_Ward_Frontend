import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Admin/pages/Dashboard";
// import ForgotPassword from "./pages/ResetPassword";
import Layout from "./components/layout/Layout";
import SrStaffDashboard from "./components/SrStaff/DashBoard";
import TransfersList from "./components/SrStaff/InterWardTransfer";
import AdminLayout from "./components/Admin/layout/Layout";
import StaffManagement from "./components/Admin/pages/StaffManagement";
import WardManagement from "./components/Admin/pages/WardManagement";
import AdminProfile from "./components/Admin/pages/AdminProfile";
import WardControl from "./components/Admin/pages/WardControl";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/Systemadmin" element={<StaffManagement />} />
          <Route path="/Wardview" element={<WardManagement />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/wardcontrol" element={<WardControl />} />
        </Route>

        <Route path="/sr-staff/dashboard" element={<SrStaffDashboard />} />
        <Route path="/sr-staff/transfers" element={<TransfersList />} />

        <Route path="forgot-password" element={<ForgotPasswordEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
