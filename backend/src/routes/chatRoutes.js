import { Router } from 'express'
import { sendMessage, getHistory } from '../controllers/chatController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

// All chat routes require a valid JWT
router.use(verifyToken)

// POST /api/chat
router.post('/', sendMessage)

// GET /api/chat/history
router.get('/history', getHistory)

export default router
