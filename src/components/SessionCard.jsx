function SessionCard({ session, deleteSession }) {
  return (
    <div className="bg-white border rounded p-3 shadow-sm mb-3 w-full max-w-xl">

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
          onClick={() => deleteSession(session.id)}
          className="text-red-500 hover:text-red-700 text-xs font-medium transition"
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default SessionCard