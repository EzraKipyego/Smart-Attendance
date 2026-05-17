import './App.css'

import { Routes, Route, useLocation } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import Attendance from "./pages/Attendance"

import Navbar from "./components/Navbar"
import AdminRoute from "./components/AdminRoute"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
         path="/admin"
         element={
        <AdminRoute>
        <Admin />
        </AdminRoute>
  }
/>

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App