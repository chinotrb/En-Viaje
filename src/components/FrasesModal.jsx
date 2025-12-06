import React from 'react'
import './LettersModal.css'
import { phatherphrases } from '../data'

export default function FrasesModal({ onClose }) {
  const frases = phatherphrases || []

  return (
    <div className="letters-modal-overlay">
      <div className="letters-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Frases que dicen los señores</h2>
        <div className="letters-list">
          {frases.length === 0 && <div style={{color:'#888'}}>Aún no hay frases disponibles.</div>}
          {frases.map((f, idx) => (
            <div key={idx} className="letter-item" style={{alignItems:'flex-start'}}>
              <div style={{textAlign:'left'}}>
                <strong style={{display:'block'}}>{f.text}</strong>
                <span className="letter-date">{f.lang}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
