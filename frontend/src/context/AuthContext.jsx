import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

let API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
if (API_URL.endsWith('/')) {
  API_URL = API_URL.slice(0, -1)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('yimaru_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Login failed.')
    }

    // Persist both user info and JWT token
    const payload = { ...data.user, token: data.token }
    sessionStorage.setItem('yimaru_user', JSON.stringify(payload))
    setUser(payload)
    return payload
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Signup failed.')
    }

    const payload = { ...data.user, token: data.token }
    sessionStorage.setItem('yimaru_user', JSON.stringify(payload))
    setUser(payload)
    return payload
  }, [])

  const updateProgress = useCallback(async (xpGained) => {
    if (!user) return

    const res = await fetch(`${API_URL}/auth/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ xpGained }),
    })

    if (res.ok) {
      const data = await res.json()
      const payload = { ...data.user, token: user.token }
      sessionStorage.setItem('yimaru_user', JSON.stringify(payload))
      setUser(payload)
      return payload
    }
  }, [user])

  const logout = useCallback(() => {
    sessionStorage.removeItem('yimaru_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, updateProgress, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

