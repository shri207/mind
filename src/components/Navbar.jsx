import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Menu, X } from 'lucide-react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const isLanding = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-lavender-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-all duration-300">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        <span className="gradient-text">Mind</span>
                        <span className="text-slate-200">Fuel</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                {isLanding && (
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#problem" className="text-sm text-slate-400 hover:text-white transition-colors">Why MindFuel</a>
                        <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
                        <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
                        <a href="#trust" className="text-sm text-slate-400 hover:text-white transition-colors">Trust & Safety</a>
                        <Link to="/pitch" className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium">Pitch Deck</Link>
                    </div>
                )}

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/dashboard"
                        className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-500 to-lavender-500 text-white hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-300 hover:scale-105"
                    >
                        Open Dashboard
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-slate-400 hover:text-white transition-colors"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/5"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {isLanding && (
                                <>
                                    <a href="#problem" onClick={() => setMobileOpen(false)} className="text-sm text-slate-400 hover:text-white transition-colors">Why MindFuel</a>
                                    <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
                                    <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
                                    <a href="#trust" onClick={() => setMobileOpen(false)} className="text-sm text-slate-400 hover:text-white transition-colors">Trust & Safety</a>
                                    <Link to="/pitch" onClick={() => setMobileOpen(false)} className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium">Pitch Deck</Link>
                                </>
                            )}
                            <Link
                                to="/dashboard"
                                onClick={() => setMobileOpen(false)}
                                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-500 to-lavender-500 text-white text-center"
                            >
                                Open Dashboard
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
