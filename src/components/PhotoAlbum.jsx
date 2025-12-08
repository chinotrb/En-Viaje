import React from 'react'
import './PhotoAlbum.css'

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

export default function PhotoAlbum({ onClose }) {
  const src = (name) => `${base}/albumFotos/${name}`

  return (
    <div className="photo-album-overlay">
      <div className="photo-album-modal popup-card popup-open">
        <button className="close-btn" onClick={onClose} aria-label="Cerrar álbum">&times;</button>
        <h2>Cada recuerdo es un tesoro</h2>
        <div className="photo-grid">
          <img src={src('ellayyo.jpg')} alt="Foto 1" className="photo-item" loading="lazy" />
          <img src={src('flores01.jpg')} alt="Foto 2" className="photo-item" loading="lazy" />
          <img src={src('floresStabucks.jpg')} alt="Foto 3" className="photo-item" loading="lazy" />
          <img src={src('parqueflores1.jpg')} alt="Foto 4" className="photo-item" loading="lazy" />
          <img src={src('pelucheabi.jpg')} alt="Foto 5" className="photo-item" loading="lazy" />
          <img src={src('starbuks1.jpg')} alt="Foto 6" className="photo-item" loading="lazy" />
        </div>
      </div>
    </div>
  )
}
