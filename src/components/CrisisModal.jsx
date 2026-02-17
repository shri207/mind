import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Heart, MessageCircle, Shield, ExternalLink } from 'lucide-react'

export default function CrisisModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg rounded-2xl bg-slate-900 border border-red-500/30 shadow-2xl shadow-red-500/10 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-b border-red-500/20 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">You Matter</h2>
                                    <p className="text-sm text-red-300/80">Please reach out for immediate support</p>
                                </div>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="px-6 py-5 space-y-4">
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Your feelings are valid and you deserve support. Please connect with one of these resources right now — they're free, confidential, and available 24/7.
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="tel:988"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">988 Suicide & Crisis Lifeline</p>
                                        <p className="text-sm text-slate-400">Call or text 988 — 24/7</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                                </a>

                                <a
                                    href="sms:741741&body=HOME"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">Crisis Text Line</p>
                                        <p className="text-sm text-slate-400">Text HOME to 741741</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                                </a>

                                <a
                                    href="tel:911"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">Emergency Services</p>
                                        <p className="text-sm text-slate-400">Call 911 for immediate danger</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                                </a>
                            </div>

                            <p className="text-xs text-slate-500 italic pt-2">
                                Inner Self is not a crisis service. If you are in immediate danger, please call emergency services.
                            </p>
                        </div>

                        {/* Close button */}
                        <div className="px-6 pb-5">
                            <button
                                onClick={onClose}
                                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                            >
                                I understand, close this
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
