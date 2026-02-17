import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, MessageSquare, BarChart3, Sparkles, PanelRightOpen, PanelRightClose, Activity, LogOut, LogIn } from 'lucide-react'
import MoodOverview from '../components/MoodOverview.jsx'
import AiChat from '../components/AiChat.jsx'
import BurnoutMeter from '../components/BurnoutMeter.jsx'
import QuickResetTools from '../components/QuickResetTools.jsx'
import BreathingExercise from '../components/BreathingExercise.jsx'
import CrisisModal from '../components/CrisisModal.jsx'
import { signInWithGoogle, logOut, onAuthChange } from '../services/firebase.js'
import { loadMoodHistory } from '../services/firestore.js'

export default function Dashboard() {
    const [moodData, setMoodData] = useState({
        mood_score: 72,
        energy_level: 65,
        stress_index: 35,
        dominant_emotion: 'calm',
        burnout_risk: 'low',
        burnout_score: 22,
    })
    const [showBreathing, setShowBreathing] = useState(false)
    const [showCrisis, setShowCrisis] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthReady, setIsAuthReady] = useState(false)
    const [signingIn, setSigningIn] = useState(false)

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthChange(async (firebaseUser) => {
            setUser(firebaseUser)
            setIsAuthReady(true)

            if (firebaseUser) {
                // Load mood data for the signed-in user
                try {
                    const moods = await loadMoodHistory(1)
                    if (moods.length > 0) {
                        setMoodData(prev => ({ ...prev, ...moods[0] }))
                    }
                } catch (e) { /* use defaults */ }
            }
        })
        return () => unsubscribe()
    }, [])

    const handleSignIn = async () => {
        setSigningIn(true)
        try {
            await signInWithGoogle()
        } catch (error) {
            console.error('Google sign-in failed:', error)
        }
        setSigningIn(false)
    }

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.error('Sign out failed:', error)
        }
    }

    const handleSentimentUpdate = (sentiment) => {
        if (sentiment) {
            setMoodData(prev => ({ ...prev, ...sentiment }))
        }
    }

    const getMoodEmoji = () => {
        const score = moodData.mood_score
        if (score >= 80) return '😊'
        if (score >= 60) return '🙂'
        if (score >= 40) return '😐'
        return '😔'
    }

    const getMoodColor = () => {
        const score = moodData.mood_score
        if (score >= 70) return 'text-emerald-400'
        if (score >= 45) return 'text-amber-400'
        return 'text-red-400'
    }

    // ── Sign-In Screen ──
    if (isAuthReady && !user) {
        return (
            <div className="min-h-screen bg-surface-primary flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 sm:p-12 max-w-md w-full text-center"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-lavender-500 flex items-center justify-center mx-auto mb-6">
                        <Brain className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">
                        Welcome to <span className="gradient-text">Inner Self</span>
                    </h1>
                    <p className="text-slate-400 text-sm mb-8">
                        Your AI-powered mental wellness companion.
                        Sign in to access personalized coaching, mood tracking, and more.
                    </p>

                    <button
                        onClick={handleSignIn}
                        disabled={signingIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-gray-800 font-medium text-sm hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {signingIn ? (
                            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        {signingIn ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    <p className="text-[10px] text-slate-600 mt-6 leading-relaxed">
                        By signing in, you agree to our terms. Your data is encrypted and never shared.
                        <br />
                        <Link to="/privacy" className="text-brand-500/60 hover:text-brand-400">Privacy Policy</Link>
                    </p>
                </motion.div>
            </div>
        )
    }

    // ── Loading State ──
    if (!isAuthReady) {
        return (
            <div className="min-h-screen bg-surface-primary flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-slate-500">Loading...</span>
                </div>
            </div>
        )
    }

    // ── Main Dashboard (signed in) ──
    return (
        <div className="h-screen bg-surface-primary flex overflow-hidden">

            {/* ── Slim Left Nav ── */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="hidden md:flex w-16 lg:w-56 border-r border-white/5 flex-col bg-surface-primary/90 backdrop-blur-xl shrink-0"
            >
                {/* Logo */}
                <div className="p-3 lg:p-5 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-2.5 justify-center lg:justify-start">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-lavender-500 flex items-center justify-center shrink-0">
                            <Brain className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="hidden lg:inline text-lg font-bold">
                            <span className="gradient-text">Inner</span>
                            <span className="text-slate-200">Self</span>
                        </span>
                    </Link>
                </div>

                {/* Live Stats Mini */}
                <div className="flex-1 p-2 lg:p-3 flex flex-col gap-2 mt-2">
                    <div className="glass-card p-3 text-center lg:text-left">
                        <div className="flex items-center gap-2 justify-center lg:justify-start">
                            <span className="text-lg">{getMoodEmoji()}</span>
                            <div className="hidden lg:block">
                                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Mood</p>
                                <p className={`text-sm font-bold ${getMoodColor()}`}>{moodData.mood_score}/100</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-3 text-center lg:text-left">
                        <div className="flex items-center gap-2 justify-center lg:justify-start">
                            <Activity className="w-4 h-4 text-amber-400" />
                            <div className="hidden lg:block">
                                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Burnout</p>
                                <p className="text-sm font-bold text-amber-400">{moodData.burnout_risk}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-3 text-center lg:text-left">
                        <div className="flex items-center gap-2 justify-center lg:justify-start">
                            <Sparkles className="w-4 h-4 text-brand-400" />
                            <div className="hidden lg:block">
                                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Energy</p>
                                <p className="text-sm font-bold text-brand-400">{moodData.energy_level}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="mt-auto space-y-2 pb-2">
                        <button
                            onClick={() => setShowBreathing(true)}
                            className="w-full p-3 rounded-xl bg-teal-500/10 text-teal-400 text-xs font-medium hover:bg-teal-500/20 transition-all flex items-center justify-center lg:justify-start gap-2"
                        >
                            <span className="text-base">🫁</span>
                            <span className="hidden lg:inline">Breathe</span>
                        </button>

                        <button
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="w-full p-3 rounded-xl bg-white/5 text-slate-400 text-xs font-medium hover:bg-white/10 transition-all flex items-center justify-center lg:justify-start gap-2"
                        >
                            {showSidebar ? (
                                <><PanelRightClose className="w-4 h-4" /><span className="hidden lg:inline">Hide Insights</span></>
                            ) : (
                                <><PanelRightOpen className="w-4 h-4" /><span className="hidden lg:inline">Show Insights</span></>
                            )}
                        </button>
                    </div>
                </div>

                {/* User Profile */}
                <div className="p-3 border-t border-white/5">
                    <div className="flex items-center gap-2 px-1 py-1 justify-center lg:justify-start">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt=""
                                className="w-7 h-7 rounded-lg object-cover shrink-0"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-brand-500 flex items-center justify-center shrink-0">
                                <span className="text-white text-xs font-bold">{user?.displayName?.[0] || 'U'}</span>
                            </div>
                        )}
                        <div className="hidden lg:flex flex-1 items-center justify-between min-w-0">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-white truncate">{user?.displayName || 'User'}</p>
                                <p className="text-[10px] text-slate-600 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                                title="Sign out"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* ── Mobile Top Bar ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-white/5">
                <div className="flex items-center justify-between px-4 py-3">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-lavender-500 flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold">
                            <span className="gradient-text">Inner</span><span className="text-slate-200">Self</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowBreathing(true)}
                            className="p-2 rounded-lg bg-teal-500/10 text-teal-400"
                        >
                            <span className="text-sm">🫁</span>
                        </button>
                        <button
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="p-2 rounded-lg bg-white/5 text-slate-400"
                        >
                            <BarChart3 className="w-4 h-4" />
                        </button>
                        {user?.photoURL ? (
                            <button onClick={handleSignOut} title="Sign out">
                                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                            </button>
                        ) : (
                            <button onClick={handleSignOut} className="p-2 rounded-lg bg-white/5 text-slate-400">
                                <LogOut className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main Chat Area ── */}
            <main className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0">
                <div className="px-4 lg:px-6 py-3 border-b border-white/5 shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-brand-400" />
                                Inner Self AI
                            </h1>
                            <p className="text-xs text-slate-600">
                                {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening'}{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''} — your AI wellness companion is ready
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full bg-emerald-400`} />
                            <span className="text-[10px] uppercase tracking-wider text-slate-600 font-medium hidden sm:inline">
                                Connected
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0">
                    <AiChat
                        onCrisis={() => setShowCrisis(true)}
                        onSentimentUpdate={handleSentimentUpdate}
                        isAuthReady={isAuthReady && !!user}
                        fullscreen
                    />
                </div>

                <div className="px-4 py-1.5 border-t border-white/5 shrink-0">
                    <p className="text-[10px] text-slate-700 text-center">
                        Inner Self is not a licensed medical provider.
                        If in crisis, contact emergency services or <Link to="/privacy" className="text-brand-500/60 hover:text-brand-400">learn more</Link>.
                    </p>
                </div>
            </main>

            {/* ── Collapsible Right Sidebar ── */}
            <AnimatePresence>
                {showSidebar && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="border-l border-white/5 bg-surface-primary/90 backdrop-blur-xl overflow-hidden shrink-0 hidden md:block"
                    >
                        <div className="w-[340px] h-full overflow-y-auto p-4 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-brand-400" />
                                    Insights
                                </h2>
                                <button onClick={() => setShowSidebar(false)} className="text-slate-600 hover:text-slate-400 transition-colors">
                                    <PanelRightClose className="w-4 h-4" />
                                </button>
                            </div>

                            <MoodOverview moodData={moodData} />
                            <BurnoutMeter score={moodData.burnout_score} risk={moodData.burnout_risk} />

                            <div className="glass-card p-4">
                                <QuickResetTools onOpenBreathing={() => setShowBreathing(true)} />
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {showSidebar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowSidebar(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[340px] bg-surface-primary border-l border-white/5 overflow-y-auto p-4 space-y-4 pb-20"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-brand-400" />
                                    Insights
                                </h2>
                                <button onClick={() => setShowSidebar(false)} className="text-slate-400">
                                    <PanelRightClose className="w-4 h-4" />
                                </button>
                            </div>

                            <MoodOverview moodData={moodData} />
                            <BurnoutMeter score={moodData.burnout_score} risk={moodData.burnout_risk} />

                            <div className="glass-card p-4">
                                <QuickResetTools onOpenBreathing={() => setShowBreathing(true)} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <BreathingExercise isOpen={showBreathing} onClose={() => setShowBreathing(false)} />
            <CrisisModal isOpen={showCrisis} onClose={() => setShowCrisis(false)} />
        </div>
    )
}
