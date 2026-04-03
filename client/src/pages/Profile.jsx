import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {

  const { user, loading, logout } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-black rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">

      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">

          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-3">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold">
            {user?.name}
          </h1>

          <p className="text-gray-500">
            {user?.email}
          </p>

        </div>


        {/* Info Section */}
        <div className="border rounded-xl p-4 space-y-3">

          <div className="flex justify-between">
            <span className="text-gray-600">
              Name
            </span>
            <span className="font-semibold">
              {user?.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Email
            </span>
            <span className="font-semibold">
              {user?.email}
            </span>
          </div>

          {user?.role && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Role
              </span>
              <span className="font-semibold capitalize">
                {user?.role}
              </span>
            </div>
          )}

        </div>


        {/* Logout */}
        <button
          onClick={logout}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
        >
          Logout
        </button>

      </div>

    </div>
  )
}