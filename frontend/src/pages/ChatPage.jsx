import { useState, useRef, useEffect, useCallback } from 'react'
import chatService from '../services/chatService'
import useSpeechToText from '../hooks/useSpeechToText'
import useTextToSpeech from '../services/useTextToSpeech'

// ─── Initial welcome message ─────────────────────────────────────────────────
const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  text: "👋 Hi! I'm **Yimaru AI**, your personal English tutor powered by GPT-4.\n\nI can help you with:\n• 📝 Grammar corrections & explanations\n• 📖 Vocabulary with real examples\n• 🗣️ Conversation practice\n• 🔊 Pronunciation tips\n• ✍️ Writing improvement\n\nWhat would you like to work on today?",
  time: now(),
}

const QUICK_PROMPTS = [
  { label: '🗣️ Practice conversation', text: 'Let\'s practice a casual conversation in English.' },
  { label: '📝 Check my grammar', text: 'Can you check my grammar? I will write a sentence.' },
  { label: '📖 Teach me a word', text: 'Teach me an advanced English word with examples.' },
  { label: '🔊 Pronunciation tip', text: 'Give me a useful English pronunciation tip.' },
]

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// ─── Markdown-lite renderer ──────────────────────────────────────────────────
function renderText(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    // Bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={j}>{part.slice(2, -2)}</strong>
        : part
    )
    return <span key={i}>{parts}{i < lines.length - 1 && <br />}</span>
  })
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function Avatar({ role }) {
  return (
    <div style={{
      width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1rem', fontWeight: 700,
      background: role === 'user' ? 'linear-gradient(135deg, #48BB78, #38A169)' : 'transparent',
      overflow: 'hidden'
    }}>
      {role === 'user' 
        ? '👤' 
        : <img src="/logo.png" alt="Yimaru AI" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      }
    </div>
  )
}

