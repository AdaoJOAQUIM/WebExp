import { useEffect, useState } from 'react'

const GestureControls = () => {
  const [gesture, setGesture] = useState('')
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0
    let touchEndX = 0
    let touchEndY = 0

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX
      touchStartY = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX
      touchEndY = e.changedTouches[0].screenY
      handleGesture()
    }

    const handleGesture = () => {
      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY
      const minSwipeDistance = 50

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > minSwipeDistance) {
          performAction('swipe-right', '➡️ Swipe Right')
        } else if (deltaX < -minSwipeDistance) {
          performAction('swipe-left', '⬅️ Swipe Left')
        }
      } else {
        if (deltaY > minSwipeDistance) {
          performAction('swipe-down', '⬇️ Swipe Down')
        } else if (deltaY < -minSwipeDistance) {
          performAction('swipe-up', '⬆️ Swipe Up')
        }
      }
    }

    const performAction = (action, gestureText) => {
      setGesture(gestureText)
      setTimeout(() => setGesture(''), 2000)

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
      const currentSection = sections.findIndex((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      switch (action) {
        case 'swipe-up':
          if (currentSection < sections.length - 1) {
            document
              .getElementById(sections[currentSection + 1])
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          break
        case 'swipe-down':
          if (currentSection > 0) {
            document
              .getElementById(sections[currentSection - 1])
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          break
        case 'swipe-left':
          window.scrollBy({ left: 300, behavior: 'smooth' })
          break
        case 'swipe-right':
          window.scrollBy({ left: -300, behavior: 'smooth' })
          break
      }
    }

    let doubleTapTimer = null
    const handleDoubleTap = (e) => {
      if (doubleTapTimer) {
        clearTimeout(doubleTapTimer)
        doubleTapTimer = null
        setGesture('👆👆 Double Tap')
        setTimeout(() => setGesture(''), 2000)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        doubleTapTimer = setTimeout(() => {
          doubleTapTimer = null
        }, 300)
      }
    }

    let pinchDistance = 0
    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const distance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        )

        if (pinchDistance > 0) {
          if (distance > pinchDistance + 50) {
            setGesture('🤏 Pinch Out - Zoom In')
            setTimeout(() => setGesture(''), 2000)
          } else if (distance < pinchDistance - 50) {
            setGesture('🤏 Pinch In - Zoom Out')
            setTimeout(() => setGesture(''), 2000)
          }
        }
        pinchDistance = distance
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('touchstart', handleDoubleTap)
    document.addEventListener('touchmove', handleTouchMove)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchstart', handleDoubleTap)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <>
      <button
        onClick={() => setShowHint(!showHint)}
        className="fixed top-24 left-6 z-40 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Gesture hints"
      >
        👋
      </button>

      {showHint && (
        <div className="fixed top-40 left-6 z-40 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold gradient-text">Gestes Tactiles</h3>
            <button
              onClick={() => setShowHint(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-2xl">⬆️</span>
              <span>Swipe Up - Section suivante</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-2xl">⬇️</span>
              <span>Swipe Down - Section précédente</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-2xl">➡️</span>
              <span>Swipe Right - Scroll gauche</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-2xl">⬅️</span>
              <span>Swipe Left - Scroll droite</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-2xl">👆👆</span>
              <span>Double Tap - Retour haut</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-2xl">🤏</span>
              <span>Pinch - Zoom in/out</span>
            </div>
          </div>
        </div>
      )}

      {gesture && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-8 py-4 rounded-2xl text-2xl font-bold backdrop-blur-lg">
          {gesture}
        </div>
      )}
    </>
  )
}

export default GestureControls
