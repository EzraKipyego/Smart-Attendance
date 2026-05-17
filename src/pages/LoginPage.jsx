import { signInWithGoogle } from "../services/firebase"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = async () => {
    const user = await signInWithGoogle()

    if (user) {
      console.log("Logged in user:", user)
      navigate("/dashboard")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-5 rounded text-center">
        <h1 className="text-xl mb-3">Login Page</h1>

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default LoginPage