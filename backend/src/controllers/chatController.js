import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are Yimaru AI, an expert English language tutor. Your goal is to help learners improve their English through friendly, encouraging, and educational conversations.

You can help with:
- Grammar corrections and explanations
- Vocabulary building with examples
- Pronunciation tips
- Conversation practice
- Writing improvement

Rules:
- Keep responses concise and easy to understand
- When correcting grammar, show both the incorrect and correct versions
- Always encourage the learner
- Use emojis occasionally to keep the mood light
- If asked something unrelated to English learning, gently redirect the conversation`

export const sendMessage = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'A non-empty message is required.' })
    }

    // Build messages array for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      // Include up to last 20 messages for context
      ...history.slice(-20).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content || m.text,
      })),
      { role: 'user', content: message.trim() },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',       // Fast + cost-effective; swap to 'gpt-4o' for higher quality
      messages,
      max_tokens: 600,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content?.trim()

    if (!reply) {
      throw new Error('Empty response from OpenAI.')
    }

    res.json({
      success: true,
      reply,
      usage: completion.usage,    // Useful for monitoring token costs
    })
  } catch (err) {
    // Pass through OpenAI-specific error messages
    if (err.status === 401) {
      return res.status(401).json({ success: false, message: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in backend/.env' })
    }
    if (err.status === 429) {
      return res.status(429).json({ success: false, message: 'OpenAI rate limit reached. Please try again in a moment.' })
    }
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
