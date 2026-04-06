import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// ✅ Hash is computed once at startup — guarantees it matches the plain password below.
// To add more users: run node -e "const b=require('bcryptjs'); console.log(b.hashSync('yourpassword',10))" in backend/
const DEMO_HASH = bcrypt.hashSync('demo123', 10)

const USERS = [
  {
    id: 1,
    name: 'Abraham Kifle',
    email: 'abraham@yimaru.com',
    passwordHash: DEMO_HASH,
    level: 'Intermediate',
    avatar: '👨‍💻',
  },
]

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' })
    }

    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Don't return the password hash
    const { passwordHash, ...safeUser } = user

    res.json({
      success: true,
      token,
      user: safeUser,
    })
  } catch (err) {
    next(err)
  }
}

export const getMe = (req, res) => {
  // req.user is set by verifyToken middleware
  const user = USERS.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' })

  const { passwordHash, ...safeUser } = user
  res.json({ success: true, user: safeUser })
}
