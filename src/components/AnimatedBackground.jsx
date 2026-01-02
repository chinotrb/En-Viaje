import React from 'react'
import avionImg from '../assets/avion.png'
import avionImgIzq from '../assets/avion_izquierda.png'
import tiburon1 from '../assets/tiburon1.png'
import tiburon2 from '../assets/tiburon2.png'
import tiburon3 from '../assets/tiburon3.png'
import tiburon1Derecha from '../assets/tiburon1-derecha.png'
import tiburon2Derecha from '../assets/tiburon2-derecha.png'
import tiburon3Derecha from '../assets/tiburon3-derecha.png'
import '../pages/Main.css'

export default function AnimatedBackground({ theme = 'cielo' }) {
  const isOcean = theme === 'oceano'

  // plane0 y plane2 vuelan hacia la izquierda; plane1 y plane3 hacia la derecha
  const flyers = isOcean
    ? [
        tiburon1,          // left
        tiburon2Derecha,   // right
        tiburon3,          // left
        tiburon1Derecha    // right
      ]
    : [
        avionImgIzq,
        avionImg,
        avionImgIzq,
        avionImg
      ]

  return (
    <div className={`background-animated ${isOcean ? 'background-ocean' : ''}`}>
      <div className="cloud cloud1" />
      <div className="cloud cloud2" />
      <div className="cloud cloud3" />
      <div className="cloud cloud4" />

      {flyers.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={isOcean ? 'tiburon' : 'avion'}
          className={`plane plane${idx}`}
        />
      ))}

    </div>
  )
}
