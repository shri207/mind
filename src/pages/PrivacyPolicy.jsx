import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Database, Trash2, UserX } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'

const SECTIONS = [
    {
        icon: Lock,
        title: 'Encryption',
        content: 'All conversations and personal data within MindFuel are encrypted using industry-standard AES-256 encryption at rest and TLS 1.3 in transit. Your reflections and emotional data are protected with the same level of security used by financial institutions.',
    },
    {
        icon: Eye,
        title: 'Anonymous Mode',
        content: 'MindFuel can be used without creating an account. In anonymous mode, no personal information is collected or stored. Your conversations exist only in your browser session and are deleted when you close the app.',
    },
    {
        icon: Database,
        title: 'Data Collection',
        content: 'We collect only the minimum data necessary to provide our service. This includes conversation text (for AI context), sentiment scores, and usage patterns. We do NOT collect your name, email, location, or any device identifiers in anonymous mode.',
    },
    {
        icon: UserX,
        title: 'No Data Selling — Ever',
        content: 'Your mental health data is never sold, shared with advertisers, or used for marketing purposes. Period. Your emotional reflections are sacred, and we treat them that way. We will never monetize your vulnerability.',
    },
    {
        icon: Trash2,
        title: 'Data Deletion',
        content: 'You can request complete deletion of all your data at any time. Upon request, all conversation history, sentiment data, and account information is permanently and irreversibly deleted from our servers within 48 hours.',
    },
    {
        icon: Shield,
        title: 'Third-Party Services',
        content: 'MindFuel uses Google Gemini for AI conversation processing and ElevenLabs for voice synthesis. Conversations sent to these services are processed in real-time and are subject to their respective privacy policies. We recommend reviewing their policies for complete transparency.',
    },
]

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-surface-primary">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
                    <p className="text-slate-400 mb-2">Last updated: February 2026</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-12 max-w-xl">
                        At MindFuel, your privacy isn't just a policy — it's a core design principle.
                        We believe mental wellness tools should be the most private software you use.
                    </p>

                    <div className="space-y-6">
                        {SECTIONS.map((section, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                                        <section.icon className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white mb-2">{section.title}</h2>
                                        <p className="text-sm text-slate-400 leading-relaxed">{section.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Legal Footer */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-xs text-slate-600 leading-relaxed">
                            MindFuel is a mental wellness support platform and not a licensed medical provider.
                            If you are experiencing a crisis, please contact local emergency services or a licensed
                            mental health professional. For questions about this policy, you may reach our team
                            at privacy@mindfuel.app.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
