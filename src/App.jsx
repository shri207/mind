import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import CorporateDashboard from './pages/CorporateDashboard.jsx'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/corporate" element={<CorporateDashboard />} />
        </Routes>
    )
}
