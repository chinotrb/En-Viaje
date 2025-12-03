import { useState, useEffect } from 'react';
import { dailyPhrases, weeklyLetters, motivationalMessages } from '../data';

// Hook que encapsula la lógica de fechas, frases y cartas
export default function useMainData() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursToThursday, setHoursToThursday] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(dailyPhrases[0]);
  const [currentMotivational, setCurrentMotivational] = useState(motivationalMessages[0]);
  const [currentLetter, setCurrentLetter] = useState(weeklyLetters[0]);

  const fechaObjetivo = new Date('2026-03-30T00:00:00');
  const fechaInicioViaje = new Date('2025-11-23T15:00:00');

  useEffect(() => {
    function getNextThursday3PM(now) {
      const dayOfWeek = now.getDay();
      let daysUntilThursday = (4 - dayOfWeek + 7) % 7;

      if (daysUntilThursday === 0 && now.getHours() >= 15) {
        daysUntilThursday = 7;
      }

      const nextThursday = new Date(now);
      nextThursday.setDate(now.getDate() + daysUntilThursday);
      nextThursday.setHours(15, 0, 0, 0);
      return nextThursday;
    }

    function updateData() {
      const ahora = new Date();

      // Dias restantes
      const diferencia = fechaObjetivo - ahora;
      const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      setDaysLeft(dias > 0 ? dias : 0);

      // Horas hasta jueves 3pm
      const nextThursday = getNextThursday3PM(ahora);
      const diffMs = nextThursday - ahora;
      const horas = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
      setHoursToThursday(horas);

      // Frase diaria y mensaje motivacional por hora
      const hora = ahora.getHours();
      setCurrentPhrase(dailyPhrases[hora % dailyPhrases.length]);
      setCurrentMotivational(motivationalMessages[hora % motivationalMessages.length]);

      // Carta según fecha del viaje
      let diffMsWeeks = ahora - fechaInicioViaje;
      if (diffMsWeeks < 0) diffMsWeeks = 0;
      const semanasPasadas = Math.floor(diffMsWeeks / (1000 * 60 * 60 * 24 * 7));
      const indexCarta = Math.min(semanasPasadas, weeklyLetters.length - 1);
      setCurrentLetter(weeklyLetters[indexCarta]);
    }

    updateData();
    const interval = setInterval(updateData, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { daysLeft, hoursToThursday, currentPhrase, currentMotivational, currentLetter };
}
