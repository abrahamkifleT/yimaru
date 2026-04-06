import axios from 'axios'

// Base Axios instance
const getBaseURL = () => {
  let url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  return url.endsWith('/') ? url.slice(0, -1) : url
}

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request: attach JWT ──────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const userData = sessionStorage.getItem('yimaru_user')
    if (userData) {
      try {
        const { token } = JSON.parse(userData)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch {
        // Corrupted session — clear it
        sessionStorage.removeItem('yimaru_user')
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response: handle errors globally ────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      // Token is missing or expired — clear session and go to login
      sessionStorage.removeItem('yimaru_user')
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'

    return Promise.reject({ ...error, message })
  }
)

export default api
