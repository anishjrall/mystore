import { createContext, useState, useEffect } from "react"
import API from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (formData) => {
    try {

      const res = await API.post("/users/login", formData)

      localStorage.setItem("token", res.data.token)

      const profile = await API.get("/users/profile")

      setUser(profile.data)

    }
    catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const getProfile = async () => {
    try {
      const res = await API.get("/users/profile")
      setUser(res.data)
    } catch (error) {
      setUser(null)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}