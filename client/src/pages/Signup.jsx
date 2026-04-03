import React, { useContext, useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Signup() {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await API.post("/users/signup", {
        name,
        email,
        password
      })

      if (res.status === 200 || res.status === 201) {
        navigate('/login')
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Logged in as {user.name}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Step {step} of 2
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded mb-6">
          <div
            className={`h-2 bg-black rounded transition-all ${step === 1 ? "w-1/2" : "w-full"}`}
          />
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Continue
            </button>

          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition
              ${loading
                  ? "bg-gray-400"
                  : "bg-black hover:bg-gray-800"
                }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-black font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>

      </div>

    </div>
  )
}