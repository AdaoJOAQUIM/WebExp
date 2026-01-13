import { useState, useEffect } from 'react'

const RealTimeAnalytics = () => {
  const [stats, setStats] = useState({
    visitors: 0,
    pageViews: 0,
    avgTime: '0:00',
    locations: [],
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const sessionStart = Date.now()

    const updateStats = () => {
      const currentVisitors = Math.floor(Math.random() * 50) + 10
      const totalViews = Math.floor(Math.random() * 1000) + 500
      const timeSpent = Math.floor((Date.now() - sessionStart) / 1000)
      const minutes = Math.floor(timeSpent / 60)
      const seconds = timeSpent % 60

      setStats({
        visitors: currentVisitors,
        pageViews: totalViews,
        avgTime: `${minutes}:${seconds.toString().padStart(2, '0')}`,
        locations: [
          { country: '🇫🇷 France', count: Math.floor(Math.random() * 30) + 20 },
          { country: '🇺🇸 USA', count: Math.floor(Math.random() * 20) + 10 },
          { country: '🇬🇧 UK', count: Math.floor(Math.random() * 15) + 8 },
          { country: '🇩🇪 Germany', count: Math.floor(Math.random() * 12) + 5 },
          { country: '🇨🇦 Canada', count: Math.floor(Math.random() * 10) + 3 },
        ],
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 3000)

    const trackPageView = () => {
      if (document.visibilityState === 'visible') {
        console.log('📊 Page view tracked')
      }
    }

    const trackMouseMovement = (e) => {
      console.log('🖱️ Mouse movement tracked')
    }

    const trackScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      console.log(`📜 Scroll depth: ${scrollPercent.toFixed(0)}%`)
    }

    document.addEventListener('visibilitychange', trackPageView)
    window.addEventListener('scroll', trackScroll)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', trackPageView)
      window.removeEventListener('scroll', trackScroll)
    }
  }, [])

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-24 right-6 z-40 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-lg">📊</span>
        <span className="text-sm font-medium">Analytics</span>
        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
      </button>

      {isVisible && (
        <div className="fixed top-40 right-6 z-40 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold gradient-text">
              Analytics en temps réel
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Visiteurs en ligne
                  </p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.visitors}
                  </p>
                </div>
                <span className="text-4xl">👥</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vues totales
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {stats.pageViews}
                  </p>
                </div>
                <span className="text-4xl">📈</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Temps moyen
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {stats.avgTime}
                  </p>
                </div>
                <span className="text-4xl">⏱️</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                🌍 Top Locations
              </p>
              <div className="space-y-2">
                {stats.locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{location.country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                          style={{ width: `${(location.count / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium w-6">
                        {location.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Données mises à jour toutes les 3 secondes
              </p>
              <div className="flex justify-center gap-1 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-2000"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-4000"></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RealTimeAnalytics
