import { useState, useRef, useEffect, useCallback } from 'react';

// Check browser support once at module level (stable, no re-evaluation)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const hasBrowserSupport = !!SpeechRecognition;

/**
 * useSpeechToText — Custom React hook wrapping the Web Speech API.
 *
 * Features:
 * - Continuous listening with real-time interim results
 * - Full accumulated transcript (not just per-chunk delta)
 * - Amharic (am-ET) and English (en-US) support via `lang` option
 * - Exports stopListening for external control (e.g., auto-stop on send)
 *
 * @param {Object}  options
 * @param {string}  options.lang  BCP-47 language tag, e.g. 'en-US' | 'am-ET'
 *
 * @returns {{ isListening, transcript, toggleListening, startListening, stopListening, hasBrowserSupport }}
 */
export default function useSpeechToText({ lang = 'en-US' } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  // Tracks all finalized segments so interim results always build on them
  const finalizedRef = useRef('');

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          // Commit finalized text
          finalizedRef.current += result[0].transcript;
        } else {
          // Accumulate interim text after finalized
          interim += result[0].transcript;
        }
      }
      // Expose finalized + current interim as a single transcript string
      setTranscript(finalizedRef.current + interim);
    };

    recognition.onerror = (event) => {
      // 'no-speech' is benign — don't treat as fatal
      if (event.error !== 'no-speech') {
        console.error('[useSpeechToText] error:', event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [lang]); // Reinitialize when language changes

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    finalizedRef.current = '';
    setTranscript('');
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      console.error('[useSpeechToText] start failed:', e);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    try {
      recognitionRef.current.stop();
      // onend will set isListening → false
    } catch (e) {
      console.error('[useSpeechToText] stop failed:', e);
      setIsListening(false);
    }
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) stopListening();
    else startListening();
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    toggleListening,
    hasBrowserSupport,
  };
}
