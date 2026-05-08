import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Admin/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./components/layout/Layout";
import SrStaffDashboard from "./components/SrStaff/DashBoard";
import TransfersList from "./components/SrStaff/InterWardTransfer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/sr-staff/dashboard" element={<SrStaffDashboard />} />
        <Route path="/sr-staff/transfers" element={<TransfersList />} />

        <Route path="ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
