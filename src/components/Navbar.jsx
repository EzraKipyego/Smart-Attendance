import { NavLink, useNavigate } from "react-router-dom"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"
import { useEffect, useState } from "react"

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/")
  }

  const adminEmail = "ezrasmaei65@gmail.com"

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-green-200 font-semibold border-b-2 border-green-300 pb-1"
      : "text-white/90 hover:text-green-200 transition"

  return (
    <div className="bg-linear-to-r from-green-700 to-green-600 text-white shadow-md">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 gap-3">

        <div className="font-bold text-lg tracking-wide">
          Attendance Management System
        </div>

        <div className="flex gap-6 flex-wrap text-sm">

          <NavLink to="/dashboard" className={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/attendance" className={linkStyle}>
            Attendance
          </NavLink>

          {user?.email === adminEmail && (
            <NavLink to="/admin" className={linkStyle}>
              Admin
            </NavLink>
          )}

        </div>

      
        <div className="flex items-center gap-3">

          <span className="text-xs opacity-90 hidden sm:block">
            {user?.email ? `Welcome` : ""}
          </span>

          <button
            onClick={handleLogout}
            className="bg-white text-green-700 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  )
}

export default Navbar