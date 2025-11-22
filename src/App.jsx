import { useState, useEffect } from 'react'
import LockScreen from './pages/LockScreen'
import Main from './pages/Main'
import './main.css'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isUnlocked') === 'true') {
      setIsUnlocked(true)
    }
    // Detectar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    })
  }, [])

  const unlock = () => setIsUnlocked(true)
  const lock = () => {
    localStorage.removeItem('isUnlocked')
    setIsUnlocked(false)
  }

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then(() => {
        setShowInstall(false)
        setDeferredPrompt(null)
      })
    }
  }

  // Solo mostrar el botón en móvil y si es instalable
  const isMobile = window.matchMedia('(max-width: 600px)').matches

  return (
    <>
      {isUnlocked ? <Main onLock={lock} /> : <LockScreen onUnlock={unlock} />}
      {showInstall && isMobile && (
        <button
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            padding: '12px 20px',
            background: '#E6A9B5',
            color: '#fff',
            border: 'none',
            borderRadius: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={handleInstallClick}
        >
          Descargar app
        </button>
      )}
    </>
  )
}

export default App