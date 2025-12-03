import React, { useState } from 'react'

// Importar fuente manuscrita para cartas
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap';
document.head.appendChild(fontLink);
import './LettersModal.css'
import { weeklyLetters } from '../data'


// Usar la misma fecha de inicio que en Main.jsx
const fechaInicioViaje = new Date("2025-11-23T15:00:00")
function getCartasDisponibles() {
  const hoy = new Date()
  const msPorSemana = 7 * 24 * 60 * 60 * 1000
  const semanasTranscurridas = Math.floor((hoy - fechaInicioViaje) / msPorSemana) + 1
  return weeklyLetters.filter(carta => carta.week <= semanasTranscurridas)
}

export default function LettersModal({ onClose }) {
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null)
  const cartas = getCartasDisponibles()

  return (
    <div className="letters-modal-overlay">
      <div className="letters-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Cartas Semanales</h2>
        {!cartaSeleccionada ? (
          <div className="letters-list">
            {cartas.length === 0 && <div style={{color:'#888'}}>Aún no hay cartas disponibles.</div>}
            {cartas.map((carta, idx) => (
              <div key={idx} className="letter-item">
                <div>
                  <strong>{carta.title}</strong>
                  <span className="letter-date">Semana {carta.week}</span>
                </div>
                <button className="read-btn" onClick={() => setCartaSeleccionada(carta)}>
                  Leer
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="letter-content">
            <h3>{cartaSeleccionada.title}</h3>
            <span className="letter-date">Semana {cartaSeleccionada.week}</span>
            <pre style={{whiteSpace:'pre-wrap',textAlign:'left',marginTop:12}}>{cartaSeleccionada.text}</pre>
            <button className="back-btn unique-btn" onClick={() => setCartaSeleccionada(null)}>&larr; Volver</button>
          </div>
        )}
      </div>
    </div>
  )
}
