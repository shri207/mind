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

const STATS = [
    { value: '76%', label: 'of professionals report work-related stress', icon: TrendingDown },
    { value: '67%', label: 'experience burnout symptoms regularly', icon: Battery },
    { value: '$300B', label: 'annual cost of workplace stress in the US', icon: BarChart3 },
    { value: '80%', label: 'don\'t seek help until it becomes severe', icon: Users },
]

const STEPS = [
    {
        num: '01',
        title: 'Daily 2-Minute Check-In',
        description: 'A quick, reflective conversation with our AI to understand how you\'re really feeling.',
        icon: MessageSquare,
        color: 'from-brand-500 to-cyan-500',
    },
    {
        num: '02',
        title: 'AI Detects Stress Patterns',
        description: 'Advanced sentiment analysis identifies early burnout signals before they escalate.',
        icon: Brain,
        color: 'from-lavender-500 to-pink-500',
    },
    {
        num: '03',
        title: 'Personalized Micro-Interventions',
        description: 'Get tailored breathing exercises, cognitive reframes, and boundary-setting scripts.',
        icon: Sparkles,
        color: 'from-teal-400 to-green-400',
    },
]

const FEATURES = [
    {
        icon: MessageSquare,
        title: 'AI Emotional Reflection Chat',
        description: 'A calm, non-judgmental AI companion that helps you process thoughts and build emotional clarity.',
        color: 'from-brand-500 to-indigo-500',
    },
    {
        icon: BarChart3,
        title: 'Burnout Risk Indicator',
        description: 'Real-time gauge from Low to Critical, powered by sentiment analysis and behavioral patterns.',
        color: 'from-orange-500 to-red-500',
    },
    {
        icon: TrendingDown,
        title: 'Weekly Mental Fitness Report',
        description: 'Track your resilience score, emotional patterns, and stress trends over time.',
        color: 'from-teal-400 to-cyan-400',
    },
    {
        icon: Zap,
        title: 'Work Stress Toolkit',
        description: 'Breathing resets, boundary scripts, thought reframing, and confidence micro-coaching.',
        color: 'from-lavender-400 to-pink-400',
    },
    {
        icon: AlertTriangle,
        title: 'Crisis Redirect',
        description: 'If high-risk signals are detected, immediate redirection to emergency support resources.',
        color: 'from-red-400 to-orange-400',
    },
    {
        icon: Eye,
        title: 'Voice-Enabled Sessions',
        description: 'Speak naturally with voice input and listen to AI responses with calming voice synthesis.',
        color: 'from-green-400 to-teal-400',
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
                            AI-Powered Mental Fitness Platform
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                            <span className="text-white">Mental Clarity for</span>
                            <br />
                            <span className="gradient-text">High-Performance</span>
                            <br />
                            <span className="text-white">Professionals.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            AI-powered daily support to prevent burnout before it begins.
                            No diagnosis. No clinical jargon. Just clarity, resilience, and actionable micro-interventions.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/dashboard"
                                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-lavender-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-brand-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                            >
                                Start Free Assessment
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="px-8 py-4 rounded-2xl border border-white/10 text-slate-300 font-medium text-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                            >
                                See How It Works
                                <ChevronRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-20 right-10 hidden lg:block"
                    >
                        <div className="glass-card p-3 shadow-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white">Burnout Risk</p>
                                    <p className="text-xs text-green-400">Low — 18%</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-32 left-10 hidden lg:block"
                    >
                        <div className="glass-card p-3 shadow-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                                    <Brain className="w-4 h-4 text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white">Mood Score</p>
                                    <p className="text-xs text-brand-400">82 — Great</p>
                                </div>
                            </div>
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

            {/* PROBLEM SECTION */}
            <section id="problem" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent" />
                <div className="max-w-6xl mx-auto relative">
                    <AnimatedSection className="text-center mb-16">
                        <span className="text-sm font-semibold text-red-400/80 uppercase tracking-widest">The Silent Crisis</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">The Hidden Cost of Hustle Culture</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Burnout doesn't happen overnight. It builds silently — masked by productivity, deadlines, and the pressure to perform.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {STATS.map((stat, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="glass-card p-6 text-center h-full">
                                    <stat.icon className="w-8 h-8 text-red-400/70 mx-auto mb-4" />
                                    <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                                    <p className="text-sm text-slate-400">{stat.label}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
                <div className="max-w-6xl mx-auto relative">
                    <AnimatedSection className="text-center mb-16">
                        <span className="text-sm font-semibold text-brand-400/80 uppercase tracking-widest">Simple Process</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">How MindFuel Works</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Three steps. Two minutes a day. A lifetime of mental clarity.
                        </p>
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

            {/* FEATURES */}
            <section id="features" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lavender-500/[0.02] to-transparent" />
                <div className="max-w-6xl mx-auto relative">
                    <AnimatedSection className="text-center mb-16">
                        <span className="text-sm font-semibold text-lavender-400/80 uppercase tracking-widest">Features</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">Built for Real-World Stress</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Every feature designed to meet professionals where they are — in the middle of deadlines, meetings, and pressure.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FEATURES.map((feature, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="glass-card p-6 h-full group">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
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

            {/* TRUST & SAFETY */}
            <section id="trust" className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/[0.02] to-transparent" />
                <div className="max-w-6xl mx-auto relative">
                    <AnimatedSection className="text-center mb-16">
                        <span className="text-sm font-semibold text-teal-400/80 uppercase tracking-widest">Trust & Safety</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">Your Privacy, Our Priority</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            MindFuel is built with enterprise-grade security. We don't sell data, and we never will.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                        {[
                            { icon: Lock, title: 'Encrypted Conversations', desc: 'All conversations are encrypted end-to-end. Your reflections stay private.' },
                            { icon: Eye, title: 'Anonymous Mode', desc: 'Use MindFuel without creating an account. No tracking, no profiles required.' },
                            { icon: Shield, title: 'Not a Replacement for Therapy', desc: 'MindFuel is a wellness support tool, not a medical provider. We always recommend professional help when needed.' },
                            { icon: Phone, title: 'Crisis Helpline Redirection', desc: 'If our AI detects signs of crisis, we immediately provide emergency contact resources.' },
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="glass-card p-6 flex items-start gap-4 h-full">
                                    <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                    </div>
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
                                    Ready to Invest in Your Mental Clarity?
                                </h2>
                                <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                    Start with a free 2-minute check-in. No account required. Completely anonymous.
                                </p>
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                                >
                                    Start Free Assessment
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-lavender-500 flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">
                                    <span className="gradient-text">Mind</span>
                                    <span className="text-slate-200">Fuel</span>
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                                AI-powered mental fitness for professionals who don't have time to burn out. Preventative support, not reactive treatment.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link></li>
                                <li><a href="#features" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Features</a></li>
                                <li><a href="#trust" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Trust & Safety</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4">Emergency</h4>
                            <ul className="space-y-2">
                                <li><a href="tel:988" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">988 Crisis Lifeline</a></li>
                                <li><a href="tel:911" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Emergency: 911</a></li>
                                <li><span className="text-sm text-slate-500">Text HOME to 741741</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Legal Disclaimer */}
                    <div className="border-t border-white/5 pt-8">
                        <p className="text-xs text-slate-600 leading-relaxed text-center max-w-3xl mx-auto">
                            MindFuel is a mental wellness support platform and not a licensed medical provider.
                            If you are experiencing a crisis, please contact local emergency services or a licensed
                            mental health professional. MindFuel does not diagnose, treat, or cure any mental health condition.
                        </p>
                        <p className="text-xs text-slate-700 text-center mt-4">
                            © {new Date().getFullYear()} MindFuel. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
