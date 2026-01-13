import { useState } from 'react'

const PortfolioQuiz = () => {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const questions = [
    {
      question: 'Quelle est la stack principale de ce portfolio?',
      options: [
        'WordPress + PHP',
        'React + Node.js + Express',
        'Angular + Django',
        'Vue.js + Laravel',
      ],
      correct: 1,
      explanation: 'Ce portfolio utilise React 18, Vite, Node.js et Express!',
    },
    {
      question: 'Combien de fonctionnalités révolutionnaires ce portfolio possède-t-il?',
      options: ['5-10', '10-15', '15-20', '20+'],
      correct: 3,
      explanation:
        'Plus de 20 fonctionnalités innovantes: IA, Blockchain, Voice, PWA, etc.!',
    },
    {
      question: 'Quelle API est utilisée pour les commandes vocales?',
      options: [
        'Voice Recognition API',
        'Web Speech API',
        'Audio API',
        'Microphone API',
      ],
      correct: 1,
      explanation: 'Web Speech API permet la reconnaissance vocale et la synthèse vocale!',
    },
    {
      question: 'Quel algorithme de hash est utilisé pour la blockchain?',
      options: ['MD5', 'SHA-1', 'SHA-256', 'bcrypt'],
      correct: 2,
      explanation: 'SHA-256 est utilisé pour garantir l\'intégrité du portfolio!',
    },
    {
      question: 'Cette application est une PWA. Que signifie PWA?',
      options: [
        'Professional Web App',
        'Progressive Web Application',
        'Powerful Web Architecture',
        'Portable Web App',
      ],
      correct: 1,
      explanation: 'Progressive Web Application - installable et fonctionne offline!',
    },
    {
      question: 'Combien d\'achievements peut-on débloquer?',
      options: ['6', '8', '10', '12'],
      correct: 3,
      explanation: '12 achievements à débloquer en explorant toutes les fonctionnalités!',
    },
    {
      question: 'Quelle technologie est utilisée pour le background animé?',
      options: ['Three.js', 'Canvas API', 'WebGL', 'SVG Animations'],
      correct: 1,
      explanation: 'Canvas 2D API avec particules et animations optimisées!',
    },
    {
      question: 'En combien de formats peut-on exporter le CV?',
      options: ['2 formats', '3 formats', '4 formats', '5 formats'],
      correct: 2,
      explanation: '4 formats: PDF, HTML, JSON et TXT!',
    },
  ]

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
        if (window.unlockAchievement) {
          window.unlockAchievement('quiz_master')
        }
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return { emoji: '🏆', text: 'PARFAIT! Vous êtes un expert!' }
    if (percentage >= 75) return { emoji: '🌟', text: 'Excellent! Très bien joué!' }
    if (percentage >= 50) return { emoji: '👍', text: 'Bien joué! Bonne connaissance!' }
    return { emoji: '💪', text: 'Pas mal! À refaire pour améliorer!' }
  }

  if (!showQuiz) {
    return (
      <button
        onClick={() => setShowQuiz(true)}
        className="fixed top-52 right-6 z-40 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-lg">🎯</span>
        <span className="text-sm font-medium">Quiz</span>
      </button>
    )
  }

  if (showResult) {
    const result = getScoreMessage()
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8">
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce">{result.emoji}</div>
            <h2 className="text-3xl font-bold mb-4">Quiz Terminé!</h2>
            <div className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-xl mb-6">{result.text}</div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
              <h3 className="font-bold mb-3">📊 Résumé:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Questions correctes:</span>
                  <span className="font-bold text-green-600">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions incorrectes:</span>
                  <span className="font-bold text-red-600">
                    {questions.length - score}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pourcentage:</span>
                  <span className="font-bold text-purple-600">
                    {Math.round((score / questions.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={resetQuiz} className="flex-1 btn-primary">
                Recommencer
              </button>
              <button
                onClick={() => setShowQuiz(false)}
                className="flex-1 btn-secondary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              🎯 Portfolio Quiz
            </h2>
            <button
              onClick={() => setShowQuiz(false)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              ✕
            </button>
          </div>
          <div className="text-white text-sm mb-2">
            Question {currentQuestion + 1} sur {questions.length}
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-102 ${
                  selectedAnswer === null
                    ? 'border-gray-300 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    : selectedAnswer === index
                    ? index === question.correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : index === question.correct
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-300 dark:border-gray-700 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? index === question.correct
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : selectedAnswer !== null && index === question.correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedAnswer !== null &&
                      (index === question.correct ? '✓' : selectedAnswer === index ? '✗' : '')}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <span className="text-xl">💡</span>
                <div>
                  <div className="font-bold mb-1">Explication:</div>
                  <div className="text-sm">{question.explanation}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div>Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</div>
            <div>
              {currentQuestion + 1}/{questions.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioQuiz
