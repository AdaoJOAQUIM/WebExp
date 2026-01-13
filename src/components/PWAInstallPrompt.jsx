import { useState, useEffect } from 'react'

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('✅ PWA installed')
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-float">
      <div className="text-4xl">📱</div>
      <div className="flex-1">
        <p className="font-bold text-lg">Installer l'application</p>
        <p className="text-sm opacity-90">
          Accès rapide depuis votre écran d'accueil
        </p>
      </div>
      <button
        onClick={handleInstallClick}
        className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300"
      >
        Installer
      </button>
      <button
        onClick={() => setShowInstallPrompt(false)}
        className="text-white hover:text-gray-200 text-2xl"
      >
        ✕
      </button>
    </div>
  )
}

export default PWAInstallPrompt
