import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRoutes from './routes/chatRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173',  // Vite dev server
  credentials: true,
}))
app.use(express.json())

// ── Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

// ── Health check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Yimaru API is running 🚀' })
})

// ── 404 handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` })
})

// ── Global error handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Error]', err.message)
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`\n🌐 Yimaru Backend running on http://localhost:${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/api/health\n`)
})

export default app
