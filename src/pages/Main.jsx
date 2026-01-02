import { useState, useRef, useEffect } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import CartaSemanal from '../components/CartaSemanal'
import { Button, Box, Typography, Card, CardContent } from '@mui/material'

import './Main.css'
import useMainData from '../hooks/useMainData'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import FlightIcon from '@mui/icons-material/Flight'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import EmotionalPopup from '../components/EmotionalPopup'
import EmotionalStoryModal from '../components/EmotionalStoryModal'
import EmotionalNoModal from '../components/EmotionalNoModal'

export default function Home({ theme, onLock, onShowAlbum, onShowLetters, onShowFrases, onShowSpecial }) {
  const { daysLeft, currentPhrase, currentMotivational, currentLetter } = useMainData()
  const [showLetter, setShowLetter] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const audioRef = useRef(null)
  const headerMessages = ['A.L.L', '14643', 'chu']
  const [headerText, setHeaderText] = useState(headerMessages[0])
  const [headerCycle, setHeaderCycle] = useState(0)
  const [showEmotionalPopup, setShowEmotionalPopup] = useState(false)
  const [showEmotionalStory, setShowEmotionalStory] = useState(false)
  const [showEmotionalNo, setShowEmotionalNo] = useState(false)

  const songs = ['/music/TheRed-Nosed.mp3', '/music/ChristmasTree.mp3']
  const emotionalPopupKey = 'eviaje_emotional_popup_seen'

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderText((prev) => {
        let next = prev

        if (prev !== 'A.L.L') {
          next = 'A.L.L'
        } else {
          const roll = Math.random()
          if (roll < 0.15) {
            next = '14643'
          } else if (roll < 0.3) {
            next = 'chu'
          }
        }

        if (next !== prev) {
          setHeaderCycle((value) => value + 1)
        }

        return next
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let hasSeenPopup = false
    try {
      hasSeenPopup = localStorage.getItem(emotionalPopupKey) === 'true'
    } catch {
      hasSeenPopup = false
    }

    if (!hasSeenPopup) {
      setShowEmotionalPopup(true)
    }
  }, [emotionalPopupKey])

  const closeEmotionalPopup = () => {
    setShowEmotionalPopup(false)
    try {
      localStorage.setItem(emotionalPopupKey, 'true')
    } catch {
      // Ignore storage errors to avoid blocking the UI.
    }
  }

  const handleEmotionalYes = () => {
    closeEmotionalPopup()
    setShowEmotionalStory(true)
  }

  const handleEmotionalNo = () => {
    closeEmotionalPopup()
    setShowEmotionalNo(true)
  }

  return (
    <div className="page-container fade-in">
      <AnimatedBackground theme={theme} />

      <div className="overlay"></div>

      <header className="header-fixed enter-up">
        <Typography sx={{ textAlign: 'center', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '2.2rem', color: 'var(--title-color)', letterSpacing: 2 }}>
          <span key={headerCycle} className="header-cycle">{headerText}</span> <span role="img" aria-label="corazon"></span>
        </Typography>
      </header>

      <Box className="stagger" sx={{ zIndex: 2, width: '100%', maxWidth: 480, textAlign: 'center', mt: 10 }}>
        {/* Mensaje motivacional y contador de dias en la misma fila */}
        <Box className="stagger" sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 4, justifyContent: 'center' }}>
          <Card sx={{ flex: 1, boxShadow: 'var(--card-shadow)', borderRadius: 4, background: 'var(--card-bg)', border: '1px solid var(--surface-border)' }}>
            <CardContent>
              <Typography variant="overline" sx={{ color: 'var(--text-subtle)', letterSpacing: 2 }}>REMEMBER CHU</Typography>
              <Typography variant="h6" sx={{ color: 'var(--text-strong)', fontWeight: 600, mt: 1 }}>
                {currentMotivational.text}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, boxShadow: 'var(--card-shadow)', borderRadius: 4, background: 'var(--card-bg)', border: '1px solid var(--surface-border)' }}>
            <CardContent>
              <Typography variant="overline" sx={{ color: 'var(--text-subtle)', letterSpacing: 2 }}>LONG DISTANCE DIARY</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <FlightIcon sx={{ color: 'var(--accent-highlight)', fontSize: 40, mb: 1 }} />
                <Typography variant="h2" sx={{ color: 'var(--text-strong)', fontWeight: 800 }}>
                  {daysLeft}
                </Typography>
              </Box>
              <Typography sx={{ color: 'var(--text-subtle)', fontWeight: 500, fontSize: '1.1rem', letterSpacing: 1 }}>TO SEE YOU AGAIN</Typography>
            </CardContent>
          </Card>
        </Box>

        <Card className="enter-up" sx={{ mb: 4, boxShadow: 'var(--card-shadow)', borderRadius: 4, background: 'var(--card-bg)', border: '1px solid var(--surface-border)' }}>
          <CardContent>
            <Typography variant="overline" sx={{ color: 'var(--text-subtle)', letterSpacing: 2 }}>DON'T FORGET</Typography>
            <Typography variant="h5" sx={{ fontStyle: 'italic', color: 'var(--text-main)', mb: 1 }}>
              "{currentPhrase.text}"
            </Typography>
            <Typography sx={{ color: 'var(--accent-highlight)', fontWeight: 500 }}>{currentPhrase.flag}</Typography>
          </CardContent>
        </Card>

        {/* Botones en columna (excepto musica) */}
        <Box className="stagger" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
          {/* Boton carta semanal */}
          <Button variant="outlined" startIcon={<MailOutlineIcon />} className="unique-btn enter-up" onClick={() => setShowLetter(true)}>
            Read Weekly Letter
          </Button>
          <Button
            variant="outlined"
            className="unique-btn emotional-trigger enter-up"
            onClick={() => setShowEmotionalStory(true)}
          >
            What you are to me
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AcUnitIcon />}
            className="unique-btn btn-special enter-up"
            onClick={onShowSpecial}
          >
            Mensajes especiales
          </Button>
          {/* Botones de album y leer cartas en la misma fila */}
          <Box className="stagger" sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 1, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              className="unique-btn btn-album"
              onClick={onShowAlbum}
            >
              Album
            </Button>
            <Button
              variant="contained"
              color="info"
              className="unique-btn btn-frases"
              onClick={onShowFrases}
            >
              Frases
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="unique-btn btn-letters"
              onClick={onShowLetters}
            >
              Cartas
            </Button>
          </Box>
          {/* Cerrar sesion */}
          <Button variant="contained" color="secondary" onClick={onLock} className="unique-btn logout-btn enter-up">Cerrar sesion</Button>
        </Box>

        {/* Boton musica en esquina inferior derecha */}
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!playMusic) {
                const randomIndex = Math.floor(Math.random() * songs.length)
                setCurrentSong(randomIndex)
                setPlayMusic(true)
                setTimeout(() => {
                  if (audioRef.current) audioRef.current.play()
                }, 100)
              } else {
                setPlayMusic(false)
                if (audioRef.current) audioRef.current.pause()
              }
            }}
            className="unique-btn-text"
            sx={{ borderRadius: '50%', minWidth: 56, minHeight: 56, boxShadow: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}
          >
            {playMusic ? <PauseIcon sx={{ fontSize: 32 }} /> : <PlayArrowIcon sx={{ fontSize: 32 }} />}
          </Button>
          <audio
            ref={audioRef}
            src={songs[currentSong]}
            loop
            className="audio-hidden"
          />
        </Box>

        {showLetter && (
          <CartaSemanal
            open={showLetter}
            onClose={() => setShowLetter(false)}
            icon={<span className="popup-icon">&lt;3</span>}
            subtitle={`WEEK ${currentLetter.week}`}
            title={currentLetter.title}
            signature={"Tu chino <3"}
          >
            <Typography sx={{ fontFamily: 'Times', fontSize: '1.25rem', color: 'var(--text-main)', whiteSpace: 'pre-line', mb: 2 }}>
              {currentLetter.text}
            </Typography>
          </CartaSemanal>
        )}

        <EmotionalPopup
          open={showEmotionalPopup}
          onClose={closeEmotionalPopup}
          onYes={handleEmotionalYes}
          onNo={handleEmotionalNo}
        />
        <EmotionalStoryModal open={showEmotionalStory} onClose={() => setShowEmotionalStory(false)} />
        <EmotionalNoModal open={showEmotionalNo} onClose={() => setShowEmotionalNo(false)} />
      </Box>
    </div>
  )
}
