import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Events from './pages/Events'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import EventDetail from './pages/EventDetail'
import JardinExperience from './pages/JardinExperience'
import Press from './pages/Press'
import { ConfigProvider } from './context/ConfigContext'
import { ThemeProvider } from './context/ThemeContext'
import Footer from './components/Footer'
import EditModeIndicator from './components/Admin/EditModeIndicator'
import './App.css'

function App() {
    return (
        <ConfigProvider>
            <ThemeProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div className="app-container">
                        <header>
                            <Navbar />
                        </header>
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/menu/:type" element={<Menu />} />
                                <Route path="/reservations" element={<Reservations />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/press" element={<Press />} />
                                <Route path="/admin" element={<AdminLogin />} />
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/events/:id" element={<EventDetail />} />
                                <Route path="/jardin-experience" element={<JardinExperience />} />
                            </Routes>
                        </main>
                        <EditModeIndicator />
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </ConfigProvider>
    )
}

export default App
