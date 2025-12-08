import { useState, useEffect } from 'react'
import LockScreen from './pages/LockScreen'
import Main from './pages/Main'
import PhotoAlbum from './components/PhotoAlbum'
import LettersModal from './components/LettersModal'
import FrasesModal from './components/FrasesModal'
import './main.css'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)
  const [snowflakes, setSnowflakes] = useState([])
  const [showAlbum, setShowAlbum] = useState(false)
  const [showLetters, setShowLetters] = useState(false)
  const [showFrases, setShowFrases] = useState(false)
  const [theme, setTheme] = useState('cielo')

  // Generar copos de nieve al cargar
  // Aplicar tema guardado y guardarlo cuando cambie
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'oceano' || saved === 'cielo') setTheme(saved)
    } catch (e) {
      // no-op
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-cielo', 'theme-oceano')
      document.body.classList.add(`theme-${theme}`)
    }
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // no-op
    }
  }, [theme])

  // Generar copos de nieve una sola vez al montar el componente
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
      {isUnlocked ? (
        <Main
          onLock={lock}
          onShowAlbum={() => setShowAlbum(true)}
          onShowLetters={() => setShowLetters(true)}
          onShowFrases={() => setShowFrases(true)}
        />
      ) : <LockScreen onUnlock={unlock} />}

      {/* Selector de tema: Cielo (visual actual) / Océano (temática marina) */}
      <div
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          zIndex: 200,
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => setTheme('cielo')}
          aria-pressed={theme === 'cielo'}
          title="Tema Cielo"
          style={{
            padding: '8px 12px',
            borderRadius: 999,
            border: theme === 'cielo' ? '2px solid #ffd1dc' : '1px solid transparent',
            background: theme === 'cielo' ? '#ff6b9d' : 'rgba(0,0,0,0.25)',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          🌤️ Cielo
        </button>
        <button
          onClick={() => setTheme('oceano')}
          aria-pressed={theme === 'oceano'}
          title="Tema Océano"
          style={{
            padding: '8px 12px',
            borderRadius: 999,
            border: theme === 'oceano' ? '2px solid #a6efff' : '1px solid transparent',
            background: theme === 'oceano' ? '#0c6b8a' : 'rgba(0,0,0,0.25)',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          🌊 Océano
        </button>
      </div>
      {/* Botón bonito para abrir el álbum de fotos */}
      {/* Los botones de álbum y leer cartas ahora se mostrarán en Main.jsx debajo del botón de carta semanal */}
      {/* Modal del álbum de fotos */}
      {showAlbum && (
        <PhotoAlbum onClose={() => setShowAlbum(false)} />
      )}
      {/* Modal de cartas semanales */}
      {showLetters && (
        <LettersModal onClose={() => setShowLetters(false)} />
      )}
      {showFrases && (
        <FrasesModal onClose={() => setShowFrases(false)} />
      )}
      {showInstall && isMobile && (
        <button
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
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