import { useState, useEffect } from 'react'

const VoiceCommand = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSupported(true)
    }
  }, [])

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'fr-FR'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('🎤 J\'écoute...')
    }

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase()
      setTranscript(text)
      handleCommand(text)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      setTranscript('❌ Erreur de reconnaissance vocale')
    }

    recognition.onend = () => {
      setIsListening(false)
      setTimeout(() => setTranscript(''), 3000)
    }

    recognition.start()
  }

  const handleCommand = (command) => {
    if (command.includes('projet') || command.includes('réalisation')) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      speak('Voici mes projets')
    } else if (command.includes('compétence') || command.includes('skill')) {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      speak('Voici mes compétences')
    } else if (command.includes('contact')) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      speak('Voici mes coordonnées')
    } else if (command.includes('expérience')) {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
      speak('Voici mon expérience professionnelle')
    } else if (command.includes('accueil') || command.includes('haut')) {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
      speak('Retour à l\'accueil')
    } else if (command.includes('propos')) {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      speak('Voici ma présentation')
    } else {
      speak('Je n\'ai pas compris la commande. Essayez : projets, compétences, contact, ou expérience')
    }
  }

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'fr-FR'
      utterance.rate = 1
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!supported) return null

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-300 transform hover:scale-110 ${
          isListening
            ? 'bg-red-500 animate-pulse'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        }`}
        aria-label="Voice Command"
      >
        {isListening ? '🎤' : '🎙️'}
      </button>

      {transcript && (
        <div className="absolute bottom-20 left-0 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
          <p className="text-sm font-medium">{transcript}</p>
        </div>
      )}

      {!transcript && (
        <div className="absolute bottom-20 left-0 bg-gray-900/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="font-medium mb-1">Commandes vocales:</p>
          <ul className="space-y-0.5 text-[10px]">
            <li>• "Projets"</li>
            <li>• "Compétences"</li>
            <li>• "Contact"</li>
            <li>• "Expérience"</li>
            <li>• "Accueil"</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default VoiceCommand
