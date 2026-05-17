import { useEffect, useState } from "react"
import { auth } from "../services/firebase"

function Dashboard() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch(() => setSessions([]))
  }, [])

  const markAttendance = async (sessionId) => {
    setLoading(true)

    const user = auth.currentUser

    if (!user) {
      alert("User not logged in")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("http://localhost:3000/attendance")
      const data = await res.json()

      const alreadyMarked = data.some(
        (record) =>
          record.sessionId === sessionId &&
          record.email === user.email
      )

      if (alreadyMarked) {
        alert("Already marked attendance")
        setLoading(false)
        return
      }

      const now = new Date()

      const attendanceData = {
        studentName: user.displayName || user.email.split("@")[0],
        email: user.email,
        sessionId,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      }

      await fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData)
      })

      alert("Attendance marked successfully")
    } catch (error) {
      console.log(error)
      alert("Failed to mark attendance")
    }

    setLoading(false)
  }

  return (
    <div className="flex h-screen">

      <div className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6">
          Student Panel
        </h1>

        <ul className="space-y-3 text-sm">
          <li className="text-green-400">Dashboard</li>
          <li>Sessions</li>
          <li>Attendance</li>
        </ul>
      </div>


      <div className="flex-1 bg-gray-100 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Available Sessions
        </h2>

        {sessions.length === 0 ? (
          <p>No active sessions available</p>
        ) : (
          <div className="space-y-3">

            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white border rounded p-3 shadow-sm w-full max-w-xl"
              >

                <div className="flex justify-between items-start">

      
                  <div>
                    <h2 className="font-semibold text-base text-gray-800">
                      {session.title}
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Status: {session.status}
                    </p>
                  </div>

                
                  <button
                    onClick={() => markAttendance(session.id)}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                  >
                    {loading ? "..." : "Mark"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard