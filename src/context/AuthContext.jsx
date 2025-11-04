// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Recuperar sesión guardada
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  // Login simulado
  const login = (usernameOrData, password) => {
    if (typeof usernameOrData === 'object') {
      setUser(usernameOrData)
      localStorage.setItem('user', JSON.stringify(usernameOrData))
      return true
    }

    if (usernameOrData === 'user' && password === 'user') {
      const userData = {
        username: 'user',
        name: 'Usuario demo',
        email: 'user@demo.com'
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }

    return false
  }

  // Logout limpio
  const logout = () => {
    setUser(null)
    setTimeout(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('carrito')
    }, 0)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
