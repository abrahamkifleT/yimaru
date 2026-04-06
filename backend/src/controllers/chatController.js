// Smart fallback responses for when no AI service is connected
const FALLBACK_RESPONSES = [
  "Great effort! Let's practice a real-life conversation. Imagine you're at a job interview — how would you introduce yourself?\n\nTry starting with: \"Hello, my name is...\"",
  "Sure! Share any sentence and I'll check it for grammar errors and explain the rule so you truly understand it.",
  "Today's word: **Eloquent** (adjective)\n\nMeaning: Fluent and persuasive in speaking.\nExample: *She gave an eloquent speech that moved the audience.*\n\nCan you use it in your own sentence?",
  "For clear pronunciation, focus on syllable stress. The word *'beautiful'* is stressed on the first syllable: **BEA**-u-ti-ful.\n\nWould you like tips for a specific word?",
  "Great question! The present perfect tense (have/has + past participle) describes experiences up to now.\n\nExample:\n✅ *I have visited Paris.*\n✅ *She has never tried sushi.*\n\nWant to practice more?",
]

export const sendMessage = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'A message string is required.' })
    }

    // ─────────────────────────────────────────────────────────────
    // TODO: Replace with your AI service call, e.g.:
    //
    // const aiReply = await openai.chat.completions.create({
    //   model: 'gpt-4o',
    //   messages: [
    //     { role: 'system', content: 'You are Yimaru, an expert English tutor...' },
    //     ...history,
    //     { role: 'user', content: message },
    //   ],
    // })
    // const reply = aiReply.choices[0].message.content
    // ─────────────────────────────────────────────────────────────

    // Simulate AI latency (150–400ms)
    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 250))

    const reply = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]

    res.json({ success: true, reply })
  } catch (err) {
    next(err)
  }
}

export const getHistory = async (req, res, next) => {
  try {
    // TODO: Fetch from database using req.user.id
    res.json({ success: true, history: [] })
  } catch (err) {
    next(err)
  }
}
