import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
    Brain, ArrowRight, Zap, BarChart3, MessageSquare, Shield, Lock,
    TrendingDown, Battery, Users, Clock, AlertTriangle, Heart,
    CheckCircle, Eye, Sparkles, ChevronRight, Phone
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'

function AnimatedSection({ children, className = '', delay = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

const STEPS = [
    {
        num: '01',
        title: 'Daily Check-In',
        description: 'Two minutes to reflect on how you feel.',
        icon: MessageSquare,
        color: 'from-brand-500 to-cyan-500',
    },
    {
        num: '02',
        title: 'AI Analysis',
        description: 'Detects patterns before they become burnout.',
        icon: Brain,
        color: 'from-lavender-500 to-pink-500',
    },
    {
        num: '03',
        title: 'Actionable Clarity',
        description: 'Get tailored micro-interventions instantly.',
        icon: Sparkles,
        color: 'from-teal-400 to-green-400',
    },
]

const FEATURES = [
    {
        icon: MessageSquare,
        title: 'AI Companion',
        description: 'A non-judgmental space to process thoughts and build emotional clarity.',
        color: 'from-brand-500 to-indigo-500',
    },
    {
        icon: BarChart3,
        title: 'Burnout Radar',
        description: 'Real-time indicators that help you spot stress early.',
        color: 'from-orange-500 to-red-500',
    },
    {
        icon: Shield,
        title: 'Private & Secure',
        description: 'Anonymous by design. Your reflections stay yours.',
        color: 'from-teal-400 to-cyan-400',
    },
]

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-surface-primary">
            <Navbar />

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] animate-breathe" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lavender-500/10 rounded-full blur-[120px] animate-breathe" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px]" />
                </div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Clarity
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                            <span className="text-white">Mental Clarity for</span>
                            <br />
                            <span className="gradient-text">Professionals.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
                            Support to prevent burnout. Clarity, resilience, and action.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/dashboard"
                                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-lavender-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-brand-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                            >
                                Start Assessment
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="px-8 py-4 rounded-2xl border border-white/10 text-slate-300 font-medium text-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                            >
                                Learn More
                                <ChevronRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 rounded-full bg-white/40" />
                    </div>
                </motion.div>
            </section>

            {/* PROBLEM SECTION - Simplified */}
            <section id="problem" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent" />
                <div className="max-w-4xl mx-auto relative text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Burnout is Silent.</h2>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            It builds unnoticed behind deadlines and pressure. <br className="hidden md:block" />
                            We help you spot the signals before they stop you.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
                <div className="max-w-6xl mx-auto relative">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">How It Works</h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {STEPS.map((step, i) => (
                            <AnimatedSection key={i} delay={i * 0.15}>
                                <div className="glass-card p-8 text-center h-full relative group">
                                    <div className="text-6xl font-extrabold text-white/[0.03] absolute top-4 right-6">{step.num}</div>
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow`}>
                                        <step.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES - Simplified to 3 */}
            <section id="features" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lavender-500/[0.02] to-transparent" />
                <div className="max-w-6xl mx-auto relative">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">Tools for Resilience</h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {FEATURES.map((feature, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="glass-card p-8 h-full group text-center hover:bg-white/5 transition-colors">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-shadow`}>
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 via-lavender-600/20 to-teal-600/30 animate-gradient" />
                            <div className="absolute inset-0 glass" />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Mental Clarity Starts Here.
                                </h2>
                                <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                    Free check-in. Anonymous. No account needed.
                                </p>
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                                >
                                    Start Assessment
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-lavender-500 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">
                            <span className="gradient-text">Inner</span>
                            <span className="text-slate-200">Self</span>
                        </span>
                    </div>

                    <div className="flex justify-center gap-6 mb-8 text-sm text-slate-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <Link to="/pitch" className="hover:text-white transition-colors">Pitch Deck</Link>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Inner Self is a support tool, not a medical provider.
                        If in crisis: <a href="tel:988" className="text-slate-400 hover:text-white">988</a> (US) or <a href="tel:911" className="text-slate-400 hover:text-white">911</a>.
                    </p>
                    <p className="text-xs text-slate-700 mt-4">
                        © {new Date().getFullYear()} Inner Self. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
