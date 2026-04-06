import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Mock user database — swap for a real API call later
const MOCK_USERS = [
  { id: 1, name: 'Abraham Kifle', email: 'abraham@yimaru.com', level: 'Intermediate', avatar: '👨‍💻' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Persist login across page refreshes via sessionStorage
    try {
      const stored = sessionStorage.getItem('yimaru_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = useCallback(async (email, password) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800))

    const found = MOCK_USERS.find(u => u.email === email)
    if (!found || password.length < 3) {
      throw new Error('Invalid email or password.')
    }
    sessionStorage.setItem('yimaru_user', JSON.stringify(found))
    setUser(found)
    return found
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('yimaru_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
