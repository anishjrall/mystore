import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await login({ email, password })
      navigate('/')
    } catch (error) {
      console.log("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Login to continue shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
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


          {/* Password */}
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


          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition
            ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        {/* Signup Link */}
        <div className='mt-6 text-center text-sm'>
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className='text-black font-semibold cursor-pointer hover:underline'
            >
              Sign up
            </span>
          </p>
        </div>

      </div>

    </div>
  )
}