function MessageBubble({ msg, tts }) {
  const isUser = msg.role === 'user'
  const isPlaying = tts?.playingId === msg.id
  const isLoadingTTS = tts?.loading === msg.id

  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
      padding: '0.5rem 0',
      animation: 'fadeSlideIn 0.2s ease',
    }}>
      <Avatar role={msg.role} />
      <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div style={{
          background: isUser ? 'var(--color-primary)' : 'var(--color-card)',
          border: isUser ? 'none' : '1px solid rgba(108,99,255,0.18)',
          borderRadius: isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
          padding: '0.75rem 1.1rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          lineHeight: 1.72,
          fontSize: '0.9rem',
          color: isUser ? '#fff' : 'var(--color-text)',
        }}>
          {renderText(msg.text)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 4px' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--color-muted)' }}>{msg.time}</span>
          {/* TTS play button — only on AI messages */}
          {!isUser && tts && (
            <button
              onClick={() => tts.toggle(msg.text, msg.id)}
              title={isPlaying ? 'Stop' : 'Listen'}
              style={{
                background: isPlaying ? 'rgba(108,99,255,0.2)' : 'none',
                border: '1px solid rgba(108,99,255,0.2)',
                borderRadius: '6px',
                padding: '2px 7px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                color: 'var(--color-primary)',
                transition: 'all 0.15s',
                lineHeight: 1.6,
              }}
            >
              {isLoadingTTS ? '⏳' : isPlaying ? '⏹ Stop' : '🔊 Listen'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.5rem 0' }}>
      <Avatar role="assistant" />
      <div style={{
        background: 'var(--color-card)',
        border: '1px solid rgba(108,99,255,0.18)',
        borderRadius: '4px 18px 18px 18px',
        padding: '0.9rem 1.2rem',
        display: 'flex', gap: '5px', alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'inline-block',
            animation: `typingBounce 1.2s ${i * 0.18}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ChatPage() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Text-to-Speech
  const tts = useTextToSpeech()
  
  // Speech-to-Text Integration
  const [speechLang, setSpeechLang] = useState('en-US')
  const { isListening, transcript, toggleListening, hasBrowserSupport, stopListening } = useSpeechToText({ lang: speechLang })
  const baseInputRef = useRef('')

  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
  }, [input])

  // Track original text before dictation starts
  useEffect(() => {
    if (isListening) {
      baseInputRef.current = input
    }
  }, [isListening])
  
  // Update text dynamically as user speaks
  useEffect(() => {
    if (isListening && transcript) {
      const space = baseInputRef.current && !baseInputRef.current.endsWith(' ') ? ' ' : ''
      setInput(baseInputRef.current + space + transcript)
    }
  }, [transcript, isListening])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    // Stop recording if active before sending
    if (isListening) stopListening()

    const userMsg = { id: Date.now(), role: 'user', text: trimmed, time: now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.text }))
      const data = await chatService.sendMessage(trimmed, history)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: data.reply,
        time: now(),
      }])
    } catch (err) {
      setError(err.message || 'Failed to reach the AI. Please check your connection.')
    } finally {
      setIsLoading(false)
      // Re-focus input after response
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [messages, isLoading, isListening, stopListening])

  const handleSubmit = (e) => {
    e?.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const clearChat = () => {
    setMessages([WELCOME])
    setError(null)
    textareaRef.current?.focus()
  }

  const userMsgCount = messages.filter(m => m.role === 'user').length

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseMic {
          0% { box-shadow: 0 0 0 0 rgba(252, 129, 129, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(252, 129, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(252, 129, 129, 0); }
        }
        .chat-scroll::-webkit-scrollbar { width: 5px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(108,99,255,0.3); border-radius: 10px; }
        .chat-textarea:focus { outline: none; border-color: var(--color-primary) !important; }
      `}</style>

      <div style={{ display: 'flex', height: 'calc(100vh - 65px)', overflow: 'hidden', background: 'var(--color-dark)' }}>

        {/* ── Sidebar ───────────────────────────────────────────── */}
        <aside style={{
          width: '260px', flexShrink: 0,
          background: 'var(--color-surface)',
          borderRight: '1px solid rgba(108,99,255,0.15)',
          display: 'flex', flexDirection: 'column',
          transition: 'width 0.25s ease',
        }} className="hidden md:flex">

          {/* Sidebar header */}
          <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(108,99,255,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/logo.png" alt="Yimaru" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Yimaru AI</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-secondary)' }}>● GPT-4o-mini</div>
              </div>
            </div>
            <button onClick={clearChat} style={{
              width: '100%', padding: '9px', borderRadius: '8px',
              background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)',
              color: 'var(--color-text)', fontSize: '0.85rem', cursor: 'pointer',
              transition: 'background 0.2s', fontFamily: 'var(--font-sans)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(108,99,255,0.1)'}
            >
              + New Chat
            </button>
          </div>

          {/* Quick prompts */}
          <div style={{ padding: '1rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Quick Start</p>
            {QUICK_PROMPTS.map(p => (
              <button key={p.label} onClick={() => sendMessage(p.text)}
                style={{
                  padding: '9px 12px', borderRadius: '8px', textAlign: 'left',
                  background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.12)',
                  color: 'var(--color-text)', fontSize: '0.83rem', cursor: 'pointer',
                  transition: 'all 0.18s', fontFamily: 'var(--font-sans)', lineHeight: 1.4,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,99,255,0.16)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(108,99,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.12)' }}
              >
                {p.label}
              </button>
            ))}

            {/* Session stats */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Session</p>
              {[
                ['💬', 'Messages', userMsgCount],
                ['📝', 'Words practiced', Math.floor(userMsgCount * 9.3)],
                ['⚡', 'XP earned', userMsgCount * 10],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(108,99,255,0.08)', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--color-muted)' }}>{icon} {label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Chat pane ─────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Chat header */}
          <div style={{
            padding: '0.9rem 1.5rem',
            borderBottom: '1px solid rgba(108,99,255,0.15)',
            background: 'var(--color-surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/logo.png" alt="Yimaru" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Yimaru AI Tutor</div>
                <div style={{ fontSize: '0.75rem', color: isLoading ? 'var(--color-accent)' : 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: isLoading ? 'var(--color-accent)' : 'var(--color-secondary)', display: 'inline-block', animation: isLoading ? 'typingBounce 1s infinite' : 'none' }} />
                  {isLoading ? 'Thinking…' : 'Online · GPT-4o-mini'}
                </div>
              </div>
            </div>
            <button onClick={clearChat}
              style={{ background: 'none', border: '1px solid rgba(108,99,255,0.25)', borderRadius: '8px', padding: '6px 14px', color: 'var(--color-muted)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.25)'; e.currentTarget.style.color = 'var(--color-muted)' }}
            >
              🗑 Clear
            </button>
          </div>

          {/* Messages area */}
          <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {messages.map(msg => <MessageBubble key={msg.id} msg={msg} tts={tts} />)}
            {isLoading && <TypingDots />}

            {/* Error banner */}
            {error && (
              <div style={{ margin: '0.5rem 0', padding: '0.9rem 1.1rem', background: 'rgba(252,129,129,0.1)', border: '1px solid rgba(252,129,129,0.25)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#FC8181', fontSize: '0.875rem' }}>⚠️ {error}</span>
                <button onClick={() => {
                  const last = [...messages].reverse().find(m => m.role === 'user')
                  if (last) sendMessage(last.text)
                }}
                  style={{ flexShrink: 0, background: 'rgba(252,129,129,0.15)', border: '1px solid rgba(252,129,129,0.4)', color: '#FC8181', borderRadius: '7px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Mobile quick prompts */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.5rem 1rem 0', scrollbarWidth: 'none' }} className="md:hidden">
            {QUICK_PROMPTS.map(p => (
              <button key={p.label} onClick={() => sendMessage(p.text)} style={{ flexShrink: 0, background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.22)', borderRadius: '100px', padding: '5px 13px', color: 'var(--color-primary)', fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>
                {p.label}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div style={{ padding: '0.75rem 1.25rem', background: 'var(--color-surface)', borderTop: '1px solid rgba(108,99,255,0.15)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            {/* Dictation controls */}
            {hasBrowserSupport && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={toggleListening}
                  style={{
                    background: isListening ? 'rgba(252,129,129,0.15)' : 'rgba(108,99,255,0.1)',
                    border: '1px solid',
                    borderColor: isListening ? 'rgba(252,129,129,0.4)' : 'rgba(108,99,255,0.22)',
                    color: isListening ? '#FC8181' : 'var(--color-primary)',
                    borderRadius: '8px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)',
                    animation: isListening ? 'pulseMic 1.5s infinite' : 'none'
                  }}
                >
                  {isListening ? '🛑 Stop Recording' : '🎙️ Dictate'}
                </button>
                <select 
                  value={speechLang} 
                  onChange={e => setSpeechLang(e.target.value)}
                  disabled={isListening}
                  style={{
                    background: 'rgba(108,99,255,0.05)',
                    border: '1px solid rgba(108,99,255,0.2)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: 'var(--color-text)',
                    fontSize: '0.75rem',
                    outline: 'none',
                    cursor: 'pointer',
                    opacity: isListening ? 0.6 : 1,
                  }}
                >
                  <option value="en-US">English</option>
                  <option value="am-ET">Amharic (አማርኛ)</option>
                </select>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{
              display: 'flex', gap: '0.75rem', alignItems: 'flex-end',
              background: 'var(--color-card)',
              border: '1.5px solid rgba(108,99,255,0.25)',
              borderRadius: '14px',
              padding: '0.6rem 0.75rem 0.6rem 1rem',
              transition: 'border-color 0.2s',
            }}
              onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.25)'}
            >
              <textarea
                ref={textareaRef}
                className="chat-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? 'Listening...' : 'Message Yimaru AI… (Enter to send, Shift+Enter for new line)'}
                rows={1}
                disabled={isLoading}
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: isLoading || isListening ? 'var(--color-muted)' : 'var(--color-text)',
                  fontSize: '0.93rem', fontFamily: 'var(--font-sans)',
                  resize: 'none', lineHeight: 1.65, maxHeight: '160px',
                  scrollbarWidth: 'none', padding: 0,
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{
                  width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                  background: input.trim() && !isLoading ? 'var(--color-primary)' : 'rgba(108,99,255,0.2)',
                  border: 'none', cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', transition: 'all 0.2s',
                }}
              >
                {isLoading ? '⏳' : '➤'}
              </button>
            </form>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--color-muted)' }}>
              Yimaru AI can make mistakes. Always verify important language rules.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
