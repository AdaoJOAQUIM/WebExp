import { useState, useRef, useEffect } from 'react'

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Bonjour! Je suis l\'assistant IA de ce portfolio. Posez-moi des questions sur les compétences, l\'expérience, ou les projets!',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses = {
    skills: [
      'Je maîtrise principalement React, Vue.js, Node.js, et Python. Mes compétences frontend incluent TypeScript, Tailwind CSS et Next.js. Côté backend, je travaille avec Express, PostgreSQL et MongoDB.',
      'Mes points forts sont le développement fullstack avec React/Node.js, l\'architecture cloud sur AWS, et la création d\'interfaces utilisateur modernes et performantes.',
    ],
    experience: [
      'J\'ai plus de 5 ans d\'expérience en développement fullstack. J\'ai travaillé comme Senior Full Stack Developer chez Tech Company Inc. depuis 2022, et avant ça chez Startup Innovation et Digital Agency.',
      'Mon parcours inclut des postes de Frontend Developer, Full Stack Developer, et actuellement Senior Full Stack Developer, avec une évolution constante vers des responsabilités techniques plus importantes.',
    ],
    projects: [
      'Mes projets phares incluent une plateforme e-commerce complète avec Stripe, une app de gestion de tâches collaborative en temps réel avec Firebase, et un dashboard analytics pour réseaux sociaux avec D3.js.',
      'Je travaille sur des projets variés : e-commerce, task management, analytics dashboards... Tous avec des technologies modernes comme React, Node.js, et des architectures scalables.',
    ],
    contact: [
      'Vous pouvez me contacter via le formulaire de contact sur cette page, par email à contact@example.com, ou par téléphone au +33 6 12 34 56 78. Je réponds généralement sous 24h!',
      'N\'hésitez pas à utiliser le formulaire de contact en bas de page, ou à me contacter directement sur LinkedIn, GitHub ou par email!',
    ],
    default: [
      'C\'est une excellente question! Pour plus de détails, je vous invite à explorer les différentes sections du portfolio ou à me contacter directement via le formulaire.',
      'Je peux vous parler des compétences, de l\'expérience, des projets, ou comment me contacter. Que souhaitez-vous savoir?',
      'Intéressant! Je suis spécialisé en développement fullstack avec React et Node.js. Voulez-vous en savoir plus sur un aspect particulier?',
    ],
  }

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    if (
      lowerMessage.includes('compétence') ||
      lowerMessage.includes('skill') ||
      lowerMessage.includes('technologie') ||
      lowerMessage.includes('maîtrise')
    ) {
      return aiResponses.skills[
        Math.floor(Math.random() * aiResponses.skills.length)
      ]
    }

    if (
      lowerMessage.includes('expérience') ||
      lowerMessage.includes('parcours') ||
      lowerMessage.includes('travaillé') ||
      lowerMessage.includes('poste')
    ) {
      return aiResponses.experience[
        Math.floor(Math.random() * aiResponses.experience.length)
      ]
    }

    if (
      lowerMessage.includes('projet') ||
      lowerMessage.includes('réalisation') ||
      lowerMessage.includes('portfolio') ||
      lowerMessage.includes('créé')
    ) {
      return aiResponses.projects[
        Math.floor(Math.random() * aiResponses.projects.length)
      ]
    }

    if (
      lowerMessage.includes('contact') ||
      lowerMessage.includes('joindre') ||
      lowerMessage.includes('email') ||
      lowerMessage.includes('téléphone')
    ) {
      return aiResponses.contact[
        Math.floor(Math.random() * aiResponses.contact.length)
      ]
    }

    return aiResponses.default[
      Math.floor(Math.random() * aiResponses.default.length)
    ]
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { type: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getAIResponse(input),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const quickQuestions = [
    'Quelles sont tes compétences?',
    'Parle-moi de ton expérience',
    'Montre-moi tes projets',
    'Comment te contacter?',
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-300 transform hover:scale-110 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 rotate-45'
            : 'gradient-bg animate-gradient'
        }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 animate-float">
          <div className="gradient-bg p-4 text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="animate-pulse">🤖</span>
              Assistant IA Portfolio
            </h3>
            <p className="text-sm opacity-90">Posez-moi vos questions!</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-2000"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-4000"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Questions rapides:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question)
                      setTimeout(handleSend, 100)
                    }}
                    className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-full transition-colors duration-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full gradient-bg text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatbot
