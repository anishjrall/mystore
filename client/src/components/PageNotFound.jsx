import { useNavigate } from "react-router-dom"
import { FiAlertCircle } from "react-icons/fi"
export default function PageNotFound() {

  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <FiAlertCircle size={60} className="text-gray-300 mb-4" />
      <h1 className="text-6xl font-bold text-gray-300 mb-2">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Go Home
      </button>

    </div>
  )
}