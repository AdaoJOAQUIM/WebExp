import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIChatbot from './components/AIChatbot'
import ThreeBackground from './components/ThreeBackground'
import VoiceCommand from './components/VoiceCommand'
import RealTimeAnalytics from './components/RealTimeAnalytics'
import CodePlayground from './components/CodePlayground'
import BlockchainVerification from './components/BlockchainVerification'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import GestureControls from './components/GestureControls'
import ResumeGenerator from './components/ResumeGenerator'
import GamificationSystem from './components/GamificationSystem'
import GitHubStats from './components/GitHubStats'
import SkillTree from './components/SkillTree'
import SocialProof from './components/SocialProof'
import EasterEggs from './components/EasterEggs'
import PortfolioQuiz from './components/PortfolioQuiz'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative">
      <ThreeBackground />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="relative z-10">
        <Hero />
        <About />
        <BlockchainVerification />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />

      <AIChatbot />
      <VoiceCommand />
      <RealTimeAnalytics />
      <CodePlayground />
      <PWAInstallPrompt />
      <GestureControls />
      <ResumeGenerator />
      <GamificationSystem />
      <GitHubStats />
      <SkillTree />
      <SocialProof />
      <EasterEggs />
      <PortfolioQuiz />
    </div>
  )
}

export default App
