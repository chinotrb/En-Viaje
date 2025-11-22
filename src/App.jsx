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
    // Registrar el evento solo una vez
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
      console.log('beforeinstallprompt capturado, mostrando botón de instalación')
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
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
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches

  return (
    <>
      {isUnlocked ? <Main onLock={lock} /> : <LockScreen onUnlock={unlock} />}
      {showInstall && isMobile && (
        <button
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '16px 24px',
            background: '#E6A9B5',
            color: '#fff',
            border: 'none',
            borderRadius: '32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'block',
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