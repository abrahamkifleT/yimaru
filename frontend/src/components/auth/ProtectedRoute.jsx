import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Wrap any <Route> element with this to require authentication.
 * Unauthenticated users are redirected to /login, and the
 * intended destination is stored in location.state.from so we
 * can redirect back after a successful login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
