import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Brain, Sparkles, Activity, ShieldCheck, Heart, ArrowRight, Users, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PitchDeck = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 0,
            type: "team",
            title: "Thrivers",
            subtitle: "Presentation",
            icon: <Users className="w-24 h-24 text-teal-400" />,
            content: (
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        Presenting Inner Self
                    </h2>
                    <p className="text-xl text-gray-300">Innovating Mental Wellness with AI</p>
                </div>
            )
        },
        {
            id: 1,
            type: "problem",
            title: "The Problem",
            icon: <Activity className="w-16 h-16 text-red-400" />,
            content: (
                <div className="space-y-6 text-left max-w-2xl">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-500/20 rounded-lg shrink-0"><CheckCircle className="text-red-400" size={24} /></div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Accessibility Gap</h3>
                            <p className="text-gray-400">Professional therapy is often expensive, has long waitlists, and is not available 24/7.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-orange-500/20 rounded-lg shrink-0"><CheckCircle className="text-orange-400" size={24} /></div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Stigma & Fear</h3>
                            <p className="text-gray-400">Many hesitate to seek help due to privacy concerns or fear of judgment.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-yellow-500/20 rounded-lg shrink-0"><CheckCircle className="text-yellow-400" size={24} /></div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Passive Tools Falling Short</h3>
                            <p className="text-gray-400">Current self-help apps are often just trackers without active, intelligent engagement.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            type: "solution",
            title: "The Solution",
            icon: <Sparkles className="w-16 h-16 text-purple-400" />,
            content: (
                <div className="text-center space-y-6 max-w-2xl">
                    <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Inner Self
                    </h2>
                    <p className="text-xl text-gray-200 leading-relaxed">
                        An intelligent, always-available AI companion that provides <span className="text-purple-300 font-bold">active cognitive support</span>, mood tracking, and crisis intervention—bridging the gap between self-help and professional therapy.
                    </p>
                </div>
            )
        },
        {
            id: 3,
            type: "how-it-works",
            title: "How It Works",
            icon: <Zap className="w-16 h-16 text-yellow-400" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
                    <div className="flex flex-col items-center bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400 font-bold text-xl">1</div>
                        <h3 className="text-lg font-bold text-white mb-2">Speak Naturaly</h3>
                        <p className="text-gray-400 text-sm text-center">User interacts via voice or text, sharing their feelings openly.</p>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 p-6 rounded-2xl border border-white/10 relative">
                        {/* Arrow for desktop */}
                        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500"><ArrowRight /></div>

                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400 font-bold text-xl">2</div>
                        <h3 className="text-lg font-bold text-white mb-2">AI Processing</h3>
                        <p className="text-gray-400 text-sm text-center">Gemini 2.5 analyzes sentiment & intent, detecting crisis signals.</p>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4 text-teal-400 font-bold text-xl">3</div>
                        <h3 className="text-lg font-bold text-white mb-2">Supportive Response</h3>
                        <p className="text-gray-400 text-sm text-center">Receive cognitive reframing, coping strategies, or resource links.</p>
                    </div>
                </div>
            )
        },
        {
            id: 4,
            type: "demo",
            title: "Live Demo",
            icon: <Heart className="w-20 h-20 text-pink-500 animate-pulse" />,
            content: (
                <div className="text-center space-y-8">
                    <p className="text-2xl text-gray-300">See Inner Self in action.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full text-xl shadow-lg shadow-pink-500/30 border border-pink-400/50 hover:scale-105 transition-transform"
                    >
                        Launch App
                    </button>
                </div>
            )
        },
        {
            id: 5,
            type: "benefits",
            title: "Benefits",
            icon: <ShieldCheck className="w-16 h-16 text-green-400" />,
            content: (
                <div className="grid grid-cols-2 gap-6 w-full max-w-3xl text-left">
                    <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                        <h3 className="text-lg font-bold text-green-300 mb-1">24/7 Availability</h3>
                        <p className="text-gray-400 text-sm">Support whenever it's needed, day or night.</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <h3 className="text-lg font-bold text-blue-300 mb-1">Privacy Focused</h3>
                        <p className="text-gray-400 text-sm">A safe, non-judgmental space to share.</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <h3 className="text-lg font-bold text-purple-300 mb-1">Cost Effective</h3>
                        <p className="text-gray-400 text-sm">Democratizing access to mental wellness tools.</p>
                    </div>
                    <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <h3 className="text-lg font-bold text-orange-300 mb-1">Crisis Safe</h3>
                        <p className="text-gray-400 text-sm">Built-in detection to route severe cases to professionals.</p>
                    </div>
                </div>
            )
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-8 overflow-hidden relative">

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative w-full max-w-6xl aspect-video bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-12 flex flex-col justify-between overflow-hidden">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-teal-400 to-purple-500"
                        animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center -mt-8 w-full">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                            className="flex flex-col items-center text-center w-full h-full justify-center"
                        >
                            <div className="mb-6 p-5 bg-white/5 rounded-full border border-white/10 shadow-glow">
                                {slides[currentSlide].icon}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                                {slides[currentSlide].title}
                            </h1>

                            {slides[currentSlide].subtitle && (
                                <h2 className="text-xl text-teal-300 font-light mb-6 uppercase tracking-widest">{slides[currentSlide].subtitle}</h2>
                            )}

                            <div className="flex-1 flex items-center justify-center w-full">
                                {slides[currentSlide].content}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 w-full">
                    <button onClick={prevSlide} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
                        <ChevronLeft className="text-gray-400 group-hover:text-white" size={24} />
                    </button>

                    <div className="text-xs font-mono text-gray-500 tracking-widest">
                        SLIDE {currentSlide + 1} / {slides.length}
                    </div>

                    <button onClick={nextSlide} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
                        <ChevronRight className="text-gray-400 group-hover:text-white" size={24} />
                    </button>
                </div>

            </div>

            <div className="mt-6 text-gray-500 text-sm flex items-center space-x-2 opacity-50">
                <span>Use</span>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs border border-white/10">←</kbd>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs border border-white/10">→</kbd>
                <span>to navigate</span>
            </div>
        </div>
    );
};

export default PitchDeck;
