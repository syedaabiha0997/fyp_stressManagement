import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations"
import MyAI from "./pages/MyAI"
import Settings from "./pages/Settings"


import Reports from "./pages/Reports";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import Data from "./pages/data";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai" element={<MyAI />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/data" element={<Data />} />



        </Route>
      </Routes>
    </>
  );
}

export default App;

