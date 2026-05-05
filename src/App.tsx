
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Admin/Dashboard";
function App() {
 

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login />} />
          <Route path="/admin-dashboard"  element={<Dashboard />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
