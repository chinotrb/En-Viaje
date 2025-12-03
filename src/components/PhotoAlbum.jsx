import React from 'react'
import './PhotoAlbum.css'



export default function PhotoAlbum({ onClose }) {
    return (
        <div className="photo-album-overlay">
            <div className="photo-album-modal">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>❤️Cada recuerdo es un tesoro❤️</h2>
                <div className="photo-grid">
                    <img src="/En-Viaje/albumFotos/ellayyo.jpg" alt="Foto 1" className="photo-item" />
                    <img src="/En-Viaje/albumFotos/flores01.jpg" alt="Foto 2" className="photo-item" />
                    <img src="/En-Viaje/albumFotos/floresStabucks.jpg" alt="Foto 3" className="photo-item" />
                    <img src="/En-Viaje/albumFotos/parqueflores1.jpg" alt="Foto 4" className="photo-item" />
                    <img src="/En-Viaje/albumFotos/pelucheabi.jpg" alt="Foto 5" className="photo-item" />
                    <img src="/En-Viaje/albumFotos/starbuks1.jpg" alt="Foto 6" className="photo-item" />
                </div>

            </div>
        </div>
    )
}
