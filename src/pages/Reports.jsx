import { useEffect, useState, useRef } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

function Reports() {
  const [attendance, setAttendance] = useState([])
  const [sessions, setSessions] = useState([])
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(true)

  const reportRef = useRef()

  useEffect(() => {
    fetch("http://localhost:3000/attendance")
      .then((res) => res.json())
      .then((data) => setAttendance(data))
      .catch(() => setAttendance([]))

    fetch("http://localhost:3000/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch(() => setSessions([]))

    setTime(new Date().toLocaleString())
    setLoading(false)
  }, [])

  const downloadPDF = () => {
    const input = reportRef.current

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: 0
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF("p", "mm", "a4")

      const imgWidth = 190
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight)
      pdf.save("attendance-report.pdf")
    })
  }

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-4">
        Admin Reports
      </h1>

      <button
        onClick={downloadPDF}
        className="bg-green-700 text-white px-4 py-2 rounded mb-4"
      >
        Download PDF
      </button>

      
      <div ref={reportRef} className="p-4 bg-white">

    
        <div className="mb-4 border p-3 rounded">
          <p className="font-bold">System Time:</p>
          {loading ? <p>Loading...</p> : <p>{time}</p>}
        </div>


        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="border p-4 rounded">
            <h2 className="font-bold">Total Sessions</h2>
            <p>{sessions.length}</p>
          </div>

          <div className="border p-4 rounded">
            <h2 className="font-bold">Total Attendance Records</h2>
            <p>{attendance.length}</p>
          </div>

        </div>


        <h2 className="font-bold mb-3">
          Attendance Records
        </h2>

        {attendance.length === 0 ? (
          <p>No records found</p>
        ) : (
          attendance.map((item) => (
            <div key={item.id} className="border p-4 mb-4 rounded bg-white">

              <h3 className="font-bold text-lg mb-2">
                Session ID: {item.sessionId}
              </h3>

              <p><b>Date:</b> {item.date || "No Date"}</p>

              <hr className="my-2" />

              <p>
                <b>Student:</b> {item.studentName} ({item.email})
              </p>

              <p>
                <b>Status:</b>{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  present
                </span>
              </p>

              <p>
                <b>Time:</b> {item.time}
              </p>

            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default Reports