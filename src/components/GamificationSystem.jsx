import { useState, useEffect } from 'react'

const GamificationSystem = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [achievements, setAchievements] = useState([])
  const [userStats, setUserStats] = useState({
    xp: 0,
    level: 1,
    streak: 0,
    totalInteractions: 0,
  })
  const [notification, setNotification] = useState(null)

  const allAchievements = [
    {
      id: 'first_visit',
      title: '🎉 Premier Visiteur',
      description: 'Visitez le portfolio pour la première fois',
      xp: 10,
      unlocked: false,
    },
    {
      id: 'explorer',
      title: '🗺️ Explorateur',
      description: 'Visitez toutes les sections',
      xp: 25,
      unlocked: false,
    },
    {
      id: 'chatty',
      title: '💬 Bavard',
      description: 'Discutez avec le chatbot IA',
      xp: 15,
      unlocked: false,
    },
    {
      id: 'voice_master',
      title: '🎙️ Maître Vocal',
      description: 'Utilisez les commandes vocales',
      xp: 20,
      unlocked: false,
    },
    {
      id: 'code_runner',
      title: '⚡ Exécuteur de Code',
      description: 'Exécutez du code dans le playground',
      xp: 30,
      unlocked: false,
    },
    {
      id: 'blockchain_verifier',
      title: '🔗 Vérificateur Blockchain',
      description: 'Vérifiez l\'authenticité du portfolio',
      xp: 25,
      unlocked: false,
    },
    {
      id: 'cv_downloader',
      title: '📄 Collectionneur de CV',
      description: 'Téléchargez le CV',
      xp: 20,
      unlocked: false,
    },
    {
      id: 'gesture_ninja',
      title: '👋 Ninja des Gestes',
      description: 'Utilisez 5 gestes différents',
      xp: 35,
      unlocked: false,
    },
    {
      id: 'night_owl',
      title: '🌙 Oiseau de Nuit',
      description: 'Activez le mode sombre',
      xp: 10,
      unlocked: false,
    },
    {
      id: 'speed_reader',
      title: '⚡ Lecteur Rapide',
      description: 'Scrollez jusqu\'en bas en moins de 2 minutes',
      xp: 15,
      unlocked: false,
    },
    {
      id: 'social_butterfly',
      title: '🦋 Papillon Social',
      description: 'Cliquez sur tous les liens sociaux',
      xp: 20,
      unlocked: false,
    },
    {
      id: 'perfectionist',
      title: '💎 Perfectionniste',
      description: 'Débloquez tous les achievements',
      xp: 100,
      unlocked: false,
    },
  ]

  useEffect(() => {
    const savedData = localStorage.getItem('gamification')
    if (savedData) {
      const data = JSON.parse(savedData)
      setAchievements(data.achievements || allAchievements)
      setUserStats(data.userStats || userStats)
    } else {
      setAchievements(allAchievements)
      unlockAchievement('first_visit')
    }

    trackInteractions()
  }, [])

  const trackInteractions = () => {
    let sectionsVisited = new Set()
    const startTime = Date.now()

    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            sectionsVisited.add(section)
          }
        }
      })

      if (sectionsVisited.size === 6) {
        unlockAchievement('explorer')
      }

      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        const timeSpent = (Date.now() - startTime) / 1000
        if (timeSpent < 120) {
          unlockAchievement('speed_reader')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  const unlockAchievement = (id) => {
    setAchievements((prev) => {
      const updated = prev.map((ach) => {
        if (ach.id === id && !ach.unlocked) {
          showNotification(ach)
          setUserStats((stats) => {
            const newXP = stats.xp + ach.xp
            const newLevel = Math.floor(newXP / 100) + 1
            const updatedStats = {
              ...stats,
              xp: newXP,
              level: newLevel,
              totalInteractions: stats.totalInteractions + 1,
            }
            saveData(updated, updatedStats)
            return updatedStats
          })
          return { ...ach, unlocked: true }
        }
        return ach
      })
      return updated
    })
  }

  const saveData = (achs, stats) => {
    localStorage.setItem(
      'gamification',
      JSON.stringify({ achievements: achs, userStats: stats })
    )
  }

  const showNotification = (achievement) => {
    setNotification(achievement)
    setTimeout(() => setNotification(null), 5000)
  }

  const progress = (userStats.xp % 100) / 100
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  useEffect(() => {
    window.unlockAchievement = unlockAchievement
  }, [])

  return (
    <>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-110 animate-pulse"
      >
        <span className="text-2xl">🏆</span>
        <div className="text-left">
          <div className="text-xs font-bold">Level {userStats.level}</div>
          <div className="text-xs opacity-90">
            {unlockedCount}/{achievements.length} 🎖️
          </div>
        </div>
      </button>

      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-2xl animate-float border-4 border-yellow-300">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{notification.title.split(' ')[0]}</span>
            <div>
              <div className="text-xl font-bold">Achievement Débloqué!</div>
              <div className="text-lg">{notification.title}</div>
              <div className="text-sm opacity-90">{notification.description}</div>
              <div className="text-sm font-bold mt-2">+{notification.xp} XP</div>
            </div>
          </div>
        </div>
      )}

      {showPanel && (
        <div className="fixed inset-4 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  🏆 Achievements
                </h2>
                <p className="text-white/90">
                  Débloquez tous les achievements et gagnez de l'XP!
                </p>
              </div>
              <button
                onClick={() => setShowPanel(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 bg-white/20 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold text-lg">
                  Level {userStats.level}
                </span>
                <span className="text-white text-sm">
                  {userStats.xp % 100} / 100 XP
                </span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(100vh-300px)]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500 shadow-lg'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-60'
                  }`}
                >
                  <div className="text-5xl mb-3">
                    {achievement.title.split(' ')[0]}
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {achievement.title.split(' ').slice(1).join(' ')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {achievement.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                      +{achievement.xp} XP
                    </span>
                    {achievement.unlocked && (
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        ✓ Débloqué
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
              <h3 className="text-2xl font-bold mb-4">📊 Vos Statistiques</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {userStats.level}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Niveau
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {userStats.xp}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total XP
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {unlockedCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Débloqués
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.round((unlockedCount / achievements.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Complétion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GamificationSystem
