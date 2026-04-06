import { useState, useRef, useEffect } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    text: "👋 Hi! I'm Yimaru AI, your personal English tutor. I can help you with grammar, vocabulary, pronunciation tips, and conversation practice.\n\nWhat would you like to work on today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
]

const QUICK_PROMPTS = [
  '🗣️ Practice a conversation',
  '📝 Check my grammar',
  '📖 Teach me a new word',
  '🔊 Help with pronunciation',
]

const MOCK_RESPONSES = [
  "Great question! Let's practice a real-life conversation. Imagine you're at a job interview. How would you introduce yourself?\n\nTry starting with: \"Hello, my name is...\"",
  "Sure! Share a sentence and I'll check it for grammar errors and suggest improvements. I'll also explain the rule so you understand why.",
  "Today's word: **Eloquent** (adjective)\n\n**Meaning:** Fluent and persuasive in speaking.\n**Example:** *She gave an eloquent speech that moved the audience.*\n\nCan you use it in your own sentence?",
  "For clear pronunciation, focus on syllable stress. For example, the word **'beautiful'** is stressed on the first syllable: **BEA**-u-ti-ful.\n\nWould you like tips for a specific word?",
  "That's a great effort! Here's a small correction:\n\n❌ *I am go to the market.*\n✅ *I am going to the market.*\n\nThe verb after 'am/is/are' should be in **-ing** form (present continuous). Keep it up!",
]

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
      {/* Avatar */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
        background: isUser ? 'var(--color-secondary)' : 'var(--color-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
      }}>
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '72%',
        background: isUser ? 'var(--color-primary)' : 'var(--color-card)',
        border: isUser ? 'none' : '1px solid rgba(108,99,255,0.2)',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        padding: '0.9rem 1.2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}>
        <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.7, color: isUser ? '#fff' : 'var(--color-text)', whiteSpace: 'pre-wrap' }}>
          {msg.text}
        </p>
        <span style={{ display: 'block', fontSize: '0.7rem', color: isUser ? 'rgba(255,255,255,0.6)' : 'var(--color-muted)', marginTop: '6px', textAlign: isUser ? 'right' : 'left' }}>
          {msg.time}
        </span>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🤖</div>
      <div style={{ background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: '18px 18px 18px 4px', padding: '0.9rem 1.2rem' }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: '7px', height: '7px', background: 'var(--color-primary)', borderRadius: '50%',
              animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    const userMsg = { id: Date.now(), role: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }, 1400 + Math.random() * 600)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input.trim())
  }

  return (
    <>
      {/* Bounce animation */}
      <style>{`
        @keyframes bounce {
          0%,60%,100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>

      <div style={{ display: 'flex', height: 'calc(100vh - 65px)', background: 'var(--color-dark)', overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: '270px', flexShrink: 0, background: 'var(--color-surface)',
          borderRight: '1px solid rgba(108,99,255,0.15)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }} className="hidden md:flex">
          <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(108,99,255,0.12)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>🤖 AI Tutor</h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Always here to help you improve</p>
          </div>

          <div style={{ padding: '1.25rem', flex: 1, overflowY: 'auto' }}>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Quick Start</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {QUICK_PROMPTS.map(p => (
                <button key={p} onClick={() => sendMessage(p)}
                  style={{
                    background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)',
                    borderRadius: '8px', padding: '10px 12px', color: 'var(--color-text)',
                    fontSize: '0.85rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(108,99,255,0.18)'; e.target.style.borderColor = 'rgba(108,99,255,0.4)' }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(108,99,255,0.08)'; e.target.style.borderColor = 'rgba(108,99,255,0.15)' }}
                >
                  {p}
                </button>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Session Stats</p>
              {[['Messages sent', messages.filter(m => m.role === 'user').length], ['Words practiced', Math.floor(messages.filter(m => m.role === 'user').length * 8.4)], ['XP earned', messages.filter(m => m.role === 'user').length * 10]].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 0', borderBottom: '1px solid rgba(108,99,255,0.08)' }}>
                  <span style={{ color: 'var(--color-muted)' }}>{label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main chat pane ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(108,99,255,0.15)', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), #A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Yimaru AI Tutor</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
                <span style={{ width: '7px', height: '7px', background: 'var(--color-secondary)', borderRadius: '50%', display: 'inline-block' }} />
                Online · Responds instantly
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', scrollbarWidth: 'thin', scrollbarColor: 'rgba(108,99,255,0.3) transparent' }}>
            {messages.map(msg => <Message key={msg.id} msg={msg} />)}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts (mobile) */}
          <div style={{ padding: '0 1rem', overflowX: 'auto', display: 'flex', gap: '0.5rem', paddingBottom: '0.5rem' }} className="md:hidden">
            {QUICK_PROMPTS.map(p => (
              <button key={p} onClick={() => sendMessage(p)} style={{ flexShrink: 0, background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: '100px', padding: '6px 14px', color: 'var(--color-primary)', fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>{p}</button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(108,99,255,0.15)', background: 'var(--color-surface)', display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e) } }}
              placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
              rows={1}
              style={{
                flex: 1, background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: '12px', padding: '12px 16px', color: 'var(--color-text)', fontSize: '0.93rem',
                resize: 'none', outline: 'none', fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.2s', maxHeight: '140px', lineHeight: 1.6,
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={e => e.target.style.borderColor = 'rgba(108,99,255,0.25)'}
            />
            <Button type="submit" size="md" style={{ height: '48px', flexShrink: 0 }}>
              Send ➤
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
