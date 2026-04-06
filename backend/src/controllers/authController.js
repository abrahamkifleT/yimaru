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
    xp: 1840,
    nextLevelXp: 2500,
    streak: 12,
    activity: [60, 45, 80, 55, 90, 70, 100],
    skills: [
      { skill: 'Speaking',   value: 72 },
      { skill: 'Listening',  value: 85 },
      { skill: 'Grammar',    value: 61 },
      { skill: 'Vocabulary', value: 78 },
      { skill: 'Writing',    value: 54 },
    ],
    achievements: [
      { icon: '🔥', title: '12-Day Streak', desc: 'Studied 12 days in a row' },
      { icon: '🏆', title: 'Silver League', desc: 'Top 10% this week' },
      { icon: '📖', title: 'Bookworm', desc: 'Finished 10 reading modules' },
    ]
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

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' })
    }

    const existingUser = USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists.' })
    }

    const salt = await bcrypt.genSalt(10)
    const newPasswordHash = await bcrypt.hash(password, salt)

    const newUser = {
      id: USERS.length > 0 ? Math.max(...USERS.map(u => u.id)) + 1 : 1,
      name,
      email,
      passwordHash: newPasswordHash,
      level: 'Beginner',
      avatar: '👤',
      xp: 0,
      nextLevelXp: 1000,
      streak: 0,
      activity: [0, 0, 0, 0, 0, 0, 0],
      skills: [
        { skill: 'Speaking',   value: 0 },
        { skill: 'Listening',  value: 0 },
        { skill: 'Grammar',    value: 0 },
        { skill: 'Vocabulary', value: 0 },
        { skill: 'Writing',    value: 0 },
      ],
      achievements: []
    }

    USERS.push(newUser)

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { passwordHash, ...safeUser } = newUser

    res.json({
      success: true,
      token,
      user: safeUser,
    })
  } catch (err) {
    next(err)
  }
}

export const rewardProgress = async (req, res, next) => {
  try {
    const { xpGained } = req.body
    
    if (!xpGained || typeof xpGained !== 'number') {
      return res.status(400).json({ success: false, message: 'Valid xpGained is required.' })
    }

    const user = USERS.find(u => u.id === req.user.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' })
    }

    user.xp += xpGained

    // Level up logic
    if (user.xp >= user.nextLevelXp) {
      user.level = user.level === 'Beginner' ? 'Intermediate' : 'Advanced'
      user.xp = user.xp - user.nextLevelXp
      user.nextLevelXp = Math.floor(user.nextLevelXp * 1.5)
    }

    // Bump today's activity (just simulating a random entry bump)
    if (user.activity && user.activity.length === 7) {
      user.activity[6] = Math.min(100, user.activity[6] + (xpGained / 2))
    }

    // Set first streak if zero
    if (user.streak === 0) {
      user.streak = 1
    }

    const { passwordHash, ...safeUser } = user

    res.json({ success: true, user: safeUser })
  } catch (err) {
    next(err)
  }
}
