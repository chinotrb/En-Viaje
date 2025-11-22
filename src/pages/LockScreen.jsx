// src/components/Login.jsx
import React, { useState, useEffect, useRef } from "react";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import avionImg from '../assets/avion.png';

export default function LockScreen({ onUnlock }) {
    const greetings = ["hermosa", "mi niña", "mi cielo", "princesa", "sweetie", "mi vida"];
    const [greetingIdx, setGreetingIdx] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setGreetingIdx(idx => (idx + 1) % greetings.length);
      }, 1800);
      return () => clearInterval(interval);
    }, []);
  const [pass, setPass] = useState('')
  const [hint, setHint] = useState('Hecho con cariño de parte de un chino pendejo que te quiere ')
  const inputRef = useRef(null)

  const SECRET = "pato" // ← Cambiala cuando quieras

  const tryUnlock = () => {
    if (pass.trim().toLowerCase() === SECRET) {
      setHint('Abriendo magia... ✨')
      localStorage.setItem('isUnlocked', 'true')
      setTimeout(onUnlock, 800)
    } else {
      setHint('Nope... probá otra vez, sweetie ❤️')
      setPass('')
      setTimeout(() => setHint('Hecho con cariño de parte de un chino pendejo que te quiere '), 2000)
    }
  }

  useEffect(() => inputRef.current?.focus(), [])

  return (
    <div className="login-scene" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Fondo animado de nubes y aviones igual que en main */}
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

      <div className="login-card" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: 1, zIndex: 2, position: 'relative' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#E6A9B5', fontSize: '2rem', marginBottom: 8 }}>
          Hola <span style={{ transition: 'color 0.5s', color: '#b56d87' }}>{greetings[greetingIdx]}</span>...
        </h1>
        <div style={{display:'flex', justifyContent:'center', gap:'12px', margin:'20px 0'}}>
          <input
            ref={inputRef}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
            placeholder="Palabra clave✨"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', borderRadius: 14, border: '2px solid #d4a9e6', padding: '14px 16px', width: 180 }}
          />
          <button className="unique-btn" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.1rem', padding: '14px 28px' }} onClick={tryUnlock}>Entrar</button>
        </div>
        <p className="hint" style={{ color: '#b56d87', fontFamily: 'Playfair Display, serif', fontSize: '1rem', marginTop: 10 }}>{hint}</p>
      </div>
    </div>
  )
}