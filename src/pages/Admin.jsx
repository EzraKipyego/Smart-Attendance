import { useEffect, useState } from "react"
import AddSession from "../components/AddSession"
import SessionList from "../components/SessionList"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

function Admin() {
  const [sessions, setSessions] = useState([])
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch(() => setSessions([]))

    fetch("http://localhost:3000/attendance")
      .then((res) => res.json())
      .then((data) => setAttendance(data))
      .catch(() => setAttendance([]))
  }, [])

  const addSession = async (title) => {
    const trimmedTitle = title.trim().toLowerCase()

    if (!trimmedTitle) {
      alert("Session title cannot be empty")
      return
    }

    try {
      const res = await fetch("http://localhost:3000/sessions")
      const data = await res.json()

      const exists = data.some(
        (session) =>
          session.title.trim().toLowerCase() === trimmedTitle
      )

      if (exists) {
        alert("Session exists!")
        return
      }

      const newSession = {
        title,
        status: "open",
        date: new Date().toISOString().split("T")[0]
      }

      const createRes = await fetch("http://localhost:3000/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSession)
      })

      const created = await createRes.json()

      setSessions([...sessions, created])

      alert("Session added")
    } catch (error) {
      console.log(error)
      alert("Failed to add session")
    }
  }

  const deleteSession = async (id) => {
    await fetch(`http://localhost:3000/sessions/${id}`, {
      method: "DELETE"
    })

    setSessions(sessions.filter((s) => s.id !== id))
  }

  const downloadReport = async () => {
    const report = document.getElementById("report")

    const canvas = await html2canvas(report, {
      scale: 2,
      useCORS: true,
      scrollY: 0
    })

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")

    const imgWidth = 190
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight)
    pdf.save("attendance-report.pdf")
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">

      <div className="w-full md:w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6">
          Attendance System
        </h1>

        <ul className="space-y-3 text-sm">
          <li className="text-green-400 font-semibold">
            Dashboard
          </li>
          <li>Sessions</li>
          <li>Attendance</li>
          <li>Reports</li>
        </ul>
      </div>

      <div className="flex-1 p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Session Management
          </h2>

          <button
            onClick={downloadReport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Download Report
          </button>
        </div>

    
        <AddSession addSession={addSession} />

      
        <SessionList
          sessions={sessions}
          deleteSession={deleteSession}
        />

        <div
          id="report"
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: "800px",
            background: "white",
            padding: "20px"
          }}
        >
          <h2>Attendance Report</h2>

          <p><b>Total Sessions:</b> {sessions.length}</p>
          <p><b>Total Attendance Sessions:</b> {attendance.length}</p>

          <hr />

          <h3>Attendance Records</h3>

          {attendance.length === 0 ? (
            <p>No records found</p>
          ) : (
            attendance.map((session) => (
              <div key={session.id}>
                <p><b>Session:</b> {session.sessionTitle}</p>
                <p><b>Session ID:</b> {session.sessionId}</p>
                <p><b>Date:</b> {session.date}</p>

                <hr />

                {session.records?.map((rec, index) => (
                  <div key={index}>
                    <p>
                      <b>Student:</b> {rec.studentName} ({rec.email})
                    </p>
                    <p>
                      <b>Status:</b> {rec.status}
                    </p>
                    <p>
                      <b>Time:</b> {rec.time}
                    </p>
                    <hr />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Admin