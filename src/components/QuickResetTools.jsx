import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Shield, RefreshCw, Trophy, Sparkles, ChevronRight, X } from 'lucide-react'
import { generateResponse } from '../services/gemini.js'

const TOOLS = [
    {
        id: 'breathing',
        icon: Wind,
        title: '3-Min Breathing Reset',
        description: 'Calm your nervous system with guided breathing',
        color: 'from-teal-500 to-cyan-500',
        type: 'breathing',
    },
    {
        id: 'boundary',
        icon: Shield,
        title: 'Work Boundary Script',
        description: 'Generate a professional script to set boundaries',
        color: 'from-brand-500 to-indigo-500',
        type: 'ai',
        prompt: 'Generate a short, professional work boundary-setting script I can use with my manager or team. Make it assertive but respectful, covering workload limits. Give me 2-3 variants for different situations (email, meeting, casual). Keep each under 3 sentences.',
    },
    {
        id: 'reframe',
        icon: RefreshCw,
        title: 'Reframe This Thought',
        description: 'Transform negative thinking patterns',
        color: 'from-lavender-500 to-pink-500',
        type: 'ai',
        prompt: 'Help me practice cognitive reframing. Ask me to share a negative thought I\'ve been having, and then walk me through reframing it into a more balanced, constructive perspective. Use a calm coaching tone.',
    },
    {
        id: 'confidence',
        icon: Trophy,
        title: 'Confidence Booster',
        description: 'Micro-coaching for inner strength',
        color: 'from-amber-500 to-orange-500',
        type: 'ai',
        prompt: 'Give me a brief, powerful confidence boost. Include: 1) A strength-based affirmation, 2) A quick exercise to reconnect with my competence (30 seconds), and 3) A reframe of imposter syndrome. Keep it professional and genuine, not cheesy.',
    },
]

export default function QuickResetTools({ onOpenBreathing, onSendToChat }) {
    const [activeToolId, setActiveToolId] = useState(null)
    const [toolResponse, setToolResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleToolClick = async (tool) => {
        if (tool.type === 'breathing') {
            onOpenBreathing()
            return
        }

        if (tool.type === 'ai') {
            setActiveToolId(tool.id)
            setLoading(true)
            setToolResponse('')
            try {
                const response = await generateResponse(tool.prompt)
                setToolResponse(response)
            } catch (error) {
                setToolResponse('Something went wrong. Please try again.')
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-lavender-400" />
                <h3 className="text-lg font-semibold text-white">Quick Reset Tools</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOOLS.map((tool, i) => (
                    <motion.button
                        key={tool.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleToolClick(tool)}
                        className="glass-card p-4 text-left group cursor-pointer"
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 group-hover:shadow-lg transition-shadow`}>
                                <tool.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">{tool.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{tool.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors mt-1 shrink-0" />
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Tool Response Modal */}
            <AnimatePresence>
                {activeToolId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => { setActiveToolId(null); setToolResponse('') }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg max-h-[80vh] rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                <h3 className="font-semibold text-white">
                                    {TOOLS.find(t => t.id === activeToolId)?.title}
                                </h3>
                                <button onClick={() => { setActiveToolId(null); setToolResponse('') }} className="text-slate-500 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="px-6 py-5 overflow-y-auto flex-1">
                                {loading ? (
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <div className="w-5 h-5 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                                        <span className="text-sm">Generating your personalized guide...</span>
                                    </div>
                                ) : (
                                    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                        {toolResponse}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
