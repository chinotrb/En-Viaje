import { useState, useEffect } from 'react'
import LockScreen from './pages/LockScreen'
import Main from './pages/Main'
import PhotoAlbum from './components/PhotoAlbum'
import './main.css'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)
  const [snowflakes, setSnowflakes] = useState([])
  const [showAlbum, setShowAlbum] = useState(false)

  // Generar copos de nieve al cargar
  useEffect(() => {
      const flakes = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        size: 12 + Math.random() * 16,
        duration: 7 + Math.random() * 7,
        char: '•',
      }))
      setSnowflakes(flakes)
  }, [])
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
      {/* Animación de nieve */}
      <div className="snow">
        {snowflakes.map(flake => (
          <span
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
            }}
          >{flake.char}</span>
        ))}
      </div>
      {isUnlocked ? <Main onLock={lock} /> : <LockScreen onUnlock={unlock} />}
      {/* Botón bonito para abrir el álbum de fotos */}
      {isUnlocked && (
        <button
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 9999,
            padding: '16px 28px',
            background: 'linear-gradient(90deg, #E6A9B5 0%, #A9CFE6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'block',
            letterSpacing: '1px',
            transition: 'transform 0.2s',
          }}
          onClick={() => setShowAlbum(true)}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          📸 Album
        </button>
      )}
      {/* Modal del álbum de fotos */}
      {showAlbum && (
        <PhotoAlbum onClose={() => setShowAlbum(false)} />
      )}
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