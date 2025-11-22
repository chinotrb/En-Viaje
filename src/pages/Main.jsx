// src/pages/Home.jsx (ex Main.jsx)

import { useState, useEffect } from 'react';
import { dailyPhrases, weeklyLetters, departureDate, returnDate } from '../data';
import avionImg from '../assets/avion.png';
import Popup from '../components/popup';
import { Button, Box, Typography, Card, CardContent } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FlightIcon from '@mui/icons-material/Flight';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Home({ onLock }) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(dailyPhrases[0]);
  const [currentLetter, setCurrentLetter] = useState(weeklyLetters[0]);
  const [showLetter, setShowLetter] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  useEffect(() => {
    const today = new Date();
    const diff = Math.max(0, Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24)));
    setDaysLeft(diff);

    const dayIndex = today.getDate() % dailyPhrases.length;
    setCurrentPhrase(dailyPhrases[dayIndex]);

    const weeksGone = Math.floor((today - departureDate) / (7 * 86400000));
    setCurrentLetter(weeklyLetters[Math.min(weeksGone, 3)]);
  }, []);


  return (
    <div className="fade-in" style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #d4a9e6 0%, #f7dde2 60%, #e6a9b5 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Fondo animado de nubes y aviones */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {/* Nubes animadas */}
        <div className="cloud cloud1" style={{ position: 'absolute', top: '12%', left: '40%', width: 220, height: 70, background: '#fff', borderRadius: 50, opacity: 0.7, filter: 'blur(2px)', transform: 'translateX(-50%)', animation: 'cloudMoveRight 60s linear infinite' }} />
        <div className="cloud cloud2" style={{ position: 'absolute', top: '32%', left: '60%', width: 320, height: 90, background: '#fff', borderRadius: 60, opacity: 0.8, filter: 'blur(2px)', transform: 'translateX(-50%)', animation: 'cloudMoveLeft 80s linear infinite' }} />
        <div className="cloud cloud3" style={{ position: 'absolute', top: '58%', left: '35%', width: 180, height: 60, background: '#fff', borderRadius: 40, opacity: 0.6, filter: 'blur(2px)', transform: 'translateX(-50%)', animation: 'cloudMoveRight 70s linear infinite' }} />
        <div className="cloud cloud4" style={{ position: 'absolute', top: '70%', left: '70%', width: 200, height: 60, background: '#fff', borderRadius: 40, opacity: 0.5, filter: 'blur(2px)', transform: 'translateX(-50%)', animation: 'cloudMoveLeft 90s linear infinite' }} />
        {/* Aviones con imagen y efecto espejo */}
        <img src={avionImg} alt="avion" style={{ position: 'absolute', top: '22%', left: '45%', width: 90, height: 60, zIndex: 2, transform: 'translateX(-50%)', animation: 'planeMoveRight 40s linear infinite' }} />
        <img src={avionImg} alt="avion" style={{ position: 'absolute', top: '54%', left: '60%', width: 90, height: 60, zIndex: 2, transform: 'translateX(-50%) scaleX(-1)', animation: 'planeMoveLeft 55s linear infinite' }} />
        <img src={avionImg} alt="avion" style={{ position: 'absolute', top: '68%', left: '30%', width: 90, height: 60, zIndex: 2, transform: 'translateX(-50%)', animation: 'planeMoveRight 65s linear infinite' }} />
        <style>{`
          @keyframes cloudMoveRight {
            0% { left: 40%; opacity: 0.8; }
            10% { opacity: 1; }
            100% { left: 110%; opacity: 0.5; }
          }
          @keyframes cloudMoveLeft {
            0% { left: 60%; opacity: 0.8; }
            10% { opacity: 1; }
            100% { left: -30%; opacity: 0.5; }
          }
          @keyframes planeMoveRight {
            0% { left: 45%; opacity: 0.9; }
            10% { opacity: 1; }
            100% { left: 120%; opacity: 0.5; }
          }
          @keyframes planeMoveLeft {
            0% { left: 60%; opacity: 0.9; }
            10% { opacity: 1; }
            100% { left: -20%; opacity: 0.5; }
          }
        `}</style>
      </div>

      <div className="overlay"></div>

      {/* Encabezado fijo */}
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10, background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 10px rgba(230,169,181,0.08)', padding: '12px 0' }}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '2.2rem', color: '#E6A9B5', letterSpacing: 2 }}>A.L.L <span role="img" aria-label="corazon"></span></Typography>
      </header>

      <Box sx={{ zIndex: 2, width: '100%', maxWidth: 480, textAlign: 'center', mt: 10 }}>
        {/* Contador */}
        <Card sx={{ mb: 4, boxShadow: 4, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>LONG DISTANCE DIARY</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <FlightIcon sx={{ color: '#ff6b9d', fontSize: 40, mb: 1 }} />
              <Typography variant="h2" sx={{ color: '#d15b7f', fontWeight: 800 }}>{daysLeft} días</Typography>
            </Box>
            <Typography sx={{ color: '#b56d87', fontWeight: 500, fontSize: '1.1rem', letterSpacing: 1 }}>PARA VOLVERTE A VER</Typography>
          </CardContent>
        </Card>

        {/* Frase diaria */}
        <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>{currentPhrase.lang.toUpperCase()}</Typography>
            <Typography variant="h5" sx={{ fontStyle: 'italic', color: '#333', mb: 1 }}>
              "{currentPhrase.text}"
            </Typography>
            <Typography sx={{ color: '#ff6b9d', fontWeight: 500 }}>{currentPhrase.flag}</Typography>
          </CardContent>
        </Card>

        {/* Botón carta semanal */}
        <Button variant="outlined" startIcon={<MailOutlineIcon />} className="unique-btn" onClick={() => setShowLetter(true)}>
          Read Weekly Letter
        </Button>

        {showLetter && (
          <Popup
            open={showLetter}
            onClose={() => setShowLetter(false)}
            icon={<span style={{fontSize:32, color:'#ff6b9d'}}>💗</span>}
            subtitle={`WEEK ${currentLetter.week}`}
            title={currentLetter.title}
            signature={"Tu persona ♡"}
          >
            <Typography sx={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.25rem', color: '#333', whiteSpace: 'pre-line', mb: 2 }}>
              {currentLetter.text}
            </Typography>
          </Popup>
        )}

        {/* Música */}
        <Button variant="text" onClick={() => setPlayMusic(!playMusic)} className="unique-btn-text" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {playMusic ? <PauseIcon sx={{ fontSize: 28 }} /> : <PlayArrowIcon sx={{ fontSize: 28 }} />}
          <span style={{ fontSize: '1rem', fontWeight: 500 }}>{playMusic}</span>
        </Button>
        {playMusic && <audio autoPlay loop src="https://example.com/romantic-music.mp3" />}

        {/* Corazones */}
        {/* ...eliminado efecto de corazones... */}

        <Button variant="contained" color="secondary" onClick={onLock} className="unique-btn" style={{ marginTop: 32 }}>Cerrar sesión</Button>
      </Box>
    </div>
  );
}