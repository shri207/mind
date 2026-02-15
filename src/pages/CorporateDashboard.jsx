import { motion } from 'framer-motion'
import { BarChart3, Users, TrendingUp, Shield, Lock } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'

export default function CorporateDashboard() {
    return (
        <div className="min-h-screen bg-surface-primary">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-500/10 border border-lavender-500/20 text-lavender-300 text-sm font-medium mb-6">
                            <Lock className="w-4 h-4" />
                            Enterprise Feature — Coming Soon
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Corporate Wellness Dashboard</h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Anonymous, aggregated mental fitness insights for forward-thinking organizations.
                            No individual data is ever exposed to employers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: Users, title: 'Anonymous Burnout Analytics', desc: 'Aggregated burnout risk scores across teams. No individual identification.' },
                            { icon: BarChart3, title: 'HR Wellness Insights', desc: 'Trend data on organizational stress levels, engagement patterns, and wellness metrics.' },
                            { icon: TrendingUp, title: 'Team Stress Trends', desc: 'Visual graphs tracking team-wide stress patterns over time with seasonal analysis.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="glass-card p-8 text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lavender-500/20 to-brand-500/20 flex items-center justify-center mx-auto mb-5">
                                    <item.icon className="w-6 h-6 text-lavender-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Placeholder charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="glass-card p-8">
                            <h3 className="text-lg font-semibold text-white mb-4">Team Burnout Trend</h3>
                            <div className="h-48 flex items-end justify-between gap-3 px-4">
                                {[35, 42, 38, 55, 48, 62, 45, 38, 30, 28, 25, 22].map((val, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.5 }}
                                        className="flex-1 rounded-t-lg bg-gradient-to-t from-brand-600/60 to-lavender-500/40"
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between px-4 mt-2 text-xs text-slate-600">
                                <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                            </div>
                        </div>

                        <div className="glass-card p-8">
                            <h3 className="text-lg font-semibold text-white mb-4">Department Wellness Score</h3>
                            <div className="space-y-4">
                                {[
                                    { dept: 'Engineering', score: 72, color: 'bg-brand-500' },
                                    { dept: 'Marketing', score: 68, color: 'bg-teal-500' },
                                    { dept: 'Sales', score: 55, color: 'bg-orange-500' },
                                    { dept: 'Operations', score: 80, color: 'bg-green-500' },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-300">{item.dept}</span>
                                            <span className="text-slate-500">{item.score}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.score}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                                className={`h-full rounded-full ${item.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
                            <Shield className="w-3.5 h-3.5" />
                            All data is fully anonymized. No individual employee can be identified from these metrics.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
