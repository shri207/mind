import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Brain, Sparkles, Activity, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PitchDeck = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 0,
            type: "title",
            title: "MindFuel AI",
            subtitle: "Mental Wellness for Everyone, Everywhere.",
            icon: <Brain className="w-24 h-24 text-teal-400" />,
            content: "A 24/7 AI Companion for cognitive reframing and emotional support."
        },
        {
            id: 1,
            type: "problem",
            title: "The Silent Crisis",
            icon: <Activity className="w-16 h-16 text-red-400" />,
            content: (
                <div className="space-y-6">
                    <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-3xl font-bold text-red-400">1 in 4</div>
                        <p className="text-gray-300">People experience mental health issues annually.</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-3xl font-bold text-orange-400">60%</div>
                        <p className="text-gray-300">Of those needing help do not receive it.</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-3xl font-bold text-yellow-400">$200+</div>
                        <p className="text-gray-300">Average cost per therapy session (US).</p>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            type: "gap",
            title: "The Solution Gap",
            icon: <ArrowRight className="w-16 h-16 text-purple-400" />,
            content: (
                <div className="grid grid-cols-2 gap-8 mt-8">
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <h3 className="text-xl font-bold text-red-300 mb-2">Passive Apps</h3>
                        <p className="text-gray-400 text-sm">Meditation timers & mood logs. Good for tracking, bad for active support.</p>
                    </div>
                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                        <h3 className="text-xl font-bold text-blue-300 mb-2">Therapy</h3>
                        <p className="text-gray-400 text-sm">Gold standard, but expensive, scarce, and has high friction to start.</p>
                    </div>
                    <div className="col-span-2 p-8 bg-teal-500/20 border-2 border-teal-500/40 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles size={100} /></div>
                        <h3 className="text-2xl font-bold text-teal-300 mb-2">MindFuel AI</h3>
                        <p className="text-gray-200">Active, intelligent coaching. Just like a text or call away. Bridge the gap with 24/7 availability.</p>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            type: "tech",
            title: "Powered by Next-Gen AI",
            icon: <Sparkles className="w-16 h-16 text-cyan-400" />,
            content: (
                <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg"><Brain size={24} className="text-blue-400" /></div>
                        <div>
                            <h4 className="font-bold text-white">Google Gemini 2.5</h4>
                            <p className="text-sm text-gray-400">Advanced reasoning for cognitive reframing, not just "chatting".</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-purple-500/20 rounded-lg"><Activity size={24} className="text-purple-400" /></div>
                        <div>
                            <h4 className="font-bold text-white">ElevenLabs Voice</h4>
                            <p className="text-sm text-gray-400">Hyper-realistic soothing voice for calming exercises.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-green-500/20 rounded-lg"><ShieldCheck size={24} className="text-green-400" /></div>
                        <div>
                            <h4 className="font-bold text-white">Safety First</h4>
                            <p className="text-sm text-gray-400">Built-in crisis detection and resource routing.</p>
                        </div>
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
                    <p className="text-2xl text-gray-300">Experience the difference.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-full text-xl shadow-lg border border-teal-400/50 hover:scale-105 transition-transform"
                    >
                        Launch App
                    </button>
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

            <div className="relative w-full max-w-5xl aspect-video bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-12 flex flex-col justify-between overflow-hidden">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-teal-400 to-emerald-400"
                        animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center -mt-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center text-center w-full max-w-3xl"
                        >
                            <div className="mb-8 p-6 bg-white/5 rounded-full border border-white/10 shadow-glow">
                                {slides[currentSlide].icon}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6 tracking-tight">
                                {slides[currentSlide].title}
                            </h1>

                            {slides[currentSlide].subtitle && (
                                <h2 className="text-2xl text-teal-300 font-light mb-8">{slides[currentSlide].subtitle}</h2>
                            )}

                            <div className="text-lg text-gray-300 leading-relaxed w-full">
                                {slides[currentSlide].content}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5 w-full">
                    <button onClick={prevSlide} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
                        <ChevronLeft className="text-gray-400 group-hover:text-white" size={24} />
                    </button>

                    <div className="text-sm font-mono text-gray-500 tracking-widest">
                        SLIDE {currentSlide + 1} / {slides.length}
                    </div>

                    <button onClick={nextSlide} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
                        <ChevronRight className="text-gray-400 group-hover:text-white" size={24} />
                    </button>
                </div>

            </div>

            <div className="mt-6 text-gray-500 text-sm flex items-center space-x-2">
                <span>Use</span>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs border border-white/10">←</kbd>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs border border-white/10">→</kbd>
                <span>to navigate</span>
            </div>
        </div>
    );
};

export default PitchDeck;
