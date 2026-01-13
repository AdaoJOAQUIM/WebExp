import { useState, useEffect } from 'react'

const SocialProof = () => {
  const [notifications, setNotifications] = useState([])
  const [currentNotif, setCurrentNotif] = useState(null)

  const proofTemplates = [
    { text: '👤 Sarah de Paris vient de consulter le portfolio', type: 'view' },
    { text: '⭐ Marc de Lyon a aimé un projet', type: 'like' },
    { text: '📥 Julie de Marseille a téléchargé le CV', type: 'download' },
    { text: '💬 Thomas de Toulouse a utilisé le chatbot', type: 'chat' },
    { text: '🎙️ Emma de Nantes a testé les commandes vocales', type: 'voice' },
    { text: '⚡ Lucas de Bordeaux a exécuté du code', type: 'code' },
    { text: '🔗 Sophie de Lille a vérifié la blockchain', type: 'blockchain' },
    { text: '👥 3 personnes consultent le portfolio maintenant', type: 'live' },
    { text: '🏆 Kevin de Strasbourg a débloqué un achievement', type: 'achievement' },
    { text: '📊 Marie de Nice a ouvert les analytics', type: 'analytics' },
    { text: '🌙 Pierre de Rennes a activé le mode sombre', type: 'dark' },
    { text: '📱 Claire de Montpellier a installé la PWA', type: 'pwa' },
  ]

  useEffect(() => {
    showRandomNotification()
    const interval = setInterval(() => {
      showRandomNotification()
    }, 8000) // Toutes les 8 secondes

    return () => clearInterval(interval)
  }, [])

  const showRandomNotification = () => {
    const random = proofTemplates[Math.floor(Math.random() * proofTemplates.length)]
    const notif = {
      id: Date.now(),
      ...random,
      timestamp: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setCurrentNotif(notif)
    setNotifications((prev) => [notif, ...prev.slice(0, 9)])

    setTimeout(() => {
      setCurrentNotif(null)
    }, 6000)
  }

  const getNotifColor = (type) => {
    const colors = {
      view: 'from-blue-500 to-cyan-500',
      like: 'from-pink-500 to-rose-500',
      download: 'from-green-500 to-emerald-500',
      chat: 'from-purple-500 to-indigo-500',
      voice: 'from-yellow-500 to-orange-500',
      code: 'from-red-500 to-pink-500',
      blockchain: 'from-indigo-500 to-purple-500',
      live: 'from-green-500 to-teal-500',
      achievement: 'from-yellow-500 to-amber-500',
      analytics: 'from-blue-500 to-indigo-500',
      dark: 'from-gray-700 to-gray-900',
      pwa: 'from-orange-500 to-red-500',
    }
    return colors[type] || 'from-gray-500 to-gray-700'
  }

  return (
    <>
      {currentNotif && (
        <div className="fixed bottom-24 left-6 z-50 animate-fade-in">
          <div
            className={`bg-gradient-to-r ${getNotifColor(
              currentNotif.type
            )} text-white px-6 py-4 rounded-xl shadow-2xl max-w-sm`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔔</div>
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">{currentNotif.text}</div>
                <div className="text-xs opacity-90">{currentNotif.timestamp}</div>
              </div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <div className="w-4 h-4 bg-green-500 rounded-full absolute -top-1 -right-1 animate-pulse"></div>
          <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 border-2 border-green-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              {Math.floor(Math.random() * 10) + 3} en ligne
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SocialProof
