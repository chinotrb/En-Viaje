import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { dailyPhrases, weeklyLetters } from '../data';
import avionImg from '../assets/avion.png';
import santaImg from '../assets/santa_volando.png';
import Popup from '../components/popup';
import { Button, Box, Typography, Card, CardContent } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FlightIcon from '@mui/icons-material/Flight';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Home({ onLock }) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursToThursday, setHoursToThursday] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(dailyPhrases[0]);
  const [currentLetter, setCurrentLetter] = useState(weeklyLetters[0]);
  const [showLetter, setShowLetter] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef(null);

  // Lista de canciones (ejemplo, reemplaza con tus URLs)
    // Lista de canciones (agregada navideña)
    const songs = [
    '/En-Viaje/music/TheRed-Nosed.mp3', // archivo navideño
    '/En-Viaje/music/ChristmasTree.mp3', // archivo navideño
    //'/En-Viaje/music/Kevin-Kaarl-Colapso.mp3',
    ];

  // ---- CONTADOR SOLO DE DÍAS ----
const fechaObjetivo = new Date("2026-03-30T00:00:00");

useEffect(() => {
  function getNextThursday3PM(now) {
    // Día de la semana: 0=Domingo, 1=Lunes, ..., 4=Jueves
    const dayOfWeek = now.getDay();
    // Calcular días hasta el próximo jueves
    let daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    // Si hoy es jueves y ya pasaron las 3 PM, ir al siguiente jueves
    if (daysUntilThursday === 0 && now.getHours() >= 15) {
      daysUntilThursday = 7;
    }
    // Crear la fecha objetivo
    const nextThursday = new Date(now);
    nextThursday.setDate(now.getDate() + daysUntilThursday);
    nextThursday.setHours(15, 0, 0, 0); // 3 PM
    return nextThursday;
  }

  function updateData() {
    const ahora = new Date();

    // ---- 1. DIAS RESTANTES ----
    const diferencia = fechaObjetivo - ahora;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    setDaysLeft(dias > 0 ? dias : 0);

    // ---- CONTADOR DE HORAS HASTA JUEVES 3 PM ----
    const nextThursday = getNextThursday3PM(ahora);
    const diffMs = nextThursday - ahora;
    const hours = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
    setHoursToThursday(hours);

    // ---- 2. MENSAJE CADA HORA ----
    const hora = ahora.getHours();
    const indexFrase = hora % dailyPhrases.length;
    setCurrentPhrase(dailyPhrases[indexFrase]);

    // ---- 3. CARTA CADA SEMANA ----
    // semana actual según los días restantes
    const semana = Math.floor((dias / 7));

    // límite para no pasarse del array
    const indexCarta = Math.min(
      weeklyLetters.length - 1,
      Math.max(0, weeklyLetters.length - 1 - semana)
    );

    setCurrentLetter(weeklyLetters[indexCarta]);
  }

  updateData();

  // Actualizar cada minuto (suficiente y no consume batería)
  const interval = setInterval(updateData, 60 * 1000);

  return () => clearInterval(interval);
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
          {/* Santa volando */}
          <img src={santaImg} alt="santa volando" style={{ position: 'absolute', top: '10%', left: '10%', width: 120, height: 80, zIndex: 2, transform: 'translateX(-50%)', animation: 'santaFly 60s linear infinite' }} />
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
            @keyframes santaFly {
              0%   { left: 10%; opacity: 0.95; transform: translateX(-50%) translateY(0); }
              10%  { opacity: 1; }
              20%  { transform: translateX(-50%) translateY(-20px); }
              30%  { transform: translateX(-50%) translateY(-40px); }
              40%  { transform: translateX(-50%) translateY(-20px); }
              50%  { transform: translateX(-50%) translateY(0); }
              60%  { transform: translateX(-50%) translateY(20px); }
              70%  { transform: translateX(-50%) translateY(40px); }
              80%  { transform: translateX(-50%) translateY(20px); }
              90%  { transform: translateX(-50%) translateY(0); }
              100% { left: 120%; opacity: 0.7; transform: translateX(-50%) translateY(0); }
            }
        `}</style>
      </div>

      <div className="overlay"></div>

      {/* Encabezado fijo */}
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 10px rgba(230,169,181,0.08)', padding: '12px 0' }}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '2.2rem', color: '#E6A9B5', letterSpacing: 2 }}>A.L.L <span role="img" aria-label="corazon"></span></Typography>
      </header>

      <Box sx={{ zIndex: 2, width: '100%', maxWidth: 480, textAlign: 'center', mt: 10 }}>
        {/* Contador */}
        <Card sx={{ mb: 4, boxShadow: 4, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>LONG DISTANCE DIARY</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <FlightIcon sx={{ color: '#ff6b9d', fontSize: 40, mb: 1 }} />
              <Typography variant="h2" sx={{ color: '#d15b7f', fontWeight: 800 }}>
                {daysLeft}
              </Typography>
            </Box>
            <Typography sx={{ color: '#b56d87', fontWeight: 500, fontSize: '1.1rem', letterSpacing: 1 }}>PARA VOLVERTE A VER</Typography>
          </CardContent>
        </Card>
        {/* Contador de horas para jueves 3 PM */}
        <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>HORAS PARA VERNOS</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Typography variant="h2" sx={{ color: '#d15b7f', fontWeight: 800 }}>
                {hoursToThursday}
              </Typography>
            </Box>
            <Typography sx={{ color: '#b56d87', fontWeight: 500, fontSize: '1.1rem', letterSpacing: 1 }}>SOLO LAS HORAS</Typography>
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


        {/* Botones en columna (excepto música) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
          {/* Botón carta semanal */}
          <Button variant="outlined" startIcon={<MailOutlineIcon />} className="unique-btn" onClick={() => setShowLetter(true)}>
            Read Weekly Letter
          </Button>

          {/* Cerrar sesión */}
          <Button variant="contained" color="secondary" onClick={onLock} className="unique-btn" style={{ marginTop: 8 }}>Cerrar sesión</Button>
        </Box>

        {/* Botón música en esquina inferior derecha */}
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!playMusic) {
                // Selecciona una canción aleatoria
                const randomIndex = Math.floor(Math.random() * songs.length);
                setCurrentSong(randomIndex);
                setPlayMusic(true);
                setTimeout(() => {
                  if (audioRef.current) audioRef.current.play();
                }, 100);
              } else {
                setPlayMusic(false);
                if (audioRef.current) audioRef.current.pause();
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
            style={{ display: 'none' }}
          />
        </Box>

        {showLetter && (
          <Popup
            open={showLetter}
            onClose={() => setShowLetter(false)}
            icon={<span style={{ fontSize: 32, color: '#ff6b9d' }}>💗</span>}
            subtitle={`WEEK ${currentLetter.week}`}
            title={currentLetter.title}
            signature={"Tu chino ♡"}
          >
            <Typography sx={{ fontFamily: 'Times', fontSize: '1.25rem', color: '#333', whiteSpace: 'pre-line', mb: 2 }}>
              {currentLetter.text}
            </Typography>
          </Popup>
        )}
      </Box>
    </div>
  );
}