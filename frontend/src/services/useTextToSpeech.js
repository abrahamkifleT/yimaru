import { useState, useCallback, useRef } from 'react'
import api from './api'

/**
 * Hook for Text-to-Speech.
 * - Uses OpenAI TTS (via backend) for English
 * - Falls back to browser SpeechSynthesis for Amharic (am-ET)
 */
export default function useTextToSpeech() {
  const [playingId, setPlayingId] = useState(null)
  const [loading, setLoading] = useState(null)
  const audioRef = useRef(null)

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    window.speechSynthesis?.cancel()
    setPlayingId(null)
  }, [])

  const speak = useCallback(async (text, id, lang = 'en-US') => {
    // Stop any currently playing audio first
    stop()
    setLoading(id)

    try {
      // Use browser SpeechSynthesis for Amharic (OpenAI TTS doesn't support am-ET)
      if (lang === 'am-ET') {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'am-ET'
        utterance.rate = 0.9
        utterance.onend = () => setPlayingId(null)
        utterance.onerror = () => setPlayingId(null)
        setPlayingId(id)
        window.speechSynthesis.speak(utterance)
        return
      }

      // Use OpenAI TTS via backend for English
      const response = await api.post('/chat/speak', 
        { text: text.slice(0, 500), voice: 'nova' },
        { responseType: 'blob' }
      )

      const audioUrl = URL.createObjectURL(response.data)
      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        setPlayingId(null)
        URL.revokeObjectURL(audioUrl)
      }
      audio.onerror = () => {
        setPlayingId(null)
        URL.revokeObjectURL(audioUrl)
      }

      setPlayingId(id)
      await audio.play()
    } catch (err) {
      console.error('TTS Error:', err)
      setPlayingId(null)
    } finally {
      setLoading(null)
    }
  }, [stop])

  const toggle = useCallback((text, id, lang = 'en-US') => {
    if (playingId === id) {
      stop()
    } else {
      speak(text, id, lang)
    }
  }, [playingId, speak, stop])

  return { playingId, loading, toggle, stop }
}
