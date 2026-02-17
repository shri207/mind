import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Loader2, CloudOff, Cloud, Sparkles } from 'lucide-react'
import { sendMessage, detectCrisis, analyzeSentiment, initChat } from '../services/gemini.js'
import { speakText, stopAudio } from '../services/elevenlabs.js'
import { createSpeechRecognition } from '../services/speechRecognition.js'
import { saveChatMessage, loadChatHistory, buildAIMemoryContext, saveMoodSnapshot } from '../services/firestore.js'

export default function AiChat({ onCrisis, onSentimentUpdate, isAuthReady, fullscreen = false }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [voiceEnabled, setVoiceEnabled] = useState(true)
    const [historyLoaded, setHistoryLoaded] = useState(false)
    const [syncStatus, setSyncStatus] = useState('synced')
    const messagesEndRef = useRef(null)
    const recognitionRef = useRef(null)
    const inputRef = useRef(null)
    const chatInitialized = useRef(false)

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    // Initialize AI chat immediately, then try loading history in background
    useEffect(() => {
        if (!isAuthReady || chatInitialized.current) return
        chatInitialized.current = true

        const welcomeMsg = {
            role: 'ai',
            content: "Welcome to Inner Self. I'm here as your mental wellness companion — think of me as a calm, supportive coach. How are you feeling today? Take a moment to check in with yourself.",
            timestamp: new Date(),
        }

        // 1. Init Gemini chat immediately (no network call, instant)
        initChat().catch(e => console.warn('initChat failed:', e))
        setMessages([welcomeMsg])
        setHistoryLoaded(true)

        // 2. Try loading Firestore history in background (non-blocking)
        loadChatHistory(50)
            .then(history => {
                if (history && history.length > 0) {
                    setMessages(history.map(msg => ({
                        role: msg.role,
                        content: msg.content,
                        timestamp: msg.timestamp,
                    })))
                    // Re-init chat with memory context
                    buildAIMemoryContext(20)
                        .then(ctx => initChat(ctx))
                        .catch(() => { })
                }
            })
            .catch(() => {
                // Firestore unavailable — that's fine, chat already works
            })
    }, [isAuthReady])

    const handleSend = async (text = input) => {
        const trimmed = text.trim()
        if (!trimmed || loading) return

        if (detectCrisis(trimmed)) {
            onCrisis?.()
        }

        const userMsg = { role: 'user', content: trimmed, timestamp: new Date() }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        setSyncStatus('saving')
        try {
            await saveChatMessage('user', trimmed)
            setSyncStatus('synced')
        } catch (e) {
            console.warn('Failed to save user message:', e)
            setSyncStatus('error')
        }

        try {
            const aiResponse = await sendMessage(trimmed)
            const aiMsg = { role: 'ai', content: aiResponse, timestamp: new Date() }
            setMessages(prev => [...prev, aiMsg])

            try {
                await saveChatMessage('ai', aiResponse)
            } catch (e) {
                console.warn('Failed to save AI message:', e)
            }

            try {
                const sentiment = await analyzeSentiment(trimmed)
                onSentimentUpdate?.(sentiment)
                await saveMoodSnapshot(sentiment)
            } catch (e) { /* don't block on sentiment failure */ }

            if (voiceEnabled) {
                setIsSpeaking(true)
                try {
                    await speakText(aiResponse)
                } catch (e) {
                    console.warn('TTS failed:', e)
                }
                setIsSpeaking(false)
            }
        } catch (error) {
            console.error('AI Chat error:', error)
            let errorMsg = "I'm having a moment of difficulty connecting. Please try sending your message again."
            if (error.message?.includes('429') || error.message?.includes('quota')) {
                errorMsg = "⚠️ API quota has been exceeded. Your Gemini API key's free tier limit has been reached. Please generate a new API key at https://aistudio.google.com/apikey and update your .env file, then restart the dev server."
            } else if (error.message?.includes('All models failed')) {
                errorMsg = "⚠️ All AI models are unavailable. This usually means your API key quota is exhausted. Please get a new key from https://aistudio.google.com/apikey"
            }
            setMessages(prev => [
                ...prev,
                { role: 'ai', content: errorMsg, timestamp: new Date() },
            ])
        }

        setLoading(false)
    }

    const toggleVoiceInput = () => {
        if (isListening) {
            recognitionRef.current?.stop()
            setIsListening(false)
            return
        }

        const recognition = createSpeechRecognition(
            (transcript, isFinal) => {
                setInput(transcript)
            },
            (finalTranscript) => {
                setIsListening(false)
                if (finalTranscript) {
                    handleSend(finalTranscript)
                }
            }
        )

        if (recognition) {
            recognitionRef.current = recognition
            recognition.start()
            setIsListening(true)
        }
    }

    const toggleVoice = () => {
        if (isSpeaking) {
            stopAudio()
            setIsSpeaking(false)
        }
        setVoiceEnabled(!voiceEnabled)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const containerClass = fullscreen
        ? 'flex flex-col h-full'
        : 'glass-card flex flex-col h-[500px]'

    return (
        <div className={containerClass}>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
                {!historyLoaded && (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center gap-3 text-slate-500">
                            <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">Restoring your conversation...</span>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${fullscreen ? 'max-w-3xl mx-auto w-full' : ''}`}
                        >
                            {msg.role === 'ai' && (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500/30 to-lavender-500/30 flex items-center justify-center shrink-0 mt-1">
                                    <Bot className="w-4 h-4 text-brand-300" />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                    ? 'chat-bubble-user text-white'
                                    : 'chat-bubble-ai text-slate-200'
                                    }`}
                            >
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-lavender-500/30 to-pink-500/30 flex items-center justify-center shrink-0 mt-1">
                                    <User className="w-4 h-4 text-lavender-300" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`flex gap-3 ${fullscreen ? 'max-w-3xl mx-auto w-full' : ''}`}
                    >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500/30 to-lavender-500/30 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-brand-300" />
                        </div>
                        <div className="chat-bubble-ai px-4 py-3 flex items-center gap-2">
                            <div className="flex gap-1">
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                        className="w-2 h-2 rounded-full bg-brand-400"
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-slate-500 ml-2">Thinking...</span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Voice Visualizer */}
            <AnimatePresence>
                {(isListening || isSpeaking) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 48, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex items-center justify-center gap-1.5 border-t border-white/5 bg-gradient-to-r from-brand-500/5 to-lavender-500/5 overflow-hidden"
                    >
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, Math.random() * 24 + 8, 4] }}
                                transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.08 }}
                                className={`w-1 rounded-full ${isListening ? 'bg-red-400' : 'bg-brand-400'}`}
                            />
                        ))}
                        <span className="text-xs text-slate-400 ml-3">
                            {isListening ? '🎙️ Listening...' : '🔊 Speaking...'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced Input Bar */}
            <div className={`px-4 pb-4 pt-3 border-t border-white/5 ${fullscreen ? 'bg-surface-primary/50 backdrop-blur-sm' : ''}`}>
                {/* Status indicators row */}
                <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-3">
                        {/* Voice toggle */}
                        <button
                            onClick={toggleVoice}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-medium transition-all ${voiceEnabled
                                ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                                : 'bg-white/5 text-slate-600 border border-white/5'
                                }`}
                        >
                            {voiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                            {voiceEnabled ? 'Voice On' : 'Voice Off'}
                        </button>

                        {/* Sync status */}
                        <div
                            className="flex items-center gap-1"
                            title={syncStatus === 'synced' ? 'All messages saved' : syncStatus === 'saving' ? 'Saving...' : 'Sync error'}
                        >
                            {syncStatus === 'error' ? (
                                <CloudOff className="w-3 h-3 text-red-400" />
                            ) : (
                                <Cloud className={`w-3 h-3 ${syncStatus === 'saving' ? 'text-yellow-400 animate-pulse' : 'text-emerald-500/40'}`} />
                            )}
                            <span className="text-[10px] text-slate-600">
                                {syncStatus === 'synced' ? 'Saved' : syncStatus === 'saving' ? 'Saving' : 'Error'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Input row */}
                <div className={`flex items-end gap-2 ${fullscreen ? 'max-w-3xl mx-auto' : ''}`}>
                    {/* Big mic button */}
                    <button
                        onClick={toggleVoiceInput}
                        className={`p-3.5 rounded-2xl transition-all duration-300 shrink-0 ${isListening
                            ? 'bg-red-500/20 text-red-400 animate-pulse ring-2 ring-red-500/30 shadow-lg shadow-red-500/20'
                            : 'bg-gradient-to-br from-slate-800 to-slate-800/60 text-slate-400 hover:text-white hover:from-brand-500/20 hover:to-lavender-500/20 border border-white/5'
                            }`}
                        title={isListening ? 'Stop listening' : 'Voice input — speak your thoughts'}
                    >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    {/* Input field */}
                    <div className="flex-1 relative">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={isListening ? '🎙️ Listening to you...' : 'Share what\'s on your mind...'}
                            rows={1}
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-800/80 border border-white/5 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
                            style={{ minHeight: '48px', maxHeight: '120px' }}
                        />
                    </div>

                    {/* Send button */}
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || loading}
                        className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-lavender-500 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-brand-500/25 transition-all shrink-0 active:scale-95"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    )
}
