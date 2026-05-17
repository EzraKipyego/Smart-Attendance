import SessionCard from "./SessionCard"

function SessionList({ sessions, deleteSession }) {
  return (
    <div>
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          deleteSession={deleteSession}
        />
      ))}
    </div>
  )
}

export default SessionList