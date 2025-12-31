import React, { useState } from 'react'
import './LettersModal.css'
import { specialLetters } from '../data'

function getOverrideDate() {
  try {
    const raw = localStorage.getItem('devSpecialDate')
    if (!raw) return null
    // Si el formato es YYYY-MM-DD, parsear en local para evitar desfases de zona horaria
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

const today = () => {
  const override = getOverrideDate()
  const now = override || new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const systemToday = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const isYearMatch = (entry, date) => !entry.year || entry.year === date.getFullYear()

const isToday = (entry) => {
  const now = today()
  if (!isYearMatch(entry, systemToday())) return false
  return now.getMonth() === entry.month - 1 && now.getDate() === entry.day
}

const daysUntil = (entry) => {
  const base = today()
  if (!isYearMatch(entry, systemToday())) return Infinity
  const thisYear = new Date(base.getFullYear(), entry.month - 1, entry.day)
  const target = thisYear >= base ? thisYear : new Date(base.getFullYear() + 1, entry.month - 1, entry.day)
  return Math.ceil((target - base) / (1000 * 60 * 60 * 24))
}

const formatFecha = (entry) => `${String(entry.day).padStart(2, '0')}/${String(entry.month).padStart(2, '0')}`

export default function SpecialMessagesModal({ onClose }) {
  const [seleccionada, setSeleccionada] = useState(null)
  const mensajesHoy = specialLetters.filter(isToday)
  const proximos = specialLetters
    .filter(item => isYearMatch(item, systemToday()))
    .map(item => ({ ...item, dias: daysUntil(item) }))
    .sort((a, b) => a.dias - b.dias)

  return (
    <div className="letters-modal-overlay">
      <div className="letters-modal popup-enter">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Mensajes especiales</h2>
        {!seleccionada ? (
          <>
            {mensajesHoy.length > 0 ? (
              <div className="letters-list">
                {mensajesHoy.map(msg => (
                  <div key={msg.id} className="letter-item">
                    <div>
                      <strong>{msg.title}</strong>
                      <span className="letter-date">Hoy · {formatFecha(msg)}</span>
                      {msg.tag && <span className="letter-tag">{msg.tag}</span>}
                    </div>
                    <button className="read-btn" onClick={() => setSeleccionada(msg)}>
                      Leer
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="letters-list">
                <div style={{color:'#888'}}>Hoy no hay mensaje especial, pero mira las fechas magicas.</div>
              </div>
            )}

            <div className="letters-list" style={{marginTop:24}}>
              {proximos.map(msg => (
                <div key={msg.id} className="letter-item">
                  <div>
                    <strong>{msg.title}</strong>
                    <span className="letter-date">{formatFecha(msg)}</span>
                    {msg.tag && <span className="letter-tag">{msg.tag}</span>}
                    <span className="letter-date">{msg.dias === 0 ? 'Hoy' : `Faltan ${msg.dias} dias`}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="letter-content">
            <h3>{seleccionada.title}</h3>
            <span className="letter-date">Hoy · {formatFecha(seleccionada)}</span>
            {seleccionada.tag && <span className="letter-tag">{seleccionada.tag}</span>}
            <pre style={{whiteSpace:'pre-wrap', textAlign:'left', marginTop:12}}>{seleccionada.text}</pre>
            {seleccionada.song && (
              <a
                className="song-link"
                href={seleccionada.song.url}
                target="_blank"
                rel="noreferrer"
              >
                Escuchar: {seleccionada.song.title}
              </a>
            )}
            <button className="back-btn unique-btn" onClick={() => setSeleccionada(null)}>&larr; Volver</button>
          </div>
        )}

      </div>
    </div>
  )
}
