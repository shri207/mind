import { motion } from 'framer-motion'
import { Smile, Zap, Flame } from 'lucide-react'

function CircularProgress({ value, max = 100, size = 80, strokeWidth = 6, color, children }) {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (value / max) * circumference

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={color} strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    strokeDasharray={circumference}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

function MoodCard({ icon: Icon, label, value, color, colorClass, bgClass }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-5 flex items-center gap-4"
        >
            <CircularProgress value={value} color={color} size={72} strokeWidth={5}>
                <span className={`text-lg font-bold ${colorClass}`}>{value}</span>
            </CircularProgress>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${colorClass}`} />
                    <span className="text-sm font-medium text-slate-300">{label}</span>
                </div>
                <div className={`text-xs ${value >= 70 ? 'text-green-400' : value >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {value >= 70 ? 'Great' : value >= 40 ? 'Okay' : 'Needs attention'}
                </div>
            </div>
        </motion.div>
    )
}

export default function MoodOverview({ moodData }) {
    const { mood_score = 65, energy_level = 55, stress_index = 40, dominant_emotion = 'neutral' } = moodData || {}

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Today's Overview</h2>
                <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full capitalize">
                    Feeling {dominant_emotion}
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MoodCard
                    icon={Smile} label="Mood Score" value={mood_score}
                    color="#60a5fa" colorClass="text-brand-400" bgClass="bg-brand-500/10"
                />
                <MoodCard
                    icon={Zap} label="Energy Level" value={energy_level}
                    color="#2dd4bf" colorClass="text-teal-400" bgClass="bg-teal-500/10"
                />
                <MoodCard
                    icon={Flame} label="Stress Index" value={100 - stress_index}
                    color="#a78bfa" colorClass="text-lavender-400" bgClass="bg-lavender-500/10"
                />
            </div>
        </div>
    )
}
