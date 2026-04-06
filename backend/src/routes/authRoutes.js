import { Router } from 'express'
import { login, signup, getMe, rewardProgress } from '../controllers/authController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

// POST /api/auth/signup
router.post('/signup', signup)

// POST /api/auth/login
router.post('/login', login)

// GET /api/auth/me  (protected)
router.get('/me', verifyToken, getMe)

// POST /api/auth/progress (protected)
router.post('/progress', verifyToken, rewardProgress)

export default router
