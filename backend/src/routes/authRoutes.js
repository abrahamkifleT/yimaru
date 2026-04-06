import { Router } from 'express'
import { login, getMe } from '../controllers/authController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

// POST /api/auth/login
router.post('/login', login)

// GET /api/auth/me  (protected)
router.get('/me', verifyToken, getMe)

export default router
