import OpenAI from 'openai'

// ✅ Lazy-initialized so process.env is guaranteed to be loaded
// (dotenv/config is imported first in app.js)
let openai = null
function getOpenAI() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return openai
}

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

// ── Send a chat message ──────────────────────────────────
export const sendMessage = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'A non-empty message is required.' })
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-20).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content || m.text,
      })),
      { role: 'user', content: message.trim() },
    ]

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 600,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content?.trim()

    if (!reply) throw new Error('Empty response from OpenAI.')

    res.json({ success: true, reply, usage: completion.usage })
  } catch (err) {
    if (err.status === 401) {
      return res.status(401).json({ 
        success: false, 
        message: '❌ Invalid OpenAI API key. Open backend/.env and replace OPENAI_API_KEY with your real key from https://platform.openai.com/api-keys' 
      })
    }
    if (err.status === 429) {
      return res.status(429).json({ success: false, message: 'OpenAI rate limit reached. Please try again in a moment.' })
    }
    next(err)
  }
}

// ── Text-to-Speech ────────────────────────────────────────
export const textToSpeech = async (req, res, next) => {
  try {
    const { text, voice = 'alloy' } = req.body
    // Supported voices: alloy, echo, fable, onyx, nova, shimmer

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Text is required for speech synthesis.' })
    }

    // Truncate to keep costs low (OpenAI TTS max is 4096 chars)
    const safeText = text.trim().slice(0, 500)

    const mp3Response = await getOpenAI().audio.speech.create({
      model: 'tts-1',           // tts-1 (fast) or tts-1-hd (higher quality)
      voice,
      input: safeText,
      response_format: 'mp3',
      speed: 0.95,              // Slightly slower for learners
    })

    const audioBuffer = Buffer.from(await mp3Response.arrayBuffer())

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
      'Cache-Control': 'no-cache',
    })
    res.send(audioBuffer)
  } catch (err) {
    if (err.status === 401) {
      return res.status(401).json({ success: false, message: 'Invalid OpenAI API key for TTS.' })
    }
    next(err)
  }
}

// ── Get history ───────────────────────────────────────────
export const getHistory = async (req, res, next) => {
  try {
    // TODO: fetch from DB using req.user.id
    res.json({ success: true, history: [] })
  } catch (err) {
    next(err)
  }
}
