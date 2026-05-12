import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Admin/pages/Dashboard";
// import ForgotPassword from "./pages/ResetPassword";
// import Layout from "./components/layout/Layout";
import SrStaffDashboard from "./components/SrStaff/DashBoard";
import TransfersList from "./components/SrStaff/InterWardTransfer";
import AdminLayout from "./components/Admin/layout/Layout";
import StaffManagement from "./components/Admin/pages/StaffManagement";
import WardManagement from "./components/Admin/pages/WardManagement";
import AdminProfile from "./components/Admin/pages/AdminProfile";
// import WardControl from "./components/Admin/pages/WardControl";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import ResetPassword from "./pages/ResetPassword";
import SrStaffRoute from "./components/SrStaff/Layout/Layout";
import SrStaffProfile from "./components/SrStaff/SrStaff.profile";
import SrStaffAllWards from "./components/SrStaff/AllWards";
import ViewTransferReq from "./components/SrStaff/ViewPending";
import OperationalReports from "./components/Admin/pages/OperationalReports";
import StaffLayout from "./components/Staff/layout/Layout";
import StaffDashboard from "./components/Staff/Pages/StaffDashboard";
import NewAdmissionPage from "./components/Staff/Pages/NewAdmission";
import DischargePatientsPage from "./components/Staff/Pages/DischargePatient";
import StaffProfile from "./components/Staff/Pages/staffProfilePage";
import CommonProtectedRoute from "./components/protected/CommonProtected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<CommonProtectedRoute Role={"ADMIN"} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/Wardview" element={<WardManagement />} />
            <Route path="/Systemadmin" element={<StaffManagement />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route
              path="/admin-occupancyChart"
              element={<OperationalReports />}
            />
          </Route>
        </Route>

        <Route element={<CommonProtectedRoute Role={"SENIOR_STAFF"} />}>
          <Route element={<SrStaffRoute />}>
            <Route path="/sr-staff/dashboard" element={<SrStaffDashboard />} />
            <Route path="/sr-staff/transfers" element={<TransfersList />} />
            <Route path="/sr-staff/profile" element={<SrStaffProfile />} />
            <Route path="/sr-staff/AllWards" element={<SrStaffAllWards />} />
            <Route path="/sr-staff/ViewPending" element={<ViewTransferReq />} />
          </Route>
        </Route>

        <Route element={<CommonProtectedRoute Role={"STAFF"} />}>
          <Route element={<StaffLayout />}>
            <Route path="/staff-dashboard" element={<StaffDashboard />} />

            <Route path="/staff/admit" element={<NewAdmissionPage />} />

            <Route
              path="/staff/discharge"
              element={<DischargePatientsPage />}
            />

            <Route path="/staff/profile" element={<StaffProfile />} />
          </Route>
        </Route>

        <Route path="/forgot-password" element={<ForgotPasswordEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
