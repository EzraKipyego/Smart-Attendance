import { useState } from "react"

function AddSession({ addSession }) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === "") return

    addSession(title)

    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter session name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />

      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
  Add Session
</button>
    </form>
  )
}

export default AddSession