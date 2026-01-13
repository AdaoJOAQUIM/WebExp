export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration)
        })
        .catch((error) => {
          console.log('❌ Service Worker registration failed:', error)
        })
    })
  }
}

export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      console.log('✅ Notification permission granted')
      return true
    }
  }
  return false
}

export const showNotification = (title, options) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options)
  }
}

export const checkOnlineStatus = () => {
  return navigator.onLine
}

export const addToHomeScreen = () => {
  let deferredPrompt

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    console.log('💾 App can be installed')
  })

  return deferredPrompt
}
