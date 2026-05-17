import useFetch from "../hooks/useFetch"

function Attendance() {

  // CUSTOM HOOK
  const {
    data: records,
    loading,
    error
  } = useFetch("http://localhost:3000/attendance")

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-gray-900 text-white p-4">

        <h1 className="text-xl font-bold mb-6">
          Attendance System
        </h1>

        <ul className="space-y-3 text-sm">
          <li>Dashboard</li>

          <li>Sessions</li>

          <li className="text-green-400 font-semibold">
            Attendance History
          </li>

          <li>Reports</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 sm:p-6">

        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">

          <h1 className="text-2xl font-bold text-gray-800">
            Attendance History
          </h1>

          <p className="text-sm text-gray-600">
            Total Records: {records.length}
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        {/* CONTENT */}
        {loading ? (

          <p className="text-gray-600">
            Loading records...
          </p>

        ) : records.length === 0 ? (

          <p className="text-gray-600">
            No attendance records
          </p>

        ) : (

          <div className="space-y-3 max-w-4xl">

            {records.map((record) => (
              <div
                key={record.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full max-w-2xl hover:shadow-md transition"
              >

                <div className="flex justify-between items-start">

                  {/* LEFT SIDE */}
                  <div>

                    <h2 className="font-semibold text-base text-gray-800">
                      Session ID: {record.sessionId}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Student: {record.studentName}
                    </p>

                    <p className="text-sm text-gray-500">
                      Date: {record.date}
                    </p>

                    <p className="text-sm text-gray-500">
                      Time: {record.time}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded">

                    Present

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default Attendance