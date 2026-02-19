import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronRight, Sparkles, Brain } from 'lucide-react'

const LANGUAGES = [
    { name: 'English', native: 'English', emoji: '🇺🇸', desc: 'English' },
    { name: 'Hindi', native: 'हिन्दी', emoji: '🇮🇳', desc: 'Hindi' },
    { name: 'Tamil', native: 'தமிழ்', emoji: '🇮🇳', desc: 'Tamil' },
    { name: 'Telugu', native: 'తెలుగు', emoji: '🇮🇳', desc: 'Telugu' },
    { name: 'Spanish', native: 'Español', emoji: '🇪🇸', desc: 'Spanish' },
    { name: 'French', native: 'Français', emoji: '🇫🇷', desc: 'French' },
    { name: 'German', native: 'Deutsch', emoji: '🇩🇪', desc: 'German' },
    { name: 'Japanese', native: '日本語', emoji: '🇯🇵', desc: 'Japanese' },
    { name: 'Korean', native: '한국어', emoji: '🇰🇷', desc: 'Korean' },
    { name: 'Chinese', native: '中文', emoji: '🇨🇳', desc: 'Chinese' },
    { name: 'Arabic', native: 'العربية', emoji: '🇸🇦', desc: 'Arabic' },
    { name: 'Portuguese', native: 'Português', emoji: '🇧🇷', desc: 'Portuguese' },
    { name: 'Tanglish', native: 'Tanglish', emoji: '🇮🇳', desc: 'Tamil + English' },
]

export default function LanguageSelector({ onSelect }) {
    const [hoveredLang, setHoveredLang] = useState(null)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-primary"
        >
            {/* Background animated gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.03]"
                    style={{
                        background: 'radial-gradient(circle, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a78bfa 0%, transparent 40%)',
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="relative z-10 w-full max-w-lg mx-4"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-lavender-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-500/25"
                    >
                        <Brain className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-white mb-2"
                    >
                        Welcome to <span className="gradient-text">Inner Self</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-400 text-sm flex items-center justify-center gap-2"
                    >
                        <Globe className="w-4 h-4" />
                        Choose your preferred language for therapy
                    </motion.p>
                </div>

                {/* Language Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-4 max-h-[50vh] overflow-y-auto"
                >
                    <div className="grid grid-cols-2 gap-2">
                        {LANGUAGES.map((lang, index) => (
                            <motion.button
                                key={lang.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.04 }}
                                onMouseEnter={() => setHoveredLang(lang.name)}
                                onMouseLeave={() => setHoveredLang(null)}
                                onClick={() => onSelect(lang.name)}
                                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 group ${hoveredLang === lang.name
                                    ? 'bg-gradient-to-r from-brand-500/15 to-lavender-500/15 border border-brand-500/30 shadow-lg shadow-brand-500/10'
                                    : 'bg-white/[0.03] border border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <span className="text-xl">{lang.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {lang.native}
                                    </p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                        {lang.desc}
                                    </p>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-all duration-200 ${hoveredLang === lang.name
                                    ? 'text-brand-400 translate-x-0.5'
                                    : 'text-slate-700'
                                    }`} />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-[10px] text-slate-600 mt-4 flex items-center justify-center gap-1.5"
                >
                    <Sparkles className="w-3 h-3" />
                    Your AI psychiatrist will respond in the selected language
                </motion.p>
            </motion.div>
        </motion.div>
    )
}
