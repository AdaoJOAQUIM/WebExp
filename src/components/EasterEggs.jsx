import { useState, useEffect } from 'react'

const EasterEggs = () => {
  const [konamiProgress, setKonamiProgress] = useState(0)
  const [secretMode, setSecretMode] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)
  const [partyMode, setPartyMode] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [message, setMessage] = useState('')

  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ]

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === konamiCode[konamiProgress]) {
        setKonamiProgress((prev) => prev + 1)
        if (konamiProgress + 1 === konamiCode.length) {
          activateSecretMode()
          setKonamiProgress(0)
        }
      } else {
        setKonamiProgress(0)
      }
    }

    const handleTripleClick = () => {
      setClicks((prev) => prev + 1)
      setTimeout(() => setClicks(0), 500)
    }

    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('click', handleTripleClick)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('click', handleTripleClick)
    }
  }, [konamiProgress])

  useEffect(() => {
    if (clicks === 3) {
      activatePartyMode()
    }
  }, [clicks])

  useEffect(() => {
    const handleSpecialKeys = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault()
        toggleMatrixMode()
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault()
        showSecretMessage()
      }
    }

    document.addEventListener('keydown', handleSpecialKeys)
    return () => document.removeEventListener('keydown', handleSpecialKeys)
  }, [])

  const activateSecretMode = () => {
    setSecretMode(true)
    showMessage('🎮 KONAMI CODE ACTIVÉ! Mode Secret Débloqué! 🎮')
    document.body.style.transform = 'rotate(180deg)'
    setTimeout(() => {
      document.body.style.transform = 'rotate(0deg)'
      setSecretMode(false)
    }, 5000)

    if (window.unlockAchievement) {
      window.unlockAchievement('secret_code')
    }
  }

  const toggleMatrixMode = () => {
    setMatrixMode(!matrixMode)
    showMessage(
      matrixMode
        ? '👨‍💻 Matrix Mode Désactivé'
        : '👨‍💻 Matrix Mode Activé! Welcome to the Matrix...'
    )

    if (!matrixMode) {
      createMatrixRain()
    }
  }

  const createMatrixRain = () => {
    const canvas = document.createElement('canvas')
    canvas.id = 'matrix-canvas'
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    canvas.style.opacity = '0.3'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0F0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    setTimeout(() => {
      clearInterval(interval)
      const matrixCanvas = document.getElementById('matrix-canvas')
      if (matrixCanvas) matrixCanvas.remove()
    }, 10000)
  }

  const activatePartyMode = () => {
    setPartyMode(true)
    showMessage('🎉 PARTY MODE ACTIVATED! 🎊')

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']
    let i = 0

    const interval = setInterval(() => {
      document.body.style.background = colors[i % colors.length]
      i++
    }, 200)

    setTimeout(() => {
      clearInterval(interval)
      document.body.style.background = ''
      setPartyMode(false)
    }, 3000)
  }

  const showSecretMessage = () => {
    showMessage('🔐 Tu as trouvé le secret! "Code is poetry" 🔐')
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 5000)
  }

  return (
    <>
      {message && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] animate-bounce">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-yellow-400">
            <div className="text-3xl font-bold text-center">{message}</div>
          </div>
        </div>
      )}

      {konamiProgress > 0 && konamiProgress < konamiCode.length && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/80 text-green-400 px-4 py-2 rounded-full font-mono text-sm">
            Konami: {konamiProgress}/{konamiCode.length}
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-4 z-40 text-xs text-gray-400 dark:text-gray-600 space-y-1">
        <div>💡 Triple click pour Party Mode</div>
        <div>💡 Ctrl+Shift+M pour Matrix</div>
        <div>💡 Konami Code pour surprise</div>
        <div>💡 Ctrl+Shift+X pour secret</div>
      </div>
    </>
  )
}

export default EasterEggs
