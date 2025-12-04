import { useState, useRef } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import Popup from '../components/popup';
import { Button, Box, Typography, Card, CardContent } from '@mui/material';

import './Main.css';
import useMainData from '../hooks/useMainData';

// Recibe funciones para mostrar los modales desde App.jsx
// Agrega las props onShowAlbum y onShowLetters
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FlightIcon from '@mui/icons-material/Flight';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Home({ onLock, onShowAlbum, onShowLetters }) {
  const { daysLeft, hoursToThursday, currentPhrase, currentMotivational, currentLetter } = useMainData();
  const [showLetter, setShowLetter] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef(null);

  // Lista de canciones (ejemplo, reemplaza con tus URLs)
  const songs = ['/En-Viaje/music/TheRed-Nosed.mp3', '/En-Viaje/music/ChristmasTree.mp3'];

  return (
    <div className="page-container fade-in">
      {/* Fondo animado de nubes y aviones */}
      <AnimatedBackground />

      <div className="overlay"></div>

      {/* Encabezado fijo */}
      <header className="header-fixed enter-up">
        <Typography sx={{ textAlign: 'center', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '2.2rem', color: '#E6A9B5', letterSpacing: 2 }}>A.L.L <span role="img" aria-label="corazon"></span></Typography>
      </header>

      {/* Luces navideñas animadas */}
      <div className="christmas-lights enter-fade">
        <div className="christmas-light red"></div>
        <div className="christmas-light green"></div>
        <div className="christmas-light yellow"></div>
        <div className="christmas-light blue"></div>
        <div className="christmas-light pink"></div>
        <div className="christmas-light purple"></div>
        <div className="christmas-light red"></div>
        <div className="christmas-light green"></div>
        <div className="christmas-light yellow"></div>
        <div className="christmas-light blue"></div>
        <div className="christmas-light pink"></div>
        <div className="christmas-light purple"></div>
      </div>

      <Box className="stagger" sx={{ zIndex: 2, width: '100%', maxWidth: 480, textAlign: 'center', mt: 10 }}>
        {/* Mensaje motivacional y contador de días en la misma fila */}
        <Box className="stagger" sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 4, justifyContent: 'center' }}>
          {/* Mensaje motivacional */}
          <Card sx={{ flex: 1, boxShadow: 3, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>REMEMBER CHU</Typography>
              <Typography variant="h6" sx={{ color: '#d15b7f', fontWeight: 600, mt: 1 }}>
                {currentMotivational.text}
              </Typography>
            </CardContent>
          </Card>
          {/* Contador */}
          <Card sx={{ flex: 1, boxShadow: 4, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>LONG DISTANCE DIARY</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <FlightIcon sx={{ color: '#ff6b9d', fontSize: 40, mb: 1 }} />
                <Typography variant="h2" sx={{ color: '#d15b7f', fontWeight: 800 }}>
                  {daysLeft}
                </Typography>
              </Box>
              <Typography sx={{ color: '#b56d87', fontWeight: 500, fontSize: '1.1rem', letterSpacing: 1 }}>TO SEE YOU AGAIN</Typography>
            </CardContent>
          </Card>
        </Box>
        {/* Contador de horas para jueves 3 PM oculto */}

        {/* Frase diaria */}
        <Card className="enter-up" sx={{ mb: 4, boxShadow: 3, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>DON'T FORGET</Typography>
            <Typography variant="h5" sx={{ fontStyle: 'italic', color: '#333', mb: 1 }}>
              "{currentPhrase.text}"
            </Typography>
            <Typography sx={{ color: '#ff6b9d', fontWeight: 500 }}>{currentPhrase.flag}</Typography>
          </CardContent>
        </Card>


        {/* Botones en columna (excepto música) */}
        <Box className="stagger" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
          {/* Botón carta semanal */}
          <Button variant="outlined" startIcon={<MailOutlineIcon />} className="unique-btn enter-up" onClick={() => setShowLetter(true)}>
            Read Weekly Letter
          </Button>
          {/* Botones de álbum y leer cartas en la misma fila */}
          <Box className="stagger" sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 1, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              className="unique-btn btn-album"
              onClick={onShowAlbum}
            >
              📸 Album
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="unique-btn btn-letters"
              onClick={onShowLetters}
            >
              💌 cartas
            </Button>
          </Box>
          {/* Cerrar sesión */}
          <Button variant="contained" color="secondary" onClick={onLock} className="unique-btn logout-btn enter-up">Cerrar sesión</Button>
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
            className="audio-hidden"
          />
        </Box>

        {showLetter && (
          <Popup
            open={showLetter}
            onClose={() => setShowLetter(false)}
            icon={<span className="popup-icon">💗</span>}
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