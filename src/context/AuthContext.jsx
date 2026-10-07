import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const TOKEN_KEY = 'cardioia.fake-jwt'

function readStoredUser() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return null
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  function login(email) {
    const firstName = email.split('@')[0].split(/[._-]/).at(-1)
    const userData = {
      name: firstName ? firstName[0].toUpperCase() + firstName.slice(1) : 'Mariana',
      email,
      role: 'Cardiologista',
    }
    const payload = btoa(JSON.stringify(userData))
    localStorage.setItem(TOKEN_KEY, `cardioia.${payload}.fake-signature`)
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}