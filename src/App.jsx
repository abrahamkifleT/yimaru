import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import HomePage       from './pages/HomePage'
import LoginPage      from './pages/LoginPage'
import DashboardPage  from './pages/DashboardPage'
import ChatPage       from './pages/ChatPage'
import LessonsPage    from './pages/LessonsPage'
import PracticePage   from './pages/PracticePage'
import ProgressPage   from './pages/ProgressPage'
import NotFoundPage   from './pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* ── Public routes ── */}
            <Route path="/"        element={<HomePage />} />
            <Route path="/login"   element={<LoginPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/practice" element={<PracticePage />} />

            {/* ── Protected routes ── */}
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute><ChatPage /></ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute><ProgressPage /></ProtectedRoute>
            } />

            {/* ── 404 ── */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
