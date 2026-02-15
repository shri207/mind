import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const LEVELS = [
    { label: 'Low', color: '#22c55e', range: [0, 25], description: 'You\'re managing well' },
    { label: 'Moderate', color: '#eab308', range: [25, 50], description: 'Some stress signals' },
    { label: 'Elevated', color: '#f97316', range: [50, 75], description: 'Take preventative steps' },
    { label: 'Critical', color: '#ef4444', range: [75, 100], description: 'Prioritize self-care now' },
]

export default function BurnoutMeter({ score = 25, risk = 'low' }) {
    const currentLevel = LEVELS.find(l => score >= l.range[0] && score < l.range[1]) || LEVELS[0]
    const angle = -90 + (score / 100) * 180

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
        >
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white">Burnout Risk</h3>
                <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: currentLevel.color + '20', color: currentLevel.color }}
                >
                    {currentLevel.label}
                </span>
            </div>

            {/* Gauge */}
            <div className="relative w-48 h-28 mx-auto mb-4">
                <svg viewBox="0 0 200 110" className="w-full h-full">
                    {/* Background arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="12" strokeLinecap="round"
                    />
                    {/* Colored segments */}
                    <path d="M 20 100 A 80 80 0 0 1 60 35" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
                    <path d="M 60 35 A 80 80 0 0 1 100 20" fill="none" stroke="#eab308" strokeWidth="12" opacity="0.6" />
                    <path d="M 100 20 A 80 80 0 0 1 140 35" fill="none" stroke="#f97316" strokeWidth="12" opacity="0.6" />
                    <path d="M 140 35 A 80 80 0 0 1 180 100" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" opacity="0.6" />

                    {/* Needle */}
                    <motion.line
                        x1="100" y1="100" x2="100" y2="35"
                        stroke={currentLevel.color} strokeWidth="3" strokeLinecap="round"
                        initial={{ rotate: -90, transformOrigin: '100px 100px' }}
                        animate={{ rotate: angle, transformOrigin: '100px 100px' }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    {/* Center dot */}
                    <circle cx="100" cy="100" r="6" fill={currentLevel.color} />
                    <circle cx="100" cy="100" r="3" fill="#0f172a" />
                </svg>
            </div>

            {/* Score */}
            <div className="text-center">
                <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold"
                    style={{ color: currentLevel.color }}
                >
                    {score}
                    <span className="text-sm text-slate-500 font-normal">/100</span>
                </motion.p>
                <p className="text-sm text-slate-400 mt-1">{currentLevel.description}</p>
            </div>

            {/* Risk levels legend */}
            <div className="flex justify-between mt-5 px-2">
                {LEVELS.map((level) => (
                    <div key={level.label} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: level.color, opacity: level.label === currentLevel.label ? 1 : 0.3 }} />
                        <span className={`text-xs ${level.label === currentLevel.label ? 'text-white font-medium' : 'text-slate-600'}`}>
                            {level.label}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
