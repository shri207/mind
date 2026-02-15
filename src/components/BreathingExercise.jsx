import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const PHASES = [
    { name: 'Breathe In', duration: 4000, scale: 1.4, color: 'from-brand-400 to-teal-400' },
    { name: 'Hold', duration: 4000, scale: 1.4, color: 'from-teal-400 to-lavender-400' },
    { name: 'Breathe Out', duration: 6000, scale: 1, color: 'from-lavender-400 to-brand-400' },
    { name: 'Hold', duration: 2000, scale: 1, color: 'from-brand-400 to-brand-500' },
]

const TOTAL_CYCLE = PHASES.reduce((a, p) => a + p.duration, 0)

export default function BreathingExercise({ isOpen, onClose }) {
    const [phase, setPhase] = useState(0)
    const [timeLeft, setTimeLeft] = useState(180)
    const [isActive, setIsActive] = useState(false)
    const [cycles, setCycles] = useState(0)

    const startExercise = useCallback(() => {
        setIsActive(true)
        setPhase(0)
        setTimeLeft(180)
        setCycles(0)
    }, [])

    useEffect(() => {
        if (!isActive) return

        const phaseTimer = setTimeout(() => {
            const nextPhase = (phase + 1) % PHASES.length
            setPhase(nextPhase)
            if (nextPhase === 0) setCycles(c => c + 1)
        }, PHASES[phase].duration)

        return () => clearTimeout(phaseTimer)
    }, [phase, isActive])

    useEffect(() => {
        if (!isActive || timeLeft <= 0) {
            if (timeLeft <= 0) setIsActive(false)
            return
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
        return () => clearInterval(timer)
    }, [isActive, timeLeft])

    if (!isOpen) return null

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const currentPhase = PHASES[phase]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl bg-slate-900/95 border border-white/5 shadow-2xl p-8 flex flex-col items-center gap-6"
            >
                <h2 className="text-xl font-semibold text-white">3-Minute Breathing Reset</h2>
                <p className="text-sm text-slate-400 text-center">
                    Follow the circle. Slow, deep breaths to calm your nervous system.
                </p>

                {/* Breathing circle */}
                <div className="relative w-56 h-56 flex items-center justify-center">
                    {/* Outer glow rings */}
                    <motion.div
                        animate={{ scale: isActive ? currentPhase.scale * 1.1 : 1, opacity: isActive ? 0.15 : 0.05 }}
                        transition={{ duration: currentPhase.duration / 1000, ease: 'easeInOut' }}
                        className={`absolute w-full h-full rounded-full bg-gradient-to-br ${currentPhase.color}`}
                    />
                    <motion.div
                        animate={{ scale: isActive ? currentPhase.scale : 1, opacity: isActive ? 0.3 : 0.1 }}
                        transition={{ duration: currentPhase.duration / 1000, ease: 'easeInOut' }}
                        className={`absolute w-44 h-44 rounded-full bg-gradient-to-br ${currentPhase.color}`}
                    />
                    {/* Core circle */}
                    <motion.div
                        animate={{ scale: isActive ? currentPhase.scale * 0.85 : 0.85 }}
                        transition={{ duration: currentPhase.duration / 1000, ease: 'easeInOut' }}
                        className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${currentPhase.color} shadow-lg flex items-center justify-center`}
                    >
                        <span className="text-white font-semibold text-sm">
                            {isActive ? currentPhase.name : 'Ready'}
                        </span>
                    </motion.div>
                </div>

                {/* Timer */}
                <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-white">
                        {minutes}:{seconds.toString().padStart(2, '0')}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Cycles: {cycles}</p>
                </div>

                {/* Controls */}
                <div className="flex gap-3">
                    {!isActive ? (
                        <button
                            onClick={startExercise}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-brand-500/25 transition-all"
                        >
                            Begin
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsActive(false)}
                            className="px-8 py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors"
                        >
                            Pause
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl border border-white/10 text-slate-400 font-medium hover:bg-slate-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
