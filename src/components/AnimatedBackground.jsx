import React from 'react';
import avionImg from '../assets/avion.png';
import avionImgIzq from '../assets/avion_izquierda.png';
import santaImg from '../assets/santa_volando.png';
import '../pages/Main.css';

export default function AnimatedBackground() {
    return (
        <div className="background-animated">
            <div className="cloud cloud1" />
            <div className="cloud cloud2" />
            <div className="cloud cloud3" />
            <div className="cloud cloud4" />

            <img src={avionImgIzq} alt="avion" className="plane plane0" />
            <img src={avionImg} alt="avion" className="plane plane1" />
            <img src={avionImgIzq} alt="avion" className="plane plane2" />
            <img src={avionImg} alt="avion" className="plane plane3" />

            <img src={santaImg} alt="santa volando" className="santa" />
        </div>
    );
}
