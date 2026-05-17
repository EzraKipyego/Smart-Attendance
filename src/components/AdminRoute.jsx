import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"

function AdminRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return (
  <div className="flex items-center justify-center h-screen">
    <p className="text-gray-600">Checking authentication...</p>
  </div>
)


  const adminEmail = "ezrasmaei65@gmail.com"

  if (!user) {
    return <Navigate to="/" />
  }

  if (user.email !== adminEmail) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default AdminRoute