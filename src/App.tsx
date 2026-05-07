import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Admin/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./components/Admin/layout/Layout";
import StaffManagement from "./components/Admin/StaffManagement";
import WardManagement from "./components/Admin/WardManagement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/Systemadmin" element={<StaffManagement />} />
          <Route path="/Wardview" element={<WardManagement />} />
        </Route>

        <Route path="ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
