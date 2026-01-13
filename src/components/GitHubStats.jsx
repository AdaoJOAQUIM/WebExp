import { useState, useEffect } from 'react'

const GitHubStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    generateMockStats()
  }, [])

  const generateMockStats = () => {
    setTimeout(() => {
      setStats({
        totalRepos: 42,
        totalStars: 328,
        totalForks: 87,
        totalCommits: 1247,
        contributionStreak: 127,
        longestStreak: 245,
        pullRequests: 156,
        issuesResolved: 234,
        codeReviews: 89,
        languages: [
          { name: 'JavaScript', percentage: 38, color: '#f1e05a' },
          { name: 'TypeScript', percentage: 25, color: '#2b7489' },
          { name: 'Python', percentage: 18, color: '#3572A5' },
          { name: 'CSS', percentage: 12, color: '#563d7c' },
          { name: 'Other', percentage: 7, color: '#ededed' },
        ],
        topRepos: [
          {
            name: 'awesome-portfolio',
            stars: 124,
            forks: 34,
            description: 'Portfolio ultra moderne avec IA',
          },
          {
            name: 'react-dashboard',
            stars: 89,
            forks: 23,
            description: 'Dashboard React avancé',
          },
          {
            name: 'ai-chatbot',
            stars: 67,
            forks: 18,
            description: 'Chatbot intelligent',
          },
        ],
        contributions: generateContributions(),
      })
      setLoading(false)
    }, 1000)
  }

  const generateContributions = () => {
    const contributions = []
    const today = new Date()
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      contributions.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 15),
      })
    }
    return contributions
  }

  const getContributionColor = (count) => {
    if (count === 0) return 'bg-gray-200 dark:bg-gray-700'
    if (count < 3) return 'bg-green-200 dark:bg-green-900'
    if (count < 6) return 'bg-green-400 dark:bg-green-700'
    if (count < 9) return 'bg-green-600 dark:bg-green-500'
    return 'bg-green-800 dark:bg-green-300'
  }

  if (loading) {
    return (
      <button className="fixed top-20 right-6 z-40 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <span className="text-lg">⏳</span>
        <span className="text-sm font-medium">Loading...</span>
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-20 right-6 z-40 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-lg">🐙</span>
        <span className="text-sm font-medium">GitHub Stats</span>
      </button>

      {showPanel && (
        <div className="fixed inset-4 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                  🐙 GitHub Statistics
                </h2>
                <p className="text-white/90">Activité et contributions en temps réel</p>
              </div>
              <button
                onClick={() => setShowPanel(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-300"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <div className="text-4xl mb-2">📦</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.totalRepos}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.totalStars}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Stars</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.contributionStreak}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                <div className="text-4xl mb-2">💻</div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.totalCommits}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Commits</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">📊 Langages de Programmation</h3>
              <div className="space-y-3">
                {stats.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">🏆 Top Repositories</h3>
              <div className="space-y-4">
                {stats.topRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <h4 className="font-bold text-lg mb-2">{repo.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {repo.description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        ⭐ {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        🔱 {repo.forks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">📅 Contributions (365 jours)</h3>
              <div className="overflow-x-auto">
                <div className="inline-grid grid-rows-7 grid-flow-col gap-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {stats.contributions.map((day, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)}`}
                      title={`${day.date}: ${day.count} contributions`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                <span>Moins</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-400 dark:bg-green-700 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-800 dark:bg-green-300 rounded-sm"></div>
                </div>
                <span>Plus</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GitHubStats
