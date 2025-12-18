import React, { useState } from 'react'
import './LettersModal.css'
import { weeklyLetters, specialLetters } from '../data'

// Importar fuente manuscrita para cartas
const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap'
document.head.appendChild(fontLink)

// Usar la misma fecha de inicio que en Main.jsx
const fechaInicioViaje = new Date('2025-11-23T15:00:00')

function getOverrideDate() {
  try {
    const raw = localStorage.getItem('devSpecialDate')
    if (!raw) return null
    // Si viene en formato YYYY-MM-DD, evitar desfases de zona horaria
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw)
    if (match) {
      const [, y, m, d] = match
      return new Date(Number(y), Number(m) - 1, Number(d))
    }
    const parsed = new Date(raw)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  } catch {
    return null
  }
}

function getToday() {
  const override = getOverrideDate()
  const base = override || new Date()
  return new Date(base.getFullYear(), base.getMonth(), base.getDate())
}

function getCartasDisponibles() {
  const hoy = new Date()
  const msPorSemana = 7 * 24 * 60 * 60 * 1000
  const semanasTranscurridas = Math.floor((hoy - fechaInicioViaje) / msPorSemana) + 1
  return weeklyLetters
    .filter(carta => carta.week <= semanasTranscurridas)
    .map(carta => ({ ...carta, kind: 'weekly' }))
}

// Devuelve true si la fecha especial ya ocurrio este aAño (o es hoy)
function hasSpecialDateReleased(special) {
  const hoy = getToday()
  const inicio = fechaInicioViaje
  const eventoEsteAno = new Date(hoy.getFullYear(), special.month - 1, special.day)
  const eventoAnterior = new Date(hoy.getFullYear() - 1, special.month - 1, special.day)
  const ultimoEvento = hoy >= eventoEsteAno ? eventoEsteAno : eventoAnterior

  if (ultimoEvento < inicio) return false
  return hoy > ultimoEvento
}

const formatLabel = (carta) => {
  if (carta.kind === 'especial') {
    const dia = String(carta.day).padStart(2, '0')
    const mes = String(carta.month).padStart(2, '0')
    return `Fecha especial ${dia}/${mes}`
  }
  return `Semana ${carta.week}`
}

export default function LettersModal({ onClose }) {
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null)

  const especialesDisponibles = specialLetters
    .filter(hasSpecialDateReleased)
    .map(carta => ({ ...carta, kind: 'especial' }))

  const cartas = [...getCartasDisponibles(), ...especialesDisponibles]

  return (
    <div className="letters-modal-overlay">
      <div className="letters-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Cartas (semanales y especiales)</h2>
        {!cartaSeleccionada ? (
          <div className="letters-list">
            {cartas.length === 0 && <div style={{color:'#888'}}>AA§n no hay cartas disponibles.</div>}
            {cartas.map((carta, idx) => (
              <div key={idx} className="letter-item">
                <div>
                  <strong>{carta.title}</strong>
                  <span className="letter-date">{formatLabel(carta)}</span>
                  {carta.tag && <span className="letter-tag">{carta.tag}</span>}
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
            <span className="letter-date">{formatLabel(cartaSeleccionada)}</span>
            {cartaSeleccionada.tag && <span className="letter-tag">{cartaSeleccionada.tag}</span>}
            <pre style={{whiteSpace:'pre-wrap',textAlign:'left',marginTop:12}}>{cartaSeleccionada.text}</pre>
            <button className="back-btn unique-btn" onClick={() => setCartaSeleccionada(null)}>&larr; Volver</button>
          </div>
        )}
      </div>
    </div>
  )
}